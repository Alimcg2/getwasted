import * as firebase from 'firebase';
import React, { Component } from 'react';
import { SectionList, FlatList, View, StyleSheet, Text, Image } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import Button from 'react-native-button';
//import CameraRollPicker from 'react-native-camera-roll-picker';
import RNFetchBlob from 'react-native-fetch-blob';
var ImagePicker = require('react-native-image-picker');

import app from './app';

import {
    StackNavigator,
} from 'react-navigation';
const styles = require('./styles.js');

export default class tutorialPage2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        const { navigate } = this.props.navigation;

        return (

            <View style={styles.container_main}>


                <Text style={styles.smallHeader}>WHAT IS</Text>
                <Text style={styles.largeHeader}>ZERO WASTE?</Text>

            
                <Text style={styles.smallText}>Zero Waste guides people in changing their lifestyles and practices to emulate sustainable natural cycles, where all discarded materials are designed to become resources for others to use.</Text>
                <Text style={styles.smallText2}> - Zero Waste International Alliance</Text>
                
                <View style={styles.buttonBottom}>
                <Button style={styles.skip}
            onPress={
                function() {
                    navigate('profile', {});
                }
            }>Skip</Button>
                <Button style={styles.next}
            onPress={
                function() {
                    navigate('tutorialPage3', {});
                }
            }>Next</Button>
                </View>
            </View>
        );
    }
}

module.exports = tutorialPage2;
