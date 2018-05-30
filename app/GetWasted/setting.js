
import * as firebase from 'firebase';
import React, { Component } from 'react';
import { SectionList, FlatList, View, StyleSheet, Alert, Text, ScrollView, Image } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import Button from 'react-native-button';
import PhotoUpload from 'react-native-photo-upload';
import app from './app';
import cameraTest from './cameraTest';
import StackNavigator from 'react-navigation';
import RNFetchBlob from 'react-native-fetch-blob';
var ImagePicker = require('react-native-image-picker');

const styles = require('./styles.js');


var options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};


// creates the form
const Form = t.form.Form;

// creates the user input
const User = t.struct({
    changeEmail: t.maybe(t.String),
    changeUserName: t.maybe(t.String),
    changePassword: t.maybe(t.String)
});


// this is the styling for the login form, we might be able to put this into the
// stylesheet but its a little weird because its using tcomb
const formStyles = {
    ...Form.stylesheet,
    formGroup: {
        normal: {
            marginBottom: 10,
        },
        // keep style the same if there's an error
        error: {
            marginBottom: 10
        }
    },
    textbox: {
        normal: {
            backgroundColor: 'white',
            padding: 10,
            fontSize: 18,
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 3,
        },
        // keep style the same if there's an error
        error: {
            backgroundColor: 'white',
            padding: 10,
            fontSize: 20,
        }
    },
    controlLabel: {
        normal: {
            color: 'black',
            fontSize: 20,
            marginBottom: 7,
            fontWeight: '400',
        },
        // keep style the same if there's an error
        error: {
            color: 'black',
            fontSize: 20,
            marginBottom: 7,
            fontWeight: '400',
        }
    }
}

// these are the options for the login form
const options = {
    fields: {
        changeEmail: {},
        changeUserName: {},
        changePassword: {
            password: true,
            secureTextEntry: true
        }
    },
    stylesheet: formStyles,
};

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export default class trashy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileImg: "",
            urlImage: "",
            loading: false,
            user: []
        };
        this.handleSignOut = this.handleSignOut.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.pushImage = this.pushImage.bind(this);
    }

    componentWillMount() {
        var user = firebase.auth().currentUser;
        this.setState({ user: user });
        this.imageRef = firebase.database().ref().child("Users/" + user.uid + "/image"); /* gets the image-parent class*/
        this.setState({ userName: user.displayName });
        this.imageRef.on("value", function (snapshot) {
            this.setState({ profileImg: snapshot.val() });
        }.bind(this));
    }

    componentWillUnmount() {
        if (this.imageRef) {
            this.imageRef.off();
        }

    }

    handleSignOut() {
        if (firebase.auth().currentUser) {
            firebase.auth().signOut();
        }
        this.props.navigation.navigate('landing', {});
    }

    uploadImage() {
        this.setState({ showCaption: true, loading: true });
        var url = "";
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
                this.setState({ loading: false });
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                this.setState({ loading: false });
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                this.setState({ loading: false });
            }
            else {
                this.pushImage(response).then(function (response) {
                    console.log("Success!", response);
                    url = response;
                    console.log(url);
                    // let user know upload was successfully somehow?
                }, function (error) {
                    this.setState({ loading: false });
                    console.log("Failed!", error);
                });

            }
        });
        console.log(url);
        this.setState({ urlImage: url });
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
            console.log("wbu");
            // encode data with base64 prior to uploading
            fs.readFile(uploadUri, 'base64')
                .then((data) => {
                    console.log("pls");
                    return Blob.build(data, { type: `{mime};BASE64` });
                })
                // place the blog into storage reference
                .then((blob) => {
                    uploadBlob = blob;
                    console.log("something");
                    return this.storageRef.put(blob, { contentType: mime });
                })
                // get download url of image
                .then(() => {
                    uploadBlob.close();
                    console.log("does anything in this get called");
                    return this.storageRef.getDownloadURL();
                })
                .then((url) => {
                    resolve(url);
                    console.log(url);
                    // save download url and upload time to state
                    this.setState({ urlImage: url, profileImg: url, loading: false });
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ loading: false });
                    reject(error);
                })
        })
    }


    handleUpload() {
        const value = this._form.getValue();
        console.log(value);


        var user = this.state.user;
        // var followersRef = firebase.database().ref().child("Users/" + user.uid + "/followers");
        // var followingRef = firebase.database().ref().child("Users/" + user.uid + "/following");
        // var trashypicsRef = firebase.database().ref().child("Users/" + user.uid + "/trashypics");
        // var goalsRef = firebase.database().ref().child("Users/" + user.uid + "/goals");
        // var imageRef = firebase.database().ref().child("Users/" + user.uid + "/image");
        // var nameRef = firebase.database().ref().child("Users/" + user.uid + "/name");
        if (value.changeEmail != null) {
            user.updateEmail(value.changeEmail)
        }
        if (value.changeUserName != null) {
            user.updateProfile({
                displayName: value.changeUserName
            })
            nameRef = value.changeUserName;
            this.trashyRef = firebase.database().ref("Users/" + this.state.user.uid + "/");
            var data = {
                name: value.changeUserName

            }
            this.trashyRef.update(data);
        }
        if (value.changePassword != null) {
            user.updatePassword(value.changePassword);
        }
        console.log(this.state.urlImage);
        if (this.state.urlImage != "" && this.state.urlImage != undefined) {
            this.trashyRef = firebase.database().ref("Users/" + this.state.user.uid + "/");
            var data = {
                image: this.state.urlImage
            }
            this.trashyRef.update(data);
        }

        Alert.alert(
            "Success!", // title
            "You have updated your settings.", // message
            [
                { text: 'OK' } // button
            ],
            { cancelable: false }
        );
    }

    render() {

        const { navigate } = this.props.navigation;

        var url = this.state.profileImg.toString();
        return (
            <View style={styles.container_main}>

                <View style={styles.topContainer}>
                    <Text style={styles.title}>WasteLess</Text>
                    <Button style={[styles.menu_item]}
                        onPress={
                            function () {
                                navigate('setting', {});
                            }.bind(this)
                        }><Image style={styles.settingsImage} source={require("./003-settings.png")} /></Button>
                </View>

                <View sytle={styles.pls}>
                    <Text style={styles.hr}>_______________________________________________________________________</Text>
                </View>

                {this.state.loading ?
                    <View style={styles.center}>
                        <Text>LOADING...</Text>
                    </View>
                    :

                    <ScrollView>
                        <Button onPress={this.uploadImage}>
                            <Image style={styles.profileImage2} source={{ url }} />
                        </Button>
                        <Button style={styles.smallButton} onPress={this.uploadImage}>
                            Change Image
                </Button>


                        <Form ref={c => this._form = c} type={User} options={options} />

                        <Button style={styles.button} onPress={this.handleUpload}>
                            Save Changes
                </Button>

                        <Button style={styles.button_bottom}
                            onPress={this.handleSignOut}>Sign Out</Button>

                    </ScrollView>
                }

                <View style={[styles.menu]}>

                    <Button style={[styles.icon]}
                        onPress={
                            function () {
                                navigate('profile', {});
                            }.bind(this)
                        }>
                        <View style={styles.iconClicked}>
                            <Image style={styles.image} source={require("./005-avatar.png")} />
                        </View>
                    </Button>

                    <Button style={[styles.icon]}
                        onPress={
                            function () {
                                navigate('reduce', {});
                            }.bind(this)
                        }>
                        <View style={styles.icon}>
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
