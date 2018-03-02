import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View, StyleSheet, SectionList, Text, Image } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import Moment from 'react-moment';
import Button from 'react-native-button';
import {
    StackNavigator,
} from 'react-navigation';

import app from './app';
import goalPage from './goalPage';
import editGoal from './editGoal';
import newGoal from './newGoal';
// import newReminder from './newReminder';

const styles = require('./styles.js');

export default class goalSummary extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user : firebase.auth().currentUser, /* gets current user */
            userName : firebase.auth().currentUser.displayName,
            profileImg : "",
            goalID : this.props.navigation.state.params.key,
            goalText: this.props.navigation.state.params.item,
            goalBeginDate : "",
            goalEndDate : [],
            goalStatus: [],
            goalNotes: []
        };   
        
    }

    componentWillMount() {
        this.setState({userName: this.state.user.displayName })
        this.imageRef = firebase.database().ref().child("Users/" + this.state.user.uid + "/image"); /* gets the image-parent class*/
        this.imageRef.on("value", function(snapshot) {
            this.setState({profileImg: snapshot.val()});
        }.bind(this)); /* actual image-info */

        
        this.goalRef = firebase.database().ref().child("Users/" + this.state.user.uid + "/goals/" + this.state.goalID);
        this.goalRef.on("value", function(snapshot) {
            this.setState(
                { 
                    goalBeginDate: new Date(snapshot.val()['beginDate']),
                    goalEndDate: new Date(snapshot.val()['endDate']),
                    goalStatus: snapshot.val()['status'],
                    goalNotes: snapshot.val()['goalNotes'],
                }
            );
            console.log(this.state)
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
        const { navigate }  = this.props.navigation;
        
        let display = this.state.userName;
        var url = this.state.profileImg.toString();
        var title = this.state.goalText;
        var beginDate = this.state.goalBeginDate;
        var endDate = this.state.goalEndDate;
        var status = this.state.goalStatus;
        var key = this.state.goalID;
        var goalNotes = this.state.goalNotes;
        return (

                <View style={styles.container_main}>
                <Text style={styles.header}>{title.toUpperCase()}</Text>
                <Text style={styles.status}>{status}</Text>
                <Text style={styles.main_text}>{goalNotes}</Text>
                <Text style={styles.header2}>Start Date</Text>
                <Moment element={Text} style={styles.date}>{beginDate}</Moment>
                <Text style={styles.header2}>End Date</Text>
                <Moment element={Text} style={styles.date}>{endDate}</Moment>
                <Button style={styles.button}  onPress={
                    function() {
                        navigate('editGoal', {title, key});
                    }
                }>Edit Goal</Button>

                 <Button style={styles.button}  onPress={
                    function() {
                        navigate('newReminder', {key});
                    }
                }>New Reminder</Button>
            

            </View>
                
        );
    }
}

module.exports = goalSummary;
