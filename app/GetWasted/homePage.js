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

import {
  StackNavigator,
} from 'react-navigation';


const styles = require('./styles.js');


type Props = {};
export default class homePage extends Component<Props> {
    constructor(props) {
        super(props);
        console.log("we're here");

    }

    render() {
        return(
                <View style={styles.container}>
                <Text style={styles.welcome}>Hello</Text>
                </View>
        );
    }
}


module.exports = homePage;
