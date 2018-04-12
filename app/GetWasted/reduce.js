import * as firebase from 'firebase';
import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, FlatList, ListView, ListItem, ScrollView, SectionList } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import flatListdata from './reduce_fake_picture';

import Button from 'react-native-button';
import app from './app';
import trashy from './trashy';
import read from './read';
import goalPage from './goalPage';
import cameraTest from './cameraTest';
import shop from './shop';
import shareFeed from './shareFeed';
import profile from './profile';

import {
    StackNavigator,
} from 'react-navigation';

const styles = require('./styles.js');


export default class reduce extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getMenu : false,
            userName : "",
            profileImg : "",
            goalTitles : [],
            goalBeginDates : [],
            goalEndDates : [],
            goalStatus: [],
            totalGoals: [],
            totalCurrent: [],
            totalImages: [],
        };
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    componentWillMount() {
        var user = firebase.auth().currentUser;
        this.imageRef = firebase.database().ref().child("Users/" + user.uid + "/image"); /* gets the image-parent class*/
        this.imageRef.on("value", function(snapshot) {
            this.setState({profileImg: snapshot.val()});
        }.bind(this)); /* actual image-info */
        
        this.goalRef = firebase.database().ref().child("Users/" + user.uid + "/goals");
        this.picsRef = firebase.database().ref().child("Users/" + user.uid + "/trashypics");
        var titles = [];
        var beginDates = [];
        var endDates = [];
        var status = [];
        var images = [];
        var goals = 0;
        var current = 0;
        var numImages = 0;
        this.goalRef.on("value", function(snapshot) {
            this.setState({goals: snapshot.val()});
            snapshot.forEach(function(data) {
                titles.push(data.val()["goalText"]);
                beginDates.push(data.val()["beginDates"]);
                endDates.push(data.val()["endDates"]);
                status.push(data.val()["status"]);
                goals++;
                if (data.val()["status"] == "Current"){
                    current++;
                }  
            }.bind(this));
            
            this.setState({ totalGoals : goals, totalCurrent : current});
        }.bind(this));
        this.picsRef.on("value", function(snapshot) {
            this.setState({goals: snapshot.val()});
            snapshot.forEach(function(data) {
                images.push(data.val()["imageCaption"]);
                numImages++;
            }.bind(this));
            this.setState({totalImages : numImages});
        }.bind(this));
        this.setState({ userName: user.displayName,
                        goalTitles : titles,
                        goalBeginDates : beginDates,
                        goalEndDates : endDates,
                        goalStatus : status,
                      });
        
    }

    componentWillUnmount() {
        if (this.imageRef) {
            this.imageRef.off();
        }
        if (this.goalRef) {
            this.goalRef.off();
        }
        if (this.picsRef) {
            this.picsRef.off();
        }
    }

    handleSignOut() {
        if (firebase.auth().currentUser) {
            firebase.auth().signOut();
        }
        this.props.navigation.navigate('landing', {});
    }

    render() {
        const ts = this.trashy; 
        const gp = this.goalPage;
        const rd = this.read;
        const pf = this.profile;
        
        
        const { navigate }  = this.props.navigation;
        const resizeMode = 'center';

        var display = this.state.userName;
        var url = this.state.profileImg.toString();
        var titles = this.state.goalTitles;
        var beginDates = this.state.goalBeginDates;
        var endDates = this.state.goalEndDates;
        var status = this.state.goalStatus;
        var goals = this.state.totalGoals;
        var current = this.state.totalCurrent;
        var images = this.state.totalImages;
        //var testing2 = testing["goalText"];

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
                    this.setState({getMenu : false});
                }.bind(this)
            }>Reduce</Button>

                <Button style={[styles.menu_item]}
            onPress={
                function() {
                    navigate('read', {});
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
                function() {
                    navigate('shareFeed', {});
                }.bind(this)
            }>Share</Button>
                
                <Button style={styles.menu_item} title="Sign out"
                      onPress={this.handleSignOut} >Sign Out</Button>
                </View>

            
                <View>
                <Button onPress={
                function() {
                    this.setState({getMenu : true});
                }.bind(this)}>
                <Image style={styles.image} source={{url}} />
                </Button>
                    <Text style={styles.header}>REDUCE</Text>
                </View>

            
                    <ScrollView style={styles.reduce_button_container}>
                    <Button style={styles.button}
                        onPress={
                function() {
                    navigate('trashy', {});
                }
            }>Trashy Pics</Button>

                    <Button style={styles.button}
            onPress={
                function() {
                    navigate('goalPage', {});
                }
            }>Goals</Button>
                </ScrollView>
                
            
                <View style={styles.goal_data_container}>
                <Text style={styles.data_header}>TOTAL GOALS: <Text style={styles.goal_data}>{goals}</Text></Text>
                
                <Text style={styles.data_header}>TOTAL IN PROGRESS: <Text style={styles.goal_data}>{current}</Text></Text>
                
                <Text style={styles.data_header}>TOTAL TRASY PICS: <Text style={styles.goal_data}>{images}</Text></Text>
                
                </View>
           </View>
        );
    }
}

module.exports = reduce;
