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
var SignUp  = require('./signUp');
var SignIn  = require('./signIn');

const styles = require('./styles.js');

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCbxZ-OoW54x_xZxyoXNXA9WzoHfTTRwcQ",
    authDomain: "getwasteduw.firebaseapp.com",
    databaseURL: "https://getwasteduw.firebaseio.com",
    storageBucket: "getwasteduw.appspot.com",
};
firebase.initializeApp(firebaseConfig);

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        // creates user info placeholders
        this.state = {
            
        };
        
    }

    render() {
        return(
                <View>
                <SignUp/>
                </View>
        );
    }
}

