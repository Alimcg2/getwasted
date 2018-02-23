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
// var Landing  = require('./landing'); <- KENZIES LANDING PAGE
// var SignUp  = require('./signUp');
// var HomePage = require('./homePage');


import signUp from './signUp';
import signIn from './signIn';
import landing from './landing';
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
});


export default class App extends Component {
    render() {
        return (
                <Stacks />
        );
    }
}
