import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View, StyleSheet, Button, Text, Image } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import app from './app';
import trashy from './trashy';
import goalPage from './goalPage'

import {
  StackNavigator,
} from 'react-navigation';

const styles = require('./styles.js');

const Stacks = StackNavigator({
    trashy: { screen: trashy },
    goalPage: { screen: goalPage },
  
});

export default class reduce extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const ts = this.trashy; 
        const gp = this.goalPage;
        const { navigate }  = this.props.navigation;
        const resizeMode = 'center';

        return (
            <View style={styles.container_reduce}>
              
                
                <Text style={styles.welcome}>Reduce</Text>
                
                <Image style={styles.image} source={require('./test.jpg')} />

                <Button style={styles.submit}
            title="Trashy Pics ;-)"
            onPress={
                function() {
                    navigate('trashy', {});
                }
            }/>

            <Button style={styles.submit}
            title="Goals"
            onPress={
                function() {
                    navigate('goalPage', {});
                }
            }/>


            </View>

        );
    }
}

module.exports = reduce;