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


// creates the form
const Form = t.form.Form;


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


export default class landing extends Component { 

    render() {
    const resizeMode = 'center';

        return (

                <View style={styles.container}>
              
                
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
