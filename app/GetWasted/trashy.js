import * as firebase from 'firebase';
import React, { Component } from 'react';
import { SectionList, FlatList, View, StyleSheet, Text, Image } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import Button from 'react-native-button';
import PhotoUpload from 'react-native-photo-upload';
import app from './app';
import cameraTest from './cameraTest';

import {
  StackNavigator,
} from 'react-navigation';

const styles = require('./styles.js');

export default class trashy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images : []
        };
    }

    componentWillMount() {
        var user = firebase.auth().currentUser;
        this.picsRef = firebase.database().ref().child("Users/" + user.uid + "/trashypics");
        this.picsRef.on("value", function(snapshot) {
            this.setState({goals: snapshot.val()});
            snapshot.forEach(function(data) {
                var format = {caption: data.val()["imageCaption"], url : {uri: data.val()["imageURL"]} }
                var all = this.state.images;
                all.push(format)
                this.setState({imgs: all});
            }.bind(this));
        }.bind(this));
        
    }

    componentWillUnmount() {
        if (this.imageRef) {
            this.imageRef.off();
        }
        if (this.picsRef) {
            this.picsRef.off();
        }
    }


    render() {
        const ts = this.trashy;
        var imgs = this.state.images;
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
                
                <Button style={styles.button}
            onPress={
                function() {
                    navigate('cameraTest', {});
                }
            }>Upload Picture</Button>


            
            
                <Button style={[styles.menu_item]}
                        onPress={
                            function () {
                                navigate('setting', {});
                            }.bind(this)
                        }>Settings</Button>
                
                <View style={styles.trash_flex_container} >
                
                <FlatList
            data={imgs}
            renderItem={({item}) =>
                        <View style={styles.list_container}>
                        
                        <Image style={styles.trashyPic} source={item.url}/>
                        
                        <Text style={styles.subtitle}>{item.caption}</Text>
                        </View>
                       }
                />

            
            </View>
                </View>
        );
    }
}

module.exports = trashy;
