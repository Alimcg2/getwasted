/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as firebase from 'firebase';
import {Button, Dialog, DialogActions, DialogContent, Spinner} from 'react-mdl';
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import signUp from './signUp.js'


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCbxZ-OoW54x_xZxyoXNXA9WzoHfTTRwcQ",
    authDomain: "getwasteduw.firebaseapp.com",
    databaseURL: "https://getwasteduw.firebaseio.com",
    storageBucket: "getwasteduw.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const styles = require('./styles.js');


type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        // creates user info placeholders
        this.state = {
            
        };
        
    }



    render() {
      
    }
}

