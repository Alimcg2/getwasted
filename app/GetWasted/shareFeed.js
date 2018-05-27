import * as firebase from 'firebase';
import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, FlatList, ListView, ListItem, ScrollView, SectionList } from 'react-native';
import moment from 'moment';

import Button from 'react-native-button';
import app from './app';

import {
    StackNavigator,
} from 'react-navigation';

const styles = require('./styles.js');


export default class ShareFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getMenu: false,
            userName: "",
            profileImg: "",
            following: [],
            posts: []
        };
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    componentWillMount() {
        var user = firebase.auth().currentUser;
        this.setState({ userName: user.displayName });

        this.imageRef = firebase.database().ref().child("Users/" + user.uid + '/image');
        this.imageRef.on("value", function (snapshot) {
            this.setState({ profileImg: snapshot.val() });
        }.bind(this));

        this.friendsRef = firebase.database().ref('Users/' + user.uid + '/following');
        this.friendsRef.once('value').then((snapshot) => {
            var friendsArray = [];
            snapshot.forEach((child) => {
                friendsArray.push(child.val().uid);
            });
            this.setState({ following: Array.from(new Set(friendsArray)) });
        }).then(() => {
            this.state.following.forEach((friendId) => {
                var username;
                firebase.database().ref('Users/' + friendId + '/name').once('value').then((snapshot) => {
                    username = snapshot.val();
                }).then(() => {
                    this.postsRef = firebase.database().ref('Users/' + friendId + '/trashypics')
                    this.postsRef.once('value').then((snapshot) => {
                        var postsArray = [];
                        snapshot.forEach((child) => {
                            var post = child.val();
                            if (post.published) {
                                post['userId'] = friendId;
                                post['username'] = username;
                                postsArray.push(post);
                            }
                        });
                        this.setState({ posts: postsArray });
                    });
                });
            });
        });

        // then order posts by time


    }

    componentWillUnmount() {
        if (this.imageRef) {
            this.imageRef.off();
        }
        if (this.friendsRef) {
            this.friendsRef.off();
        }
        if (this.postsRef) {
            this.postsRef.off();
        }
    }

    handleSignOut() {
        if (firebase.auth().currentUser) {
            firebase.auth().signOut();
        }
        this.props.navigation.navigate('landing', {});
    }

    render() {
        const { navigate } = this.props.navigation;

        var url = this.state.profileImg.toString();

        var postItems = this.state.posts.map((post, index) => {
            return <PostItem key={index} post={post} navigation={this.props.navigation} />;
        });

        return (
            
                <View style={styles.container_main}>
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

                {/* icon to open sidebar */}
                <View>
                    <Text style={styles.headerPadding}>CONNECT</Text>
                </View>

                <View>
                    {postItems.length == 0 ?
                        // button to follow people if no posts
                        <View>
                            <Button style={[styles.button, styles.no_posts_found]} onPress={
                                function () {
                                    console.log('boop');
                                }.bind(this)}>
                                Find people to follow
                            </Button>
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
            </View>
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
                        {post.username + "  "}
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
