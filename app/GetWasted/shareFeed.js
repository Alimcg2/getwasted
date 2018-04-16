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
                            post['userId'] = friendId;
                            post['username'] = username;
                            postsArray.push(post);
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

                {/* sidebar */}
                <View style={[styles.menu, this.state.getMenu && styles.menu_active]}>

                    <Button style={[styles.menu_item]}
                        onPress={
                            function () {
                                navigate('profile', {});
                            }.bind(this)
                        }>Profile</Button>
                        
                    <Button style={[styles.menu_item]}
                        onPress={
                            function () {
                                navigate('reduce', {});
                            }.bind(this)
                        }>Reduce</Button>

                    <Button style={[styles.menu_item]}
                        onPress={
                            function () {
                                navigate('read', {});
                            }.bind(this)
                        }>Read</Button>

                    <Button style={[styles.menu_item]}
                        onPress={
                            function () {
                                navigate('shop', {});
                            }.bind(this)
                        }>Shop</Button>

                    <Button style={[styles.menu_item]}
                        onPress={
                            function () {
                                this.setState({ getMenu: false });
                            }.bind(this)
                        }>Share</Button>

                    <Button style={styles.menu_item} title="Sign out"
                        onPress={this.handleSignOut} >Sign Out</Button>
                </View>

                {/* icon to open sidebar */}
                <View>
                    <Button onPress={
                        function () {
                            this.setState({ getMenu: true });
                        }.bind(this)}>
                        <Image style={styles.image} source={{ url }} />
                    </Button>
                    <Text style={styles.header}>SHARE</Text>
                </View>

                <ScrollView>
                    {postItems}
                </ScrollView>


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
            <View style={styles.share_container}>
                <Image style={styles.share_image} source={{ url }} />

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
