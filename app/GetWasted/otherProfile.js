import * as firebase from 'firebase';
import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, FlatList, List, Linking, ListView, ListItem, ScrollView, SectionList } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import flatListdata from './reduce_fake_picture';

import Button from 'react-native-button';
import app from './app';
import reduce from './reduce';
import moment from 'moment';


import {
    StackNavigator,
} from 'react-navigation';

const styles = require('./styles.js');



export default class otherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getMenu: false,
            profileImg: "",
            posts: [],
            userName: "",
            followers: [],
            following: [],
            userId: this.props.navigation.state.params.uid,
            buttonText: "Follow" // make this dynamic
        };
        this.handleSignOut = this.handleSignOut.bind(this);
        this.handleFollow = this.handleFollow.bind(this);
        this.handleLike = this.handleLike.bind(this);
    }

    componentWillMount() {
        var currentUser = firebase.auth().currentUser;
        this.imageRef = firebase.database().ref().child("Users/" + this.state.userId + "/image"); /* gets the image-parent class*/
        this.imageRef.on("value", function (snapshot) {
            this.setState({ profileImg: snapshot.val() });
        }.bind(this));
        this.nameRef = firebase.database().ref().child("Users/" + this.state.userId + "/name");
        this.nameRef.on("value", function (snapshot) {
            this.setState({ userName: snapshot.val() });
        }.bind(this));

        this.postRef = firebase.database().ref().child("Users/" + this.state.userId + "/trashypics");
        var hasPosts = false;
        this.postRef.on("value", (snapshot) => {
            var pics = [];
            snapshot.forEach((child) => {
                var pic = child.val();
                if (pic.published) {
                    hasPosts = true;
                    var numLikes;
                    var likeString;
                    var liked = false;
                    if (pic.likes) {
                        numLikes = pic.likes.split(",").length;
                        likeString = pic.likes;
                        console.log(pic.likes);
                        if (pic.likes.split(",").includes(currentUser.uid)) {
                            console.log(currentUser.uid)
                            console.log("made it!");
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
                        username: userName,
                        userId: this.state.userId,
                        i: child.key,
                        currentLikes: likeString,
                        isLiked: liked
                    }
                    pics.push(format);
                }
            });
            this.setState({ posts: pics });
            this.setState({ containsPosts: hasPosts });
        });

        this.followersRef = firebase.database().ref().child("Users/" + this.props.navigation.state.params.uid  + "/followers");
        this.followersRef.on("value", (snapshot) => {
            var followers = [];
            snapshot.forEach((child) => {
                var user = child.val();
                // if current user is a follower change button text
                if (user.uid == currentUser.uid) {
                    this.setState({ buttonText: "Unfollow" });
                }
                var format = { uid: user.uid }
                followers.push(user);
            });
            this.setState({ followers: followers });
        });

        this.followingRef = firebase.database().ref().child("Users/" +  this.props.navigation.state.params.uid + "/following");
        this.followingRef.on("value", (snapshot) => {
            var following = [];
            snapshot.forEach((child) => {
                console.log("im in the child of following");
                var user = child.val();
                var format = { uid: user.uid }
                following.push(user);
            });
            this.setState({ following: following });
        });
        console.log(this.state.buttonText);
        console.log(this.state.following);
        console.log(this.state.followers);

    }
    componentWillUnmount() {
        if (this.imageRef) {
            this.imageRef.off();
        }
        if (this.postRef) {
            this.postRef.off();
        }
        if (this.followersRef) {
            this.followersRef.off();
        }
        if (this.followingRef) {
            this.followingRef.off();
        }
        if (this.nameRef) {
            this.nameRef.off();
        }
        if (this.currentUserFollowingRef) {
            this.currentUserFollowingRef.off();
        }
    }

    handleSignOut() {
        if (firebase.auth().currentUser) {
            firebase.auth().signOut();
        }
        this.props.navigation.navigate('landing', {});
    }

    handleFollow() {
        var currentUser = firebase.auth().currentUser;
        this.currentUserFollowingRef = firebase.database().ref("Users/" + currentUser.uid + "/following/");

        if (this.state.buttonText == "Follow") {
            // add current user to this user's list of followers
            var addData = {
                uid: currentUser.uid
            }
            this.followersRef.push(addData);

            // add this user to the current user's list of following
            var addData = {
                uid: this.state.userId
            };
            this.currentUserFollowingRef.push(addData);

            // change button to say unfollow
            this.setState({ buttonText: "Unfollow" });
        } else {
            // remove current user from this user's list of followers
            this.followersRef.orderByChild('uid').equalTo(currentUser.uid)
                .once('value').then((snapshot) => {
                    snapshot.forEach((child) => {
                        // remove child
                        this.followersRef.child(child.key).remove();
                    });
                });

            this.currentUserFollowingRef.orderByChild('uid').equalTo(this.state.userId)
                .once('value').then((snapshot) => {
                    snapshot.forEach((child) => {
                        // remove child
                        this.currentUserFollowingRef.child(child.key).remove();
                    });
                });

            this.setState({ buttonText: "Follow" });
        }
    }

    handleLike(post) {
        currentPost = {}
        index = 0;
        postIndex = 0;
        for (var postState in this.state.posts) {
            if (postState.i == post.i) {
                postIndex = index;
            }
            index++;
        }

        console.log(this.state.posts[postIndex]);
        console.log(" uid" + this.state.userId);
        var uids;
        var currentUid = firebase.auth().currentUser.uid;
        console.log(post.isLiked);
        if (post.isLiked == false) {
            numLikes = post.likes + 1;
            if (post.currentLikes != "" && post.currentLikes != undefined) {
                uids = post.currentLikes + "," + currentUid;
            } else {
                uids = currentUid;
            }
        } else {
            numLikes = post.likes - 1;
            if (post.currentLikes != "" && post.currentLikes != undefined) {
                if (post.currentLikes.includes("," + currentUid)) {
                    uids = post.currentLikes.replace("," + currentUid, "");
                } else if (post.currentLikes.includes(currentUid)) {
                    uids = post.currentLikes.replace(currentUid, "");
                }
            } else {
                uids = "";
            }

        }
        //this.setState({ this.state.posts[post.i].currentLikes: uids });
        //this.setState({ this.state.posts[post.i].numLikes: numLikes });
        var updates = {};
        updates["Users/" + this.state.userId + "/trashypics/" + post.i + "/"] = {
            likes: uids,
            imageCaption: post.caption,
            imageURL: post.img.uri,
            date: post.date,
            published: true
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
        var buttonText = this.state.buttonText;

        var postItems = this.state.posts.map((post, index) => {
            return <PostItem key={index} post={post} userName={user} handleLike={handleLike} navigation={this.props.navigation} />;
        });

        return (

            <View style={styles.container_main}>
                <View style={styles.topContainer}>
                    <Text style={styles.title}>WasteLess</Text>

                    {/* back button to take user back to connect page */}
                    < Button onPress={() => {
                        console.log("pressing back");
                        this.props.navigation.goBack();
                    }}>
                        <Image style={styles.backIcon} source={require("./angle-left.png")} />
                    </Button>

                    {/* settings */}
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
                    <ScrollView>
                        <View style={styles.flexContainer}>
                            <Image style={styles.profileImage} source={{ url }} />

                            <Text style={styles.headerRight}>{user.toUpperCase()}</Text>
                        </View>
                        <View style={styles.follow_container}>
                            <Text style={styles.subtitle3}>Following: {following.length}</Text>

                            <Button style={[styles.subtitle3]}>Followers: {followers.length}</Button>

                            <Text style={styles.subtitle3}>Posts: {posts.length}</Text>
                        </View>

                        <Button style={styles.button2NoPadding} onPress={
                            this.handleFollow
                        }>
                            {buttonText}
                        </Button>

                        {postItems}
                        <View style={{ height: 150 }}></View>
                    </ScrollView>
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

            </View >
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
        var userID = this.props.navigation.state.params.uid;
        var username = this.props.userName;
        return (
            <View style={styles.list_container}>
                <Image style={styles.trashyPic} source={url} />
                
                <Text style={styles.share_text}>
                    <Text style={{ fontWeight: "bold" }}>
                        {username + "  "}
                    </Text>
                    {caption}
                </Text>

                <View style={styles.flexContainer2}>
                    <Text style={styles.share_likes}>
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


            </View>
        );
    }
}

module.exports = otherProfile;
