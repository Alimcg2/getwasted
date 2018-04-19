import * as firebase from 'firebase';
import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, FlatList, List, Linking, ListView, ListItem, ScrollView, SectionList } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import flatListdata from './reduce_fake_picture';

import Button from 'react-native-button';
import app from './app';
import reduce from './reduce';


import {
    StackNavigator,
} from 'react-navigation';

const styles = require('./styles.js');



export default class otherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getMenu : false,
            profileImg : "",
            posts : [],
            userName : "",
            followers: [],
            following: [],
            userID: this.props.navigation.state.params.uid,
            buttonText: "Follow" // make this dynamic
        };
        this.handleSignOut = this.handleSignOut.bind(this);
        this.handleFollow = this.handleFollow.bind(this);
    }

    componentWillMount() {
        console.log(this.props.navigation.state.params.uid);
        var currentUser = firebase.auth().currentUser;
        this.imageRef = firebase.database().ref().child("Users/" + this.state.userID + "/image"); /* gets the image-parent class*/
        this.imageRef.on("value", function(snapshot) {
            this.setState({profileImg: snapshot.val()});
        }.bind(this));
        this.nameRef = firebase.database().ref().child("Users/" + this.state.userID + "/name");
        this.nameRef.on("value", function(snapshot) {
            this.setState({userName: snapshot.val()});
        }.bind(this));

        
        this.postRef = firebase.database().ref().child("Users/" + this.state.userID + "/trashypics");
        this.postRef.on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                console.log(childData.imageURL);
                var likes = childData.likes ? childData.likes.length : 0;
                var format = {caption: childData.imageCaption, likes: likes, img: {uri: childData.imageURL}, date: childData.date}
                var all = this.state.posts;
                all.push(format)
                this.setState({posts: all});
            }.bind(this));
        }.bind(this));
        
        
        this.followRef = firebase.database().ref().child("Users/" +  this.state.userID + "/followers");
        this.followRef.on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                var format = {uid: childData.uid}
                var all = this.state.followers;
                all.push(format)
                this.setState({followers: all});
            }.bind(this));
        }.bind(this));
        
        this.followingRef = firebase.database().ref().child("Users/" + this.state.userID + "/following");
        this.followingRef.on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                var format = {uid: childData.uid}
                var all = this.state.following;
                all.push(format)
                this.setState({following: all});
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
        if (this.nameRef) {
            this.nameRef.off();
        }
    }

    handleSignOut() {
        if (firebase.auth().currentUser) {
            firebase.auth().signOut();
        }
        this.props.navigation.navigate('landing', {});
    }

    handleFollow() {
        if (this.state.buttonText == "Follow"){
            
            var currentUser = firebase.auth().currentUser;
            
            this.userGoalsRef = firebase.database().ref("Users/" + this.state.userID + "/followers/");
            var addData = {
                uid: currentUser.uid
            };
            this.userGoalsRef.push(addData);
            this.userGoalsRef = firebase.database().ref("Users/" + currentUser.uid + "/following/");
            var addData = {
                uid: this.state.userID
            };
            this.userGoalsRef.push(addData);
            this.setState({buttonText: "Unfollow"});
        } else {
            // figure out how to remove stuff here
            this.setState({buttonText: "Follow"});
        }
    }
    

    render() {
        var url = this.state.profileImg.toString();
        const { navigate }  = this.props.navigation;
        var user = this.state.userName;
        var posts = this.state.posts;
        var followers = this.state.followers;
        var following = this.state.following;
        var buttonText = this.state.buttonText;
        console.log(posts);
        return (
            <View style={styles.container_main}>
                
                <View style={[styles.menu, this.state.getMenu && styles.menu_active]}>
                
                <Button style={[styles.menu_item]}
            onPress={
                function() {
                    navigate('profile', {});
                }.bind(this)
            }>Profile</Button>

                <Button style={[styles.menu_item]}
            onPress={
                function() {
                    navigate('reduce', {});
                }.bind(this)
            }>Reduce</Button>
                
                <Button style={[styles.menu_item]}
            onPress={
                function() {
                    this.setState({getMenu : false});
                }.bind(this)
            }>Read</Button> 

                <Button style={[styles.menu_item]}
            onPress={
                function() {
                    navigate('shop', {});
                }.bind(this)
            }>Shop</Button>
                
                <Button style={[styles.menu_item]}
            onPress={
                function () {
                    navigate('setting', {});
                }.bind(this)
            }>Settings</Button>
                
            
                <Button style={styles.signOut} title="Sign out"
                      onPress={this.handleSignOut} >Sign Out</Button>
                </View>
                
                 <Button onPress={
                function() {
                    this.setState({getMenu : true});
                }.bind(this)}>
                <Image style={styles.image} source={{url}} />
                </Button>

                <Text style={styles.header}>{user.toUpperCase()}</Text>
                
                <View style={styles.follow_container}>
                <Text style={styles.subtitle3}>Following: {following.length }</Text>
                
                <Button style={[styles.subtitle3]}>Followers: {followers.length}</Button>

                <Text style={styles.subtitle3}>Posts: {posts.length}</Text>
                </View>

                <Button style={styles.button2} onPress={
                    this.handleFollow
                }>
                {buttonText}
                </Button>
            

                <FlatList
            data={posts}
            renderItem={({item}) =>
                        <View style={styles.list_container}>
                        
                        <Image style={styles.trashyPic} source={item.img}/>
                        
                        <Text style={styles.subtitle}>{item.caption}</Text>
                        <Text style={styles.subtitle2}>Likes: {item.likes}</Text>
                        
                        </View>
                       }
                />

                
            </View>
        );
    }
}

module.exports = otherProfile;
