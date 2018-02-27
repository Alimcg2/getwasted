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
                       goalTitles : [],
                       goalBeginDates : [],
                       goalEndDates : [],
                       goalStatus: []};
        var imageRef = firebase.database().ref().child("Users/" + user.uid + "/image");
        imageRef.on("value", function(snapshot) {
            this.setState({profileImg: snapshot.val()});
        }.bind(this));
        
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
        let display = this.state.userName;
        var url = this.state.profileImg.toString();
        var titles = this.state.goalTitles;
        var beginDates = this.state.goalBeginDates;
        var endDates = this.state.goalEndDates;
        var status = this.state.goalStatus;
        //var testing2 = testing["goalText"];
        var sectionItems = [
            {title: "Goals" , data: titles},
        ];
        //console.log(testing2);
        return (
                <View style={styles.container}>
                <Image
            style={{width: 100, height: 100}}
            source={{uri: url}}
                />
                <Text style={styles.welcome}>{display} Goals</Text>
                
                <SectionList
            sections={sectionItems}
            renderItem={({item}) => <Text style={styles.item} onpress={
                        function() {
                            console.log(this);
                            //navigate('goalInfo', {});
                        }}>{item}</Text>}
            renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
            keyExtractor={(item, index) => index}
                />

            
            </View>

        );
    }
}

module.exports = goalPage;
