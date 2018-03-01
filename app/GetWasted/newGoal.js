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
    goalText: t.String,
    beginDate: t.Date,
    endDate: t.Date
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
        goalText: {},
        beginDate: {},
        endDate: {}
    },
    stylesheet: formStyles,
};


export default class newGoal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user : ""
        };   
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.setState({ 
            user : firebase.auth().currentUser /* gets current user */
        });  
    }

    componentWillUnmount() {
        if (this.goalRef) {
            this.goalRef.off();
        }
    }

    // when the user presses submit this method will be called
    handleSubmit() {
        const formValue = this._form.getValue();
        this.userGoalsRef = firebase.database().ref("Users/" + this.state.user.uid + "/goals/");
        var goalData = {
            beginDate : formValue['beginDate'].toString(),
            endDate : formValue['endDate'].toString(), 
            goalText:  formValue['goalText'],
            otherUsers: '',
            status: 'Current'
        };
        this.userGoalsRef.push(goalData);
    }

    render() {
        const handleSubmit = this.handleSubmit;
        const { navigate }  = this.props.navigation;
        return (

           <View style={styles.container}>
                          <Text style={styles.welcome}>Create New Goal</Text>
            
                          <Form ref={c => this._form = c} type={User} options={options}/>
                <Button style={styles.submit} title="Create" onPress={
                    function() {
                        handleSubmit();
                        //navigate('reduce', {});
                    }
                }/>

            </View>
                
        );
    }
}

module.exports = newGoal;
