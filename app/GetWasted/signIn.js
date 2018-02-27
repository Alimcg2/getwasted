import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View, StyleSheet, Button, Text, Image } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import {
  StackNavigator,
} from 'react-navigation';
import goalPage from './goalPage';

const styles = require('./styles.js');
const goalPage = require('./goalPage.js');

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

// these are the options for the sign in form
const options = {
    fields: {
        email: {},
        password: {}
    },
    stylesheet: formStyles,
};

const Stacks = StackNavigator({
    goalPage: { screen: goalPage },
  
});



export default class signIn extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
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

            // TODO: LOGIN AND GO TO HOME PAGE
        }).catch((error) => {
            const { code, message } = error;
            console.log(error); // logging things for now, take out eventually
            // TODO:  NEED TO PRINT OUT THE ERROR CODE ON THE PAGE
        });


    }

    render() {
        const handleSubmit = this.handleSubmit;
        const gp = this.goalPage;

        const { navigate }  = this.props.navigation;
        return (
                <View style={styles.container}>
                <Text style={styles.welcome}>Get Wasted</Text>

                <Form ref={c => this._form = c}
            type={User}
            options={options}
                />

                <Button style={styles.submit}
            title="Sign In!"
            onPress={this.handleSubmit}
                />
                
                <Button style={styles.submit}

            title="Ali's Testing Button"
            onPress={
                function() {
                    handleSubmit();
                    navigate('goalPage', {});
                }
            }/>

            </View>

        );
    }
}

module.exports = signIn;
