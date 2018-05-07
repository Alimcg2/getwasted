/*
TODO:
   1. Error handling when a user tries to login but firebase throws an error doesn't do anything right now. We need to display a message saying why it failed see error["message"].
   2. Definitely need to add our own style, fonts, colors, etc. NOT SURE HOW TO DO THIS REALLY..
   3. Error handling when one of the fields is blank should work but doesn't...
*/
import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';

import signUp from './signUp';
import signIn from './signIn';
import goalPage from './goalPage';
import cameraTest from './cameraTest';
import Button from 'react-native-button';

import {
  StackNavigator,
} from 'react-navigation';
'react-navigation';

const styles = require('./styles.js');



/*
export default class landing extends Component { 

    render() {
        const sup = this.signUp;
        const sin = this.signIn;
        const gp = this.goalPage;
    }
  
}); */

export default class landing extends Component { 
    componentWillMount() {
        authFlag = true;
        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if(user) {
                console.log('Logged in as', user.email);
                console.log('authFlag: ' + authFlag);
                if (authFlag) {
                    this.props.navigation.navigate('tutorialPage1', {});
                    authFlag = false;
                } else {
                    authFlag = true;
                }
            } else {
                console.log('Logged out');
            }
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    render() {
        const sup = this.signUp;
        const sin = this.signIn;
        const gp = this.goalPage;
        const ct = this.cameraTest;
        const { navigate }  = this.props.navigation;
        const img = "https://i.pinimg.com/564x/b2/c0/bd/b2c0bd37b5c5b731cd5fd8fa96dc0d33.jpg"

        return (

                <View style={styles.container_main}>
                
                <Image
            style={{
                position: 'absolute',
                flex: 1,
                width: 500,
                height: "100%",
                marginLeft: 0,
                opacity: 0.5,
            }}
            source={require("./background.jpg")}
                />
                <Text style={styles.header_main}>WASTE LESS</Text>
                
                <Button style={styles.button}
            onPress={
                function() {
                    navigate('signUp', {});
                }
            }>Sign Up</Button>

                <Button style={styles.button}
            onPress={
                function() {
                    navigate('signIn', {});
                }
            }>Login</Button>
                                </View>
                
        );
    }
}

module.exports = landing;
