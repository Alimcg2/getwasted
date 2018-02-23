/*
TODO:
   1. Error handling when a user tries to login but firebase throws an error doesn't do anything right now. We need to display a message saying why it failed see error["message"].
   2. Definitely need to add our own style, fonts, colors, etc. NOT SURE HOW TO DO THIS REALLY..
   3. Error handling when one of the fields is blank should work but doesn't...
*/
import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View, StyleSheet, Button, Text, Image} from 'react-native';

import t from 'tcomb-form-native'; // 0.6.9


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCbxZ-OoW54x_xZxyoXNXA9WzoHfTTRwcQ",
    authDomain: "getwasteduw.firebaseapp.com",
    databaseURL: "https://getwasteduw.firebaseio.com",
    storageBucket: "getwasteduw.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

// creates the form
const Form = t.form.Form;

/* creates the user input
const User = t.struct({
    email: t.String,
    username: t.String,
    password: t.String
});  */

    const remote = 'https://s15.postimg.org/tw2qkvmcb/400px.png';

const styles = require('./landingStyles.js');

// this is the styling for the login form, we might be able to put this into the
// stylesheet but its a little weird because its using tcomb
const formStyles = {
    ...Form.stylesheet,
    formGroup: {
        normal: {
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 10,
        },
    },
    controlLabel: {
        normal: {
            color: 'black',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600',
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
const options = {
    fields: {
        email: {},
        password: {}
    },
    stylesheet: formStyles,
};


export default class landing extends Component { /*
    // when the user presses submit this method will be called
    handleSubmit = () => {
        const value = this._form.getValue();
        console.log('value: ', value); // logging things for now, take out eventually
     
        firebaseApp.auth().createUserWithEmailAndPassword(value["email"], value["password"])
            .then((user) => {
                console.log("it worked"); // logging things for now, take out eventually
                // this pushes their name to the database with their uid
                firebaseApp.database().ref("Users").child(firebaseApp.auth().
                                                          currentUser.uid).set({
                    name: value["username"]
                    });
                 // TODO: LOGIN AND GO TO HOME PAGE
            })
            .catch((error) => {
                const { code, message } = error;
                console.log(error); // logging things for now, take out eventually
                // TODO:  NEED TO PRINT OUT THE ERROR CODE ON THE PAGE
            }); 
        
      
    } */

    render() {
    const resizeMode = 'center';

        return (

                <View style={styles.container}>
                
                <Image

            source={{ uri: remote }}
                />
                
                <Text style={styles.welcome}>Welcome to Get Wasted</Text>
                
                <Button style={styles.submit}
            title="Sign Up!"
            onPress={this.handleSubmit}
                />

                <Button style={styles.submit}
            title="Already have an account? Login!!"
            onPress={this.handleSubmit}
                />

                </View>
                
        );
    }
}

module.exports = landing;
