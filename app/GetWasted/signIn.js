import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, Alert } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import Button from 'react-native-button';
import goalPage from './goalPage';
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
    password: t.String
});


// this is the styling for the sign in form, we might be able to put this into the
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
            fontSize: 20,
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
            fontSize: 25,
            marginBottom: 7,
            fontWeight: '400',
        },
        // keep style the same if there's an error
        error: {
            color: 'black',
            fontSize: 25,
            marginBottom: 7,
            fontWeight: '400',
        }
    }
}

// these are the options for the sign in form
const options = {
    fields: {
        password: {
            password: true,
            secureTextEntry: true
        }
    },
    stylesheet: formStyles,
};


export default class signIn extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // when the user presses submit this method will be called
    handleSubmit = () => {
        const value = this._form.getValue();

        // if all fields are filled out
        if (value) {
            firebase.auth().signInWithEmailAndPassword(value["email"], value["password"])
            .then((user) => {
                // will automatically redirect when signed in
            }).catch((error) => {
                const { code, message } = error;
                var alertBody = (code == "auth/invalid-email" ? message : "Invalid credentials.")
                Alert.alert(
                    'Sign in failed', // title
                    alertBody, // message
                    [
                        { text: 'OK' } // button
                    ],
                    { cancelable: false }
                );
            });
        } else {
            Alert.alert(
                "Sign in failed", // title
                "Please provide both an email and a password.", // message
                [
                    { text: 'OK' } // button
                ],
                { cancelable: false }
            );
        }
    }

    render() {
        const handleSubmit = this.handleSubmit;
        const gp = this.goalPage;
        const rd = this.reduce;
        const img = "https://i.pinimg.com/564x/b2/c0/bd/b2c0bd37b5c5b731cd5fd8fa96dc0d33.jpg"

        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container_main}>

                <Image
                    style={{
                        position: 'absolute',
                        flex: 1,
                        width: 500,
                        height: "100%",
                        marginLeft: 0,
                        opacity: 0.5,
                    }}
                    source={require("./background.jpg")}
                />
                <Text style={styles.header_main}>WASTE LESS</Text>

                <Form ref={c => this._form = c}
                    type={User}
                    options={options}
                />

                <Button style={styles.button}
                    onPress={
                        function () {
                            handleSubmit();
                        }
                    }>Sign In</Button>

            </View>

        );
    }
}

module.exports = signIn;
