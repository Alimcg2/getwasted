/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as firebase from 'firebase';
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';


import signUp from './signUp';
import signIn from './signIn';
import landing from './landing';
import goalPage from './goalPage';
import reduce from './reduce'; 
import trashy from './trashy'; 
import editGoal from './editGoal'; 
import newGoal from './newGoal'; 
import goalSummary from './goalSummary'; 
import cameraTest from './cameraTest'; 
const styles = require('./styles.js');

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCbxZ-OoW54x_xZxyoXNXA9WzoHfTTRwcQ",
    authDomain: "getwasteduw.firebaseapp.com",
    databaseURL: "https://getwasteduw.firebaseio.com",
    storageBucket: "getwasteduw.appspot.com",
};
firebase.initializeApp(firebaseConfig);

import {
  StackNavigator,
} from 'react-navigation';

const Stacks = StackNavigator({
    landing: { screen: landing },
    signUp: { screen: signUp },
    signIn: { screen: signIn },
    goalPage: { screen: goalPage },
    reduce: { screen: reduce }, 
    trashy: { screen: trashy },
    editGoal: { screen: editGoal },
    newGoal: { screen: newGoal }, 
    goalSummary: { screen: goalSummary }, 
    cameraTest: { screen: cameraTest }, 
});


export default class App extends Component {
    render() {
        return (
                <Stacks />
        );
    }
}

module.exports = App;
