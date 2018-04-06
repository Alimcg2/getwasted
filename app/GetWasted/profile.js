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



export default class read extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getMenu : false,
            profileImg : "",
            imgs : [],
        };
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    componentWillMount() {
        var user = firebase.auth().currentUser;
        this.imageRef = firebase.database().ref().child("Users/" + user.uid + "/image"); /* gets the image-parent class*/
        this.imageRef.on("value", function(snapshot) {
            this.setState({profileImg: snapshot.val()});
        }.bind(this)); /* actual image-info */
        this.blogsRef = firebase.database().ref().child("BlogPosts/");
        this.blogsRef.on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                var format;
                if (childData.ImageURL == "NULL - image") {
                    format = {title: childData.Title, blog: childData.Blog, img: require("./getwastedicon.png"), link: childData.Link}
                }
                else {
                    format = {title: childData.Title, blog: childData.Blog, img: {uri: childData.ImageURL}, link: childData.Link}
                }
                var all = this.state.imgs;
                all.push(format)
                this.setState({imgs: all});
            }.bind(this));
        }.bind(this)); /* actual image-info */
    }
    componentWillUnmount() {
        if (this.imageRef) {
            this.imageRef.off();
        }
        if (this.blogsRef) {
            this.blogsRef.off();
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
        const { navigate }  = this.props.navigation;
        var imgs = this.state.imgs;
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
                
                <Button style={styles.menu_item} title="Sign out"
                      onPress={this.handleSignOut} >Sign Out</Button>
                </View>
                
                 <Button onPress={
                function() {
                    this.setState({getMenu : true});
                }.bind(this)}>
                <Image style={styles.image} source={{url}} />
                </Button>

                <Text style={styles.subtitle2}>{"User Name"}</Text>

                <Text style={styles.subtitle3}>{"Following: 592"}</Text>
                
                <Button style={[styles.subtitle3]}>Followers: 489</Button>

                <Text style={styles.subtitle3}>{"Posts: 68"}</Text>
                
                <Button style={[styles.button2]}> Settings</Button>

                <Text style={[styles.subtitle3]}>{"Post History"}</Text>

                <FlatList
            data={imgs}
            renderItem={({item}) => <View style={styles.list_container}>
                        
                        <Button onPress={()=> Linking.openURL("")}>
                        <Image style={styles.trashyPic} source={item.img}/>
                        </Button>
                        
                        <Text style={styles.subtitle}>{item.title}</Text>
                        <Text style={styles.subtitle2}>{item.blog}</Text>
                        </View>}
                />
                
            </View>
        );
    }
}

module.exports = read;
