import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
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

// these are the options for the sign in form
const options = {
    fields: {
        email: {},
        password: {type: 'password'}
    },
    stylesheet: formStyles,
};



export default class signIn extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    // componentWillMount() {
    //     this.unregister = firebase.auth().onAuthStateChanged(user => {
    //         if(user) {
    //             console.log('Logged in as', user.email);
    //             this.props.navigation.navigate('reduce', {});
    //         }
    //         else{
    //             console.log('Logged out');
    //         }
    //     });
    // }

    // componentWillUnmount() {
    //     console.log('in will unmount');
    //     if(this.unregister) {
    //         console.log('unregistered');
    //         this.unregister();
    //     }
    // }

    // when the user presses submit this method will be called
    handleSubmit = () => {
        const value = this._form.getValue();
        console.log('value: ', value); // logging things for now, take out eventually

        firebase.auth().signInWithEmailAndPassword(value["email"], value["password"])
        .then((user) => {
            console.log("it worked"); // logging things for now, take out eventually

            // make sure user is signed in by printing display name 
            var currentUser = firebase.auth().currentUser;
            var userName = currentUser.displayName;
            console.log(userName);

            // go to home page
            // navigate('reduce', {});
        }).catch((error) => {
            const { code, message } = error;
            console.log(error); // logging things for now, take out eventually
            // TODO:  NEED TO PRINT OUT THE ERROR CODE ON THE PAGE
        });


    }

    render() {
        const handleSubmit = this.handleSubmit;
        const gp = this.goalPage; 
       const rd = this.reduce; 
        const img = "https://i.pinimg.com/564x/b2/c0/bd/b2c0bd37b5c5b731cd5fd8fa96dc0d33.jpg"

        const { navigate }  = this.props.navigation;
        return (
                <View style={styles.container_main}>
                
                <Image
            style={{
                position: 'absolute',
                flex: 1,
                width: 500,
                height: "100%",
                marginLeft: 0,
            }}
            source={{ uri: img }}
                />
                <Text style={styles.header_main}>GET WASTED</Text>

                <Form ref={c => this._form = c}
            type={User}
            options={options}
                />

                <Button style={styles.button}
            onPress={
                function() {
                    handleSubmit();
                }
            }>Sign In</Button>

            </View>

        );
    }
}

module.exports = signIn;
