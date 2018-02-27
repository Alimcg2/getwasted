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
                          
                <Text style={styles.welcome}>Trash Diary</Text>
                
                <Button style={styles.submit}
                title="New trashy pic"
                onPress={
                    function() {
                        handlesubmit();
                    }
                }/>

                <View style={styles.bigboytrash} >
                    <View style={styles.trash_flex_container} >
                    <Text style={styles.header2}>Today's Pictures</Text>
                        <View style ={styles.reduce_pictures_flex_container} >
                            <View style={styles.square} />

                            <View style={styles.square} />

                            <View style={styles.square} />
                        </View> 
                    </View>

                    <View style={styles.trash_flex_container} >
                        <Text style={styles.header2}>Older Trashy Pictures</Text>
                            <View style ={styles.reduce_pictures_flex_container} >
                                <View style={styles.square} />

                                <View style={styles.square} />

                                <View style={styles.square} />
                            </View> 
                    </View>
                    
                </View>
            </View>
        );
    }
}

module.exports = trashy;