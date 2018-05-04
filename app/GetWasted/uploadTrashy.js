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
    caption: t.String,
    
});


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



export default class trashy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            avatarSource: "",
            showImageOptions: true,
        };
        this.uploadImage = this.uploadImage.bind(this);

    }

     render() {

        const ts = this.trashy;
        var imgs = this.state.images;
        const { navigate } = this.props.navigation;

        return (

            <View style={styles.container_main}>

                <Text style={styles.header}>TRASH DIARY</Text>

                <Button style={styles.button}
                    onPress={
                        function () {
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
                        renderItem={({ item }) =>
                            <View style={styles.list_container}>

                                <Image style={styles.trashyPic} source={item.url} />

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
