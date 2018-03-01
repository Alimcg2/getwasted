import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View, StyleSheet, SectionList, Button, Text, Image } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import {
    StackNavigator,
} from 'react-navigation';

import app from './app';
//import goalPage from './goalPage';
import editGoal from './editGoal';
import newGoal from './newGoal';

const styles = require('./styles.js');

const Stacks = StackNavigator({
    //    goalPage: { screen: goalPage },
    newGoal: { screen: newGoal },
    editGoal: { screen: editGoal },
});


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
            goalStatus: []
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
                    beginDate: new Date(snapshot.val()['beginDate']),
                    endDate: new Date(snapshot.val()['endDate']),
                    status: snapshot.val()['status'],
                }
            );
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
        return (

                <View style={styles.container}>
                <Text style={styles.welcome}>{title}</Text>
                <Text style={styles.welcome}>{status}</Text>
                
                <Text style={styles.welcome}>{beginDate}</Text>
                <Text style={styles.welcome}>{endDate}</Text>
                
                <Button style={styles.submit} title="Edit" onPress={
                    function() {
                        navigate('editGoal', {title, key});
                    }
                }/>

            

            </View>
                
        );
    }
}

module.exports = goalSummary;
