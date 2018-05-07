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

export default class tutorialPage3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        const { navigate } = this.props.navigation;

        return (

            <View style={styles.container_main}>


                <Text style={styles.smallHeader}>HOW YOU CAN</Text>
                <Text style={styles.largeHeader2}>MAKE A DIFFERENCE</Text>

            
                <Text style={styles.smallText2}><Text  style={styles.bold}>EXPLORE</Text> tips and tricks to reduce your waste.</Text>
                <Text style={styles.smallText2}><Text  style={styles.bold}>EQUIP</Text> items necessary for your journey.</Text>
                <Text style={styles.smallText2}><Text style={styles.bold}>CONNECT</Text> with friends and learn from others.</Text>
                <Text style={styles.smallText2}><Text  style={styles.bold}>REDUCE</Text> by reaching goals and forming habits.</Text>
                
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
                    navigate('tutorialPage4', {});
                }
            }>Next</Button>
                </View>
            </View>
        );
    }
}

module.exports = tutorialPage3;
