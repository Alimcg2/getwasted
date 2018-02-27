/*
TODO:
   1. Error handling when a user tries to login but firebase throws an error doesn't do anything right now. We need to display a message saying why it failed see error["message"].
   2. Definitely need to add our own style, fonts, colors, etc. NOT SURE HOW TO DO THIS REALLY..
   3. Error handling when one of the fields is blank should work but doesn't...
*/
import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View, StyleSheet, Button, Text, Image } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import reduce from './reduce';
import {
  StackNavigator,
} from 'react-navigation';

const styles = require('./styles.js');

// creates the form
const Form = t.form.Form;

// creates the user input
const User = t.struct({
    email: t.String,
    username: t.String,
    password: t.String
});


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


export default class signUp extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // when the user presses submit this method will be called
    handleSubmit() {
        const value = this._form.getValue();
        console.log('value: ', value); // logging things for now, take out eventually

        firebase.auth().createUserWithEmailAndPassword(value["email"], value["password"])
            .then((user) => {
                console.log("it worked"); // logging things for now, take out eventually

                // store display name
                var profilePromise = user.updateProfile({
                    displayName: value["username"]
                });
                var currentUser = firebase.auth().currentUser;
                
                console.log("got here");
                 // this pushes their name to the database with their uid
                firebase.database().ref("Users").child(currentUser.uid).set({
                                                              name: value["username"]
                                                          });
                // TODO: LOGIN AND GO TO HOME PAGE
                return profilePromise;
            })
            .catch((error) => {
                const { code, message } = error;
                console.log(error); // logging things for now, take out eventually
                // TODO:  NEED TO PRINT OUT THE ERROR CODE ON THE PAGE
            });
    }

    render() {
        const handleSubmit = this.handleSubmit;
        const { navigate }  = this.props.navigation;
        return (

           <View style={styles.container}>
                          <Text style={styles.welcome}>Get Wasted</Text>
            
                          <Form ref={c => this._form = c} type={User} options={options} />
                <Button style={styles.submit} title="Sign Up!" onPress={
                    function() {
                        handleSubmit();
                        navigate('reduce', {});
                    }
                }/>

            </View>
                
        );
    }
}

module.exports = signUp;
