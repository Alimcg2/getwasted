import * as firebase from 'firebase';
import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, FlatList, List, Linking, ListView, ListItem, ScrollView, SectionList } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import flatListdata from './reduce_fake_picture';

import Button from 'react-native-button';
import app from './app';
import reduce from './reduce';
import setting from './setting';


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
        };
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    componentWillMount() {
        var user = firebase.auth().currentUser;
        this.imageRef = firebase.database().ref().child("Users/" + user.uid + "/image"); /* gets the image-parent class*/
        this.setState({ userName: user.displayName });
        this.imageRef.on("value", function (snapshot) {
            this.setState({ profileImg: snapshot.val() });
        }.bind(this));


        this.postRef = firebase.database().ref().child("Users/" + user.uid + "/trashypics");
        this.postRef.on("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                console.log(childData.imageURL);
                // var likes;
                // if (childData.likes) {
                //     likes = childData.likes.length;
                // } else {
                //     likes: 0;
                // }
                var format = { caption: childData.imageCaption, likes: 0, img: { uri: childData.imageURL }, date: childData.date }
                var all = this.state.posts;
                all.push(format)
                this.setState({ posts: all });
            }.bind(this));
        }.bind(this));


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



    render() {
        var url = this.state.profileImg.toString();
        const { navigate } = this.props.navigation;
        var user = this.state.userName;
        var posts = this.state.posts;
        var followers = this.state.followers;
        var following = this.state.following;
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
                function() {
                    this.setState({getMenu : true});
                }.bind(this)}>
                <Image style={styles.profileImage} source={{url}} />
                </Button>

            
                
                <Text style={styles.headerRight}>{user.toUpperCase()}</Text>

            
                
                <View style={styles.follow_container}>
                    <Text style={styles.subtitle3}>Following: {following.length}</Text>

                    <Button style={[styles.subtitle3]}>Followers: {followers.length}</Button>

                    <Text style={styles.subtitle3}>Posts: {posts.length}</Text>
                </View>


                <FlatList style={styles.scrollContainer}
                    data={posts}
                    renderItem={({ item }) => <View style={styles.list_container}>

                        <Image style={styles.trashyPic} source={item.img} />

                        <Text style={styles.subtitle}>{item.caption}</Text>
                        <Text style={styles.subtitle2}>Likes: {item.likes}</Text>

                    </View>}
                />

            

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

module.exports = profile;
