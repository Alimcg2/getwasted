import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View, StyleSheet, Button, Text, Image } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import app from './app';
import trashy from './trashy'

import {
  StackNavigator,
} from 'react-navigation';

const styles = require('./styles.js');

const Stacks = StackNavigator({
    trashy: { screen: trashy },
  
});

export default class reduce extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const ts = this.trashy; 
        const { navigate }  = this.props.navigation;
        const resizeMode = 'center';

        return (
            <View style={styles.container}>
              
                
                <Text style={styles.welcome}>Welcome to Reduce Page</Text>
                
                <Button style={styles.submit}
            title="Trashy Pics! ;-)"
            onPress={
                function() {
                    navigate('trashy', {});
                }
            }/>


            </View>

        );
    }
}

module.exports = reduce;