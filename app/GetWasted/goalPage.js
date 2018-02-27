import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View, StyleSheet, SectionList, Button, Text, Image } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import {
    StackNavigator,
} from 'react-navigation';

import app from './app';

const styles = require('./styles.js');





export default class goalPage extends Component {
    constructor(props) {
        super(props);
        var user = firebase.auth().currentUser;
        this.state = { userName : user.displayName,
                       profileImg : "",
                       goals : []};
        var imageRef = firebase.database().ref().child("Users/" + user.uid + "/image");
        imageRef.on("value", function(snapshot) {
            this.setState({profileImg: snapshot.val()});
            
        }.bind(this));
        
        var goalRef = firebase.database().ref().child("Users/" + user.uid + "/goals");
        goalRef.on("value", function(snapshot) {
            this.setState({goals: snapshot.val()});
            
        }.bind(this));
        
    }

    render() {
        let display = this.state.userName;
        var url = this.state.profileImg.toString();
        var testing = this.state.goals[1];
        var sectionItems = [
            {title: "GoalTitleHere", data: "Status"},
            {title: 'GoalTitleHere2', data: "Status2"},
        ];
        console.log(testing);
        return (
                <View style={styles.container}>
                <Image
            style={{width: 100, height: 100}}
            source={{uri: url}}
                />
                
                <SectionList
            sections={sectionItems}
            renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
            renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
            keyExtractor={(item, index) => index}
                />
                
                <Text style={styles.welcome}>{display}</Text>
                
            </View>

        );
    }
}

module.exports = goalPage;
