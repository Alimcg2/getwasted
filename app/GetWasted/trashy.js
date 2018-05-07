import * as firebase from 'firebase';
import React, { Component } from 'react';
import { SectionList, FlatList, View, StyleSheet, Text, Image, ScrollView } from 'react-native';
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
        { name: 'fb', title: 'Choose Photo from Facebook' },
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

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export default class trashy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user : firebase.auth().currentUser,
            images: [],
            avatarSource: "",
            showImageOptions: true,
            showCaption: false,
            urlImage: "",
            time: "",
            loading: false
        };
        this.uploadImage = this.uploadImage.bind(this);
        this.handleUpload = this.handleUpload.bind(this);

    }

    componentWillMount() {
        this.picsRef = firebase.database().ref().child("Users/" + this.state.user.uid + "/trashypics");
        this.picsRef.on("value", function (snapshot) {
            this.setState({ goals: snapshot.val() });
            snapshot.forEach(function (data) {
                var format = { caption: data.val()["imageCaption"], url: { uri: data.val()["imageURL"] } }
                var all = this.state.images;
                all.push(format)
                this.setState({ imgs: all });
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
        this.setState({ showCaption: true, loading: true });
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
                this.pushImage(response).then(function (response) {
                    console.log("Success!", response);
                    // let user know upload was successfully somehow?
                }, function (error) {
                    this.setState({ loading: false });
                    console.log("Failed!", error);
                });

            }
        });
    }


    pushImage(response, mime = 'application/octet-stream') {
        var urlImage = "";
        var ulpoadTimeVar = "";
        return new Promise((resolve, reject) => {
            const uploadUri = response.uri.replace('file://', '');
            const uploadTime = new Date();
            let uploadBlob = null;
            // create reference in firebase storage for the file
            this.storageRef = firebase.storage().ref('Images').child(response.fileName);
            // encode data with base64 prior to uploading
            fs.readFile(uploadUri, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `{mime};BASE64` });
                })
                // place the blog into storage reference
                .then((blob) => {
                    uploadBlob = blob;
                    return this.storageRef.put(blob, { contentType: mime });
                })
                // get download url of image
                .then(() => {
                    uploadBlob.close();
                    return this.storageRef.getDownloadURL();
                })
                .then((url) => {
                    resolve(url);
                    // save download url and upload time to state
                    this.setState({ urlImage: url, time: uploadTime, loading: false });
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ loading: false });
                    reject(error);
                });
        });
    }

    handleUpload() {
        const formValue = this._form.getValue();

        this.trashyRef = firebase.database().ref("Users/" + this.state.user.uid + "/trashypics/");
        var data = {
            imageURL: this.state.urlImage,
            imageCaption: formValue.caption,
            date: this.state.time
        }
        this.trashyRef.push(data);
    }

    render() {
        console.log(typeof (this.state.images[0].url));

        const ts = this.trashy;
        var imgs = this.state.images;
        const { navigate } = this.props.navigation;
        var loading = this.state.loading;

        return (

            <View style={styles.container_main}>

                {this.state.loading ?
                    <View style={styles.center}>
                        <Text>LOADING...</Text>
                    </View> :

                    <View>

                        <Text style={styles.headerPadding}>TRASH DIARY</Text>

                        <ScrollView>
                            {this.state.urlImage ?
                                <View>
                                    <Image style={styles.trashyPic} source={{uri: this.state.urlImage}} />

                                    <Form ref={c => this._form = c} type={User} options={options} />

                                    <Button style={styles.button} onPress={this.handleUpload}>
                                        Upload
                                    </Button>
                                </View> :

                                <Button style={styles.button} onPress={this.uploadImage}>
                                    Upload Picture
                                </Button>
                            }

                            {/* <View style={{ display: this.state.showCaption ? 'flex' : 'none' }}>
                                <Form ref={c => this._form = c} type={User} options={options} />

                                <Button style={styles.button}
                                    onPress={
                                        this.handleUpload
                                    }>Upload</Button>

                            </View> */}

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
                        </ScrollView>

                    </View>
                }


                <View style={[styles.menu]}>

                    <Button style={[styles.icon]}
                        onPress={
                            function () {
                                navigate('profile', {});
                            }.bind(this)
                        }>
                        <View style={styles.icon}>
                            <Image style={styles.image} source={require("./005-avatar.png")} />
                        </View>
                    </Button>

                    <Button style={[styles.icon]}
                        onPress={
                            function () {
                                navigate('reduce', {});
                            }.bind(this)
                        }>
                        <View style={styles.iconClicked}>
                            <Image style={styles.image} source={require("./001-reload.png")} />
                        </View></Button>


                    <Button style={[styles.icon]}
                        onPress={
                            function () {
                                navigate('read', {});
                            }.bind(this)
                        }>
                        <View style={styles.icon}>
                            <Image style={styles.image} source={require("./002-book.png")} />
                        </View></Button>

                    <Button style={[styles.icon]}
                        onPress={
                            function () {
                                navigate('shop', {});
                            }.bind(this)
                        }>
                        <View style={styles.icon}>
                            <Image style={styles.image} source={require("./008-shopping-bag.png")} />
                        </View></Button>

                    <Button style={[styles.icon]}
                        onPress={
                            function () {
                                navigate('shareFeed', {});
                            }.bind(this)
                        }>
                        <View style={styles.icon}>
                            <Image style={styles.image} source={require("./006-share.png")} />
                        </View></Button>

                </View>

            </View>
        );
    }
}

module.exports = trashy;
