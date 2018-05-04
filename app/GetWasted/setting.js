import * as firebase from 'firebase';
import React, { Component } from 'react';
import { SectionList, FlatList, View, StyleSheet, Text, Image } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import Button from 'react-native-button';
import PhotoUpload from 'react-native-photo-upload';
import app from './app';
import cameraTest from './cameraTest';
import  StackNavigator from 'react-navigation';

const styles = require('./styles.js');

export default class trashy extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    componentWillMount() {
        var user = firebase.auth().currentUser;
    }

    componentWillUnmount() {
        
    }
    
    handleSignOut() {
        if (firebase.auth().currentUser) {
            firebase.auth().signOut();
        }
        this.props.navigation.navigate('landing', {});
    }


    render() {
        
        const { navigate }  = this.props.navigation;

        return (
                <View style={styles.container_main}>

            
                    <Button style={styles.button}
                        onPress={this.handleSignOut }>Sign Out</Button>

            
                <PhotoUpload
            onPhotoSelect={avatar => {
                if (avatar) {
                    console.log('Image base64 string: ', avatar)
                }
            }}
                >
                <Image
            style={{
                paddingVertical: 30,
                width: 150,
                height: 150,
                borderRadius: 75
            }}
            resizeMode='cover'
            source={{
                uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
            }}
                />
    </PhotoUpload>
                    </View>
        );
    }
}

module.exports = trashy;
