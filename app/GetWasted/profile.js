
import * as firebase from 'firebase';
import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, FlatList, List, Linking, ListView, ListItem, ScrollView, SectionList } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import flatListdata from './reduce_fake_picture';

import Button from 'react-native-button';
import app from './app';
import reduce from './reduce';
import setting from './setting';
import moment from 'moment';


import {
    StackNavigator,
} from 'react-navigation';

const styles = require('./styles.js');



export default class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getMenu: false,
            profileImg: "",
            posts: [],
            userName: "",
            followers: [],
            following: [],
            userInfo: [],
        };
        this.handleSignOut = this.handleSignOut.bind(this);
        this.handleLike = this.handleLike.bind(this);
    }

    componentWillMount() {
        var user = firebase.auth().currentUser;
        this.setState({ userInfo: user });
        this.imageRef = firebase.database().ref().child("Users/" + user.uid + "/image"); /* gets the image-parent class*/
        this.setState({ userName: user.displayName });
        this.imageRef.on("value", function (snapshot) {
            this.setState({ profileImg: snapshot.val() });
        }.bind(this));


        this.postRef = firebase.database().ref().child("Users/" + user.uid + "/trashypics");
        this.postRef.on("value", (snapshot) => {
            var pics = [];
            snapshot.forEach((child) => {
                var pic = child.val();
                var numLikes;
                var likeString;
                var liked = false;;
                if (pic.likes) {
                    numLikes = pic.likes.split(",").length;
                    likeString = pic.likes;
                    if (pic.likes.split(",").includes(user.uid)) {
                        liked = true;
                    }
                } else {
                    numLikes = 0;
                    likeString = "";
                }
                var userName = this.state.userName;
                var format = {
                    caption: pic.imageCaption,
                    likes: numLikes,
                    img: { uri: pic.imageURL },
                    date: pic.date,
                    username: user.displayName,
                    userId: user.uid,
                    i: child.key,
                    currentLikes: likeString,
                    isLiked: liked
                }
                pics.push(format);
            });
            this.setState({ posts: pics });
        });


        this.followRef = firebase.database().ref().child("Users/" + user.uid + "/followers");
        this.followRef.on("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                var format = { uid: childData.uid }
                var all = this.state.followers;
                all.push(format)
                this.setState({ followers: all });
            }.bind(this));
        }.bind(this));

        this.followingRef = firebase.database().ref().child("Users/" + user.uid + "/following");
        this.followingRef.on("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                var format = { uid: childData.uid }
                var all = this.state.following;
                all.push(format)
                this.setState({ following: all });
            }.bind(this));
        }.bind(this));

    }
    componentWillUnmount() {
        if (this.imageRef) {
            this.imageRef.off();
        }
        if (this.postRef) {
            this.postRef.off();
        }
        if (this.followRef) {
            this.followRef.off();
        }
        if (this.followingRef) {
            this.followingRef.off();
        }
    }

    handleSignOut() {
        if (firebase.auth().currentUser) {
            firebase.auth().signOut();
        }
        this.props.navigation.navigate('landing', {});
    }


    handleLike(post) {
        console.log(this.state.posts[post.i]);
        var uids;
        if (post.isLiked == false) {
            numLikes = this.state.posts[post.i] + 1;
            if (this.state.posts.currentLikes != "" && this.state.posts.currentLikes != undefined) {
                uids = this.state.posts.currentLikes + "," + this.state.userInfo.uid;
            } else {
                uids = this.state.userInfo.uid;
            }
        } else {
            numLikes = this.state.posts[post.i] - 1;
            if (this.state.posts.currentLikes != "" && this.state.posts.currentLikes != undefined) {
                if (post.currentLikes.includes("," + this.state.userInfo.uid)) {
                    uids = this.state.post.currentLikes.replace("," + this.state.userInfo.uid, "");
                } else if (post.currentLikes.includes(this.state.userInfo.uid)) {
                    uids = this.state.post.currentLikes.replace(this.state.userInfo.uid, "");
                }
            } else {
                uids = "";
            }

        }
        //this.setState({ this.state.posts[post.i].currentLikes: uids });
        //this.setState({ this.state.posts[post.i].numLikes: numLikes });
        var updates = {};
        updates["Users/" + this.state.userInfo.uid + "/trashypics/" + post.i + "/"] = {
            likes: uids,
            imageCaption: post.caption,
            imageURL: post.img.uri,
            date: post.date
        };
        firebase.database().ref().update(updates);
        //this.setState({this.state.posts[post.i] : numLikes})

    }


    render() {
        const handleLike = this.handleLike;
        var url = this.state.profileImg.toString();
        const { navigate } = this.props.navigation;
        var user = this.state.userName;
        var posts = this.state.posts;
        var followers = this.state.followers;
        var following = this.state.following;

        var postItems = this.state.posts.map((post, index) => {
            return <PostItem key={index} post={post} handleLike={handleLike} navigation={this.props.navigation} />;
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

                <Button onPress={
                    function () {
                        this.setState({ getMenu: true });
                    }.bind(this)}>
                    <Image style={styles.profileImage} source={{ url }} />
                </Button>



                <Text style={styles.headerRight}>{user.toUpperCase()}</Text>



                <View style={styles.follow_container}>
                    <Text style={styles.subtitle3}>Following: {following.length}</Text>

                    <Button style={[styles.subtitle3]}>Followers: {followers.length}</Button>

                    <Text style={styles.subtitle3}>Posts: {posts.length}</Text>
                </View>


                <View>
                    <ScrollView style={styles.profilePosts}>
                        {postItems}
                        <View style={styles.buffer}></View>
                    </ScrollView>
                </View>



                <View style={[styles.menu]}>

                    <Button style={[styles.icon]}
                        onPress={
                            function () {
                                navigate('profile', {});
                            }.bind(this)
                        }>
                        <View style={styles.iconClicked}>
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
                        <View style={styles.icon}>
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
        const handleLike = this.props.handleLike;
        var post = this.props.post;
        var url = post.img;
        var numLikes = post.likes;
        var caption = post.caption;
        var date = moment(post.date).fromNow();
        return (
            <View style={styles.list_container}>
                {/* linked image */}
                <Button onPress={(() => {
                    navigate('otherProfile', { uid: post.userId });
                })}>
                    <Image style={styles.trashyPic} source={url} />
                </Button>

                {/* linked username */}
                <Text style={styles.share_text}>
                    <Text style={{ fontWeight: "bold" }}
                        onPress={(() => {
                            navigate('otherProfile', { uid: post.userId });
                        })}>
                        {post.username + "  "}
                    </Text>

                    {caption}
                </Text>

                <Text style={styles.share_date}>
                    Likes: {numLikes}
                </Text>

                <Button onPress={
                    function () {
                        handleLike(post);
                    }
                }>

                    {!post.isLiked ?
                        <Image style={styles.heartImage} source={require("./007-heart.png")} /> :
                        <Image style={styles.heartImage} source={require("./heartafter.png")} />
                    }
                </Button>

                <Text style={styles.share_date}>
                    {date}
                </Text>


            </View>
        );
    }
}


module.exports = profile;
