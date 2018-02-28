import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View, StyleSheet, SectionList, Button, Text, Image } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import {
    StackNavigator,
} from 'react-navigation';

import app from './app';
import editGoal from './editGoal';
import newGoal from './newGoal';
const styles = require('./styles.js');

const Stacks = StackNavigator({
    newGoal: { screen: newGoal }, 
});


export default class goalPage extends Component {
    constructor(props) {
        super(props);
        this.state = { user: firebase.auth().currentUser, /* gets current user */
                        userName : "",
                        profileImg : "",
                        goalTitles : [],
                        goalBeginDates : [],
                        goalEndDates : [],
                        goalStatus: []};   
    }

    componentWillMount() {
        this.setState({userName: this.state.user.displayName })
        this.imageRef = firebase.database().ref().child("Users/" + this.state.user.uid + "/image"); /* gets the image-parent class*/
        this.imageRef.on("value", function(snapshot) {
            this.setState({profileImg: snapshot.val()});
        }.bind(this)); /* actual image-info */
        
        this.goalRef = firebase.database().ref().child("Users/" + this.state.user.uid + "/goals");
        this.goalRef.on("value", function(snapshot) {
            this.setState({goals: snapshot.val()});
            var titles = []
            var beginDates = []
            var endDates = []
            var status = []
            var keys = [];
            snapshot.forEach(function(data) {
                titles.push(data.val()["goalText"]);
                beginDates.push(data.val()["beginDates"]);
                endDates.push(data.val()["endDates"]);
                status.push(data.val()["goalStatus"]);
                keys.push(data.key);
            }.bind(this));
            this.setState({
                goalTitles : titles,
                goalBeginDates : beginDates,
                goalEndDates : endDates,
                goalStatus : status,
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

        let display = this.state.userName;
        var url = this.state.profileImg.toString();
        var titles = this.state.goalTitles;
        var beginDates = this.state.goalBeginDates;
        var endDates = this.state.goalEndDates;
        var status = this.state.goalStatus;
        var keys = this.state.goalKeys;
        var sectionItems = [
            {title: "Goals" , data: titles},
        ];
        const { navigate }  = this.props.navigation;
        return (
                <View style={styles.container}>
                <Image
            style={{width: 80, height: 80}}
            source={{uri: url}}
                />
                <Text style={styles.welcome}>Goals</Text>
                
                 <SectionList
            sections={sectionItems}
            renderItem={({item}) => <Button style={styles.item} title={item} onPress={
                function() {
                    var index = titles.indexOf(item);
                    var key = keys[index];
                    console.log(index);
                    navigate('editGoal', { index, item, key });
                }
            }/>
                        
                       }
            renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
            keyExtractor={(item, index) => index}
                /> 
                
                <Button style={styles.submit} title="New Goal" onPress={
                    function() {
                        navigate('newGoal', {});
                    }
                }/>
            
            </View>

        );
    }
}

module.exports = goalPage;
