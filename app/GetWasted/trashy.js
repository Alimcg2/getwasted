import * as firebase from 'firebase';
import React, { Component } from 'react';
import { SectionList, FlatList, View, StyleSheet, Text, Image } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import Button from 'react-native-button';
//import CameraRollPicker from 'react-native-camera-roll-picker';
import RNFetchBlob from 'react-native-fetch-blob';
var ImagePicker = require('react-native-image-picker');

import app from './app';
import cameraTest from './cameraTest';

import {
  StackNavigator,
} from 'react-navigation';


// creates the form
const Form = t.form.Form;

// creates the user input
const User = t.struct({
    caption: t.String
});


var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

// this is the styling for the login form, we might be able to put this into the
// stylesheet but its a little weird because its using tcomb
const formStyles = {
    ...Form.stylesheet,
    formGroup: {
        normal: {
            marginBottom: 10,
        },
    },
    textbox: {
        normal: {
            backgroundColor: 'white',
            padding: 10,
            fontSize: 20,
        },
    },
    controlLabel: {
        normal: {
            color: 'black',
            fontSize: 25,
            marginBottom: 7,
            fontWeight: '400',
        },
        // the style applied when a validation error occours
        error: {
            color: 'red',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        }
    }
}

// these are the options for the login form
const formOptions = {
    fields: {
        caption: {}
    },
    stylesheet: formStyles,
};

const styles = require('./styles.js');

export default class trashy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images : [],
            avatarSource: "",
            showImageOptions: true,
        };
        this.uploadImage = this.uploadImage.bind(this);
        
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
    
    uploadImage() {
        console.log("here");
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // You can display the image using either data...
                const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

                // or a reference to the platform specific asset location
                 source = {uri: response.uri.replace('file://', ''), isStatic: true};
                console.log(source);
                // push to firebase:
                // push the imageurl = response.data
                // also push the response.timestamp
                // maybe push response.filename if you want?
                // also need to push the caption
                // initalize #likes to 0
                // !!!!!!
                this.setState({showImageOptions: false});
                
            }
        })
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
                this.uploadImage
            }>Upload Picture</Button>

            <View style={styles.none}>
                <Form ref={c => this._form = c} type={User} options={options} />
                </View>
                
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
