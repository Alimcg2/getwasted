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
        return(
                <View>
                <SignUp/>
                </View>
        );
    }
}

