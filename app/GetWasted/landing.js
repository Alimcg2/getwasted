/*
TODO:
   1. Error handling when a user tries to login but firebase throws an error doesn't do anything right now. We need to display a message saying why it failed see error["message"].
   2. Definitely need to add our own style, fonts, colors, etc. NOT SURE HOW TO DO THIS REALLY..
   3. Error handling when one of the fields is blank should work but doesn't...
*/
import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View, StyleSheet, Button, Text, Image} from 'react-native';

import signUp from './signUp';
import signIn from './signIn';
import goalPage from './goalPage';

import {
  StackNavigator,
} from 'react-navigation';
'react-navigation';

const styles = require('./styles.js');


const Stacks = StackNavigator({
    signUp: { screen: signUp },
    signIn: { screen: signIn },
    goalPage: { screen: goalPage },
});

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
                    this.props.navigation.navigate('reduce', {});
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
        const ts = this.trashy;
        const { navigate }  = this.props.navigation;
        const resizeMode = 'center';

        return (

                <View style={styles.container}>
              
                
                <Text style={styles.welcome}>Welcome to Get Wasted</Text>
                
                <Button style={styles.submit}
            title="Sign Up!"
            onPress={
                function() {
                    navigate('signUp', {});
                }
            }/>

                <Button style={styles.submit}
            title="Login!"
            onPress={
                function() {
                    navigate('signIn', {});
                }
            }/>

                </View>
                
        );
    }
}

module.exports = landing;
