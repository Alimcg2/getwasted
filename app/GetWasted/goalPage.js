import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View, StyleSheet, Button, Text, Image } from 'react-native';
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
                       profileImg : ""};
        var ref = firebase.database().ref().child("Users/" + user.uid + "/image");
        ref.on("value", function(snapshot) {
            this.setState({profileImg: snapshot.val()});
        }.bind(this));
    }

    render() {
        let display = this.state.userName;
        var url = this.state.profileImg.toString();
        console.log(url);
        return (
                <View style={styles.container}>
                
                <Image
            style={{width: 100, height: 100}}
            source={{uri: url}}
                />
                
                <Text style={styles.welcome}>{display}</Text>
                
            </View>

        );
    }
}

module.exports = goalPage;
