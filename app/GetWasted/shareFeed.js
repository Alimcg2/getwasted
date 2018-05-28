import * as firebase from 'firebase';
import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, FlatList, ListView, ListItem, ScrollView, SectionList } from 'react-native';
import moment from 'moment';
import t from 'tcomb-form-native'; // 0.6.9
import Button from 'react-native-button';
import app from './app';

import {
    StackNavigator,
} from 'react-navigation';

const styles = require('./styles.js');

// creates the form for search bar
const Form = t.form.Form;

// creates the search input
const Search = t.struct({
    search: t.String
});

// form styling
const formStyles = {
    ...Form.stylesheet,
    formGroup: {
        normal: {
            marginBottom: 10,
        },
        error: {
            marginBottom: 10
        }
    },
    textbox: {
        normal: {
            backgroundColor: '#e2ddd0',
            padding: 10,
            fontSize: 20,
            marginTop: 10
        },
        error: {
            backgroundColor: '#e2ddd0',
            padding: 10,
            fontSize: 20,
            marginTop: 10
        }
    },
    controlLabel: {
        normal: {
            display: "none"
        },
        // the style applied when a validation error occours
        error: {
            display: "none"
        }
    }
}

// these are the options for the search form
const options = {
    fields: {
        search: {}
    },
    stylesheet: formStyles,
};

export default class ShareFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getMenu: false,
            following: [],
            posts: [],
            users: [],
            filteredUsers: []
        };
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    componentWillMount() {
        var currentUser = firebase.auth().currentUser;

        this.usersRef = firebase.database().ref().child("Users");
        this.usersRef.on("value", (snapshot) => {
            // get list of users current user is following
            var following = snapshot.val()[currentUser.uid].following;
            if (following) {
                var followingKeys = Object.keys(following);
                var followingIds = [];
                followingKeys.forEach((key) => {
                    followingIds.push(following[key].uid);
                });
                this.setState({ following: followingIds });
            }

            // get posts of each user followed
            var allPosts = [];
            if (followingIds) {
                followingIds.forEach((uid) => {
                    var name = snapshot.val()[uid].name;
                    var posts = snapshot.val()[uid].trashypics;
                    if (posts) {
                        var postKeys = Object.keys(posts);
                        postKeys.forEach((key) => {
                            var post = posts[key];
                            // only save published posts
                            if (post.published) {
                                post["userId"] = uid;
                                post["userName"] = name;
                                allPosts.push(post);
                            }
                        });
                    }
                });
            }
            // TO DO: ORDER POSTS BY TIME CREATED
            this.setState({ posts: allPosts });

            // get list of all users for search
            var users = [];
            snapshot.forEach((child) => {
                var user = child.val();
                if (child.key != currentUser.uid) {
                    var userData = {
                        name: user.name,
                        image: user.image,
                        userId: child.key
                    };
                    users.push(userData);
                }
            });
            this.setState({ users: users, filteredUsers: users });
        });
    }

    componentWillUnmount() {
        if (this.usersRef) {
            this.usersRef.off();
        }
    }

    handleSignOut() {
        if (firebase.auth().currentUser) {
            firebase.auth().signOut();
        }
        this.props.navigation.navigate('landing', {});
    }

    handleSearch() {
        const value = this._form.getValue();
        if (value) {
            var result = [];
            var names = this.state.users.map(user => user.name);
            for (var i = 0; i < names.length; i++) {
                var name = names[i].toLowerCase();
                if (name.includes(value.search.toLowerCase())) {
                    result.push(this.state.users[i]);
                }
            }
            this.setState({ filteredUsers: result });
        } else {
            this.setState({ filteredUsers: users });
        }
    }

    handleFollow(userToFollow) {
        var currentUser = firebase.auth().currentUser;

        firebase.database().ref().child("Users/" + currentUser.uid + "/following")
            .push({ uid: userToFollow });

        firebase.database().ref().child("Users/" + userToFollow + "/followers")
            .push({ uid: currentUser.uid });
    }

    render() {
        const { navigate } = this.props.navigation;

        var postItems = this.state.posts.map((post, index) => {
            return <PostItem key={index} post={post} navigation={this.props.navigation} />;
        });

        var userItems = this.state.filteredUsers.map((user, index) => {
            var followingUser = this.state.following.includes(user.userId);
            return (
                <View key={index} style={styles.userContainer}>
                    <View style={styles.userSearchInfo}>
                        <Button onPress={(() => {
                            navigate('otherProfile', { uid: user.userId, fromSearch: true });
                        })}>
                            <Image style={styles.userSearchPhoto} source={{ uri: user.image }} />
                        </Button>
                        <Button onPress={(() => {
                            navigate('otherProfile', { uid: user.userId, fromSearch: true });
                        })}>
                            <Text style={styles.userSearchName}>{user.name}</Text>
                        </Button>
                    </View>
                    {!followingUser ?
                        <Button style={styles.followButton} onPress={(() => {
                            this.handleFollow(user.userId);
                        })}>Follow</Button>
                        :
                        <View></View>
                    }
                </View >
            );
        });

        return (

            <View style={styles.container_main} >
                <View style={styles.topContainer}>
                    <Text style={styles.title}>Wasteless</Text>
                    <Button style={[styles.menu_item]}
                        onPress={
                            function () {
                                navigate('setting', {});
                            }.bind(this)
                        }><Image style={styles.settingsImage} source={require("./003-settings.png")} /></Button>
                </View>


                <View sytle={styles.pls}>
                    <Text style={styles.hr}>_______________________________________________________________________</Text>
                </View>

                <View>
                    <Text style={styles.headerPadding}>CONNECT</Text>

                    {!this.state.searching ?
                        <Button onPress={() => {
                            this.setState({ searching: true, filteredUsers: this.state.users });
                        }}>
                            <Image style={styles.plusIcon} source={require("./user-plus.png")} />
                        </Button>
                        :
                        <Button onPress={() => {
                            this.setState({ searching: false });
                        }}>
                            <Image style={styles.closeIcon} source={require("./close.png")} />
                        </Button>
                    }
                </View>

                {/* search bar */}
                {this.state.searching ?
                    <View>
                        <Form ref={c => this._form = c}
                            type={Search}
                            options={options}
                        />
                        <Button style={styles.search_button}
                            onPress={() => {
                                this.handleSearch();
                            }}>
                            <Image style={styles.search_button} source={{ uri: "https://cdn.shopify.com/s/files/1/1161/9636/t/15/assets/search-icon.png?7610983656426791530" }} />
                        </Button>

                        <ScrollView style={{ marginTop: 20 }}>
                            {userItems}
                            <View style={{ height: 325 }}></View>
                        </ScrollView>
                    </View >
                    :
                    <View>
                        {postItems.length == 0 ?
                            // button to follow people if no posts
                            <View style={[styles.center, { marginTop: 200 }]}>
                                <Text style={{ fontSize: 24, paddingBottom: 5 }}>No posts yet.</Text>
                                <Text>Find people to follow by tapping the icon above.</Text>
                            </View> :
                            // posts if following people with posts
                            <View>
                                <ScrollView style={styles.posts}>
                                    {postItems}
                                    <View style={styles.buffer}></View>
                                </ScrollView>
                            </View>
                        }
                    </View>
                }

                <View style={[styles.menu]}>

                    <Button style={[styles.icon]}
                        onPress={
                            function () {
                                navigate('profile', {});
                            }.bind(this)
                        }>
                        <View style={styles.icon}>
                            <Image style={styles.image} source={require("./005-avatar.png")} />
                        </View>
                    </Button>

                    <Button style={[styles.icon]}
                        onPress={
                            function () {
                                navigate('reduce', {});
                            }.bind(this)
                        }>
                        <View style={styles.icon}>
                            <Image style={styles.image} source={require("./001-reload.png")} />
                        </View></Button>


                    <Button style={[styles.icon]}
                        onPress={
                            function () {
                                navigate('read', {});
                            }.bind(this)
                        }>
                        <View style={styles.icon}>
                            <Image style={styles.image} source={require("./002-book.png")} />
                        </View></Button>

                    <Button style={[styles.icon]}
                        onPress={
                            function () {
                                navigate('shop', {});
                            }.bind(this)
                        }>
                        <View style={styles.icon}>
                            <Image style={styles.image} source={require("./008-shopping-bag.png")} />
                        </View></Button>

                    <Button style={[styles.icon]}
                        onPress={
                            function () {
                                navigate('shareFeed', {});
                            }.bind(this)
                        }>
                        <View style={styles.iconClicked}>
                            <Image style={styles.image} source={require("./006-share.png")} />
                        </View></Button>

                </View>
            </View >
        );
    }
}

class PostItem extends Component {
    render() {
        const { navigate } = this.props.navigation;

        var post = this.props.post;
        var url = post.imageURL;
        var date = moment(post.date).fromNow();
        return (
            <View style={styles.list_container}>
                {/* linked image */}
                <Button onPress={(() => {
                    navigate('otherProfile', { uid: post.userId });
                })}>
                    <Image style={styles.trashyPic} source={{ url }} />
                </Button>

                {/* linked username */}
                <Text style={styles.share_text}>
                    <Text style={{ fontWeight: "bold" }}
                        onPress={(() => {
                            navigate('otherProfile', { uid: post.userId });
                        })}>
                        {post.userName + "  "}
                    </Text>

                    {post.imageCaption}
                </Text>

                <Text style={styles.share_date}>
                    {date}
                </Text>


            </View>
        );
    }
}

module.exports = ShareFeed;
