/*
TODO:
   1. Error handling when a user tries to login but firebase throws an error doesn't do anything right now. We need to display a message saying why it failed see error["message"].
   2. Definitely need to add our own style, fonts, colors, etc. NOT SURE HOW TO DO THIS REALLY..
   3. Error handling when one of the fields is blank should work but doesn't...
*/
import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import Button from 'react-native-button';
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
const options = {
    fields: {
        email: {},
        password: { 
            password: true,
            secureTextEntry: true
        }
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

        var icons =  ["https://i.imgur.com/7s2GF1V.png", "https://i.imgur.com/XhzyWSJ.png", "https://i.imgur.com/BY7bO14.png",
        "https://i.imgur.com/4LzOgUA.png", "https://i.imgur.com/WZL9bLR.png", "https://i.imgur.com/i5BxS8Y.png", 
        "https://i.imgur.com/DM8mrbL.png", "https://i.imgur.com/QIyPJao.png", "https://i.imgur.com/IHn8jpD.png", 
        "https://i.imgur.com/VmJGyCx.png", "https://i.imgur.com/VHeY1S1.png", "https://i.imgur.com/QZAey0v.png", 
        "https://i.imgur.com/3q4MJ9d.png"
        ];

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
                var iconImg = icons[Math.floor(Math.random() * icons.length)];
                console.log(iconImg);
                firebase.database().ref("Users").child(currentUser.uid).set({
                    name: value["username"],
                    image: iconImg
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
        const img = "https://i.pinimg.com/564x/b2/c0/bd/b2c0bd37b5c5b731cd5fd8fa96dc0d33.jpg"
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
            
                          <Form ref={c => this._form = c} type={User} options={options} />
                <Button style={styles.button}  onPress={
                    function() {
                        handleSubmit();
                        {/* navigate('reduce', {}); */}
                    }
                }>Sign Up</Button>

            </View>
                
        );
    }
}

module.exports = signUp;
