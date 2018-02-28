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
        var user = firebase.auth().currentUser; /* gets current user */
        this.state = { userName : user.displayName,
                       profileImg : "",
                       goalTitles : [],
                       goalBeginDates : [],
                       goalEndDates : [],
                       goalStatus: []};
        var imageRef = firebase.database().ref().child("Users/" + user.uid + "/image"); /* gets the image-parent class*/
        imageRef.on("value", function(snapshot) {
            this.setState({profileImg: snapshot.val()});
        }.bind(this)); /* actual image-info */
        
        var goalRef = firebase.database().ref().child("Users/" + user.uid + "/goals");
        goalRef.on("value", function(snapshot) {
            this.setState({goals: snapshot.val()});
            var titles = []
            var beginDates = []
            var endDates = []
            var status = []
            snapshot.forEach(function(data) {
                titles.push(data.val()["goalText"]);
                beginDates.push(data.val()["beginDates"]);
                endDates.push(data.val()["endDates"]);
                status.push(data.val()["goalStatus"]);
            }.bind(this));
            this.setState({goalTitles : titles});
            this.setState({goalBeginDates : beginDates});
            this.setState({goalEndDates : endDates});
            this.setState({goalStatus : status});
        }.bind(this));      
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
                    console.log(index);
                    navigate('editGoal', { index, item });
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
