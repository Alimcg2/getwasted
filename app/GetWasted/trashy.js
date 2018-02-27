import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View, StyleSheet, Button, Text, Image } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import app from './app';

import {
  StackNavigator,
} from 'react-navigation';

const styles = require('./styles.js');

export default class trashy extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={styles.container}>
                          
                <Text style={styles.welcome}>Welcome to Trashy pix</Text>

            </View>

        );
    }
}

module.exports = trashy;