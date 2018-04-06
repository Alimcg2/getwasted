import * as firebase from 'firebase';
import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, FlatList, ListView, ListItem, ScrollView, SectionList } from 'react-native';

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

        this.postsRef = firebase.database().ref("Posts");
        this.postsRef.on("value", function (snapshot) {
            var postsArray = [];
            snapshot.forEach(function (child) {
                var obj = { 'postId': child.key, 'postObj': child.val() };
                postsArray.push(obj);
            });

            // sort by time posted
            // postsArray.sort((a, b) => {
            //     return b.postObj.postDate - a.postObj.postDate;
            // });

            this.setState({ posts: postsArray });
        }.bind(this));

    }

    componentWillUnmount() {
        if (this.imageRef) {
            this.imageRef.off();
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

        var postItems = this.state.posts.map((post) => {
            return (<PostItem key={post.postId} post={post.postObj} />);
        });

        this.state.posts.forEach((post) => {
            console.log('Post', post);
        });

        return (
            <View style={styles.container_main}>

                {/* sidebar */}
                <View style={[styles.menu, this.state.getMenu && styles.menu_active]}>
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
        var post = this.props.post;
        var url = post.Image;
        return (
            <View style={styles.share_container}>
                <Image style={styles.share_image} source={{ url }} />
                <Text style={styles.share_text}>
                    <Text style={{fontWeight: "bold"}}>
                        {post.Username + "  "}
                    </Text>
                    {post.Text}
                </Text>
                <Text style={styles.share_date}>
                    {post.PostDate}
                </Text>
            </View>
        );
    }
}

module.exports = ShareFeed;
