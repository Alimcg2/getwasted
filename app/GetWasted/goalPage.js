import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View, StyleSheet, SectionList, Text, Image } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import Button from 'react-native-button';
import {
    StackNavigator,
} from 'react-navigation';

import app from './app';
import editGoal from './editGoal';
import newGoal from './newGoal';
import goalSummary from './goalSummary';
const styles = require('./styles.js');

export default class goalPage extends Component {
    constructor(props) {
        super(props);
        this.state = { user: firebase.auth().currentUser, /* gets current user */
                        userName : "",
                        profileImg : "",
                       goalTitles : [],
                     };

    }

    componentWillMount() {
        var user = firebase.auth().currentUser;
        this.imageRef = firebase.database().ref().child("Users/" + user.uid + "/image"); /* gets the image-parent class*/
        this.imageRef.on("value", function(snapshot) {
            this.setState({profileImg: snapshot.val()});
        }.bind(this)); /* actual image-info */
        
        this.goalRef = firebase.database().ref().child("Users/" + user.uid + "/goals");
        this.goalRef.on("value", function(snapshot) {
            this.setState({goals: snapshot.val()});
            var titles = []
            var keys = [];
            snapshot.forEach(function(data) {
                titles.push(data.val()["goalText"]);
                keys.push(data.key);
            }.bind(this));
            this.setState({
                userName : user.displayName,
                goalTitles : titles,
                goalKeys: keys
            });
        }.bind(this));   
    }

    componentWillUnmount() {
        if (this.imageRef) {
            this.imageRef.off();
        }
        if (this.goalRef) {
            this.goalRef.off();
        }
    }
    
    render() {
        const editGoal = this.editGoal; 
        const newGoal = this.newGoal; 
        const goalSummary = this.goalSummary; 

        let display = this.state.userName;
        var url = this.state.profileImg.toString();
        var titles = this.state.goalTitles;
        var keys = this.state.goalKeys;
        var sectionItems = [
            {title: "" , data: titles},
        ];
        const { navigate }  = this.props.navigation;
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
                <Text style={styles.headerPadding}>GOALS</Text>
                
                 <SectionList
            sections={sectionItems}
            renderItem={({item}) => <Button style={styles.button}  onPress={
                function() {
                    var index = titles.indexOf(item);
                    var key = keys[index];
                    console.log(index);
                    navigate('goalSummary', { index, item, key });
                }
            }>{item}</Button>
                        
                       }
            renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
            keyExtractor={(item, index) => index}
                /> 
                
                <Button style={styles.button_bottom} title="New Goal" onPress={
                    function() {
                        navigate('newGoal', {});
                    }
                }>Create New Goal</Button>

                        
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
                        <View style={styles.iconClicked}>
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

module.exports = goalPage;
