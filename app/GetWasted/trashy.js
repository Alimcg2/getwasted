import * as firebase from 'firebase';
import React, { Component } from 'react';
import { SectionList, View, StyleSheet, Text, Image } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import Button from 'react-native-button';
import app from './app';
import cameraTest from './cameraTest';

import {
  StackNavigator,
} from 'react-navigation';

const styles = require('./styles.js');

export default class trashy extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const ts = this.trashy;
        const { navigate }  = this.props.navigation;

        return (
            <View style={styles.container_main}>
                          
                <Text style={styles.header}>TRASH DIARY</Text>
                
                <Button style={styles.button}
            onPress={
                function() {
                    navigate('cameraTest', {});
                }
            }>Take Picture</Button>



                <View style={styles.trash_flex_container} >
                <Text style={styles.header2}>{"Today's Pictures"}</Text>
                <View style ={styles.reduce_pictures_flex_container} >
                <SectionList
            sections={[
                {title: '', data: [require('./trashtest.jpg'),
                                   require('./trashtest2.jpg'),
                                   require('./trashtest4.jpg'),]},
            ]}
            renderItem={({item}) => <Image style={styles.item} source={item} />}
            renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                                keyExtractor={(item, index) => index}
                            />
                        </View>
                </View> 
            </View>
        );
    }
}

module.exports = trashy;
