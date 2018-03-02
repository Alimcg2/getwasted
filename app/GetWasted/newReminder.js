import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import Button from 'react-native-button';
import moment from 'moment';
import app from './app';
import {
  StackNavigator,
} from 'react-navigation';

const styles = require('./styles.js');

// creates the form
const Form = t.form.Form;

// creates the user input
const Reminder = t.struct({
    reminderText: t.String,
    Sunday: t.Boolean,
    Monday: t.Boolean,
    Tuesday: t.Boolean,
    Wednesday: t.Boolean,
    Thursday: t.Boolean,
    Friday: t.Boolean,
    Saturday: t.Boolean,
    timeOfDay: t.Date, // how to get time alone?
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
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 3,
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

// these are the options for the new reminder form
const options = {
    fields: {
        reminderText: {},
        Sunday: {},
        Monday: {},
        Tuesday: {},
        Wednesday: {},
        Thursday: {},
        Friday: {},
        Saturday: {},
        timeOfDay: {
            label: 'Time of Day',
            mode: 'time',
            config: { 
                format: (date) => moment(date).format('hh:mm a')
            }
        }
    },
    stylesheet: formStyles,
};


export default class newReminder extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user : ""
        };   
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
        var time = moment(formValue['timeOfDay']).format('hh:mm a');
        var goalId = this.props.navigation.state.params.key;
        this.userGoalRemindersRef = firebase.database().ref("Users/" + this.state.user.uid + "/goals/" + goalId + "/reminders/");
        var reminderData = {
            reminderText : formValue['reminderText'],
            Sunday : formValue['Sunday'], 
            Monday : formValue['Monday'], 
            Tuesday : formValue['Tuesday'], 
            Wednesday : formValue['Wednesday'], 
            Thursday : formValue['Thursday'], 
            Friday : formValue['Friday'], 
            Saturday : formValue['Saturday'], 
            timeOfDay: time
        };
        this.userGoalRemindersRef.push(reminderData);
        // TO DO: navigate back to goal summary page
    }

    render() {
        const handleSubmit = this.handleSubmit;
        const { navigate }  = this.props.navigation;
        return (

           <ScrollView style={styles.container_main}>
                <Text style={styles.header}>NEW REMINDER</Text>
            
                <Form ref={c => this._form = c} type={Reminder} options={options} />
                
                <Button style={styles.button} title="Create" onPress={
                    function() {
                        handleSubmit();
                    }
                }>Create</Button>

            </ScrollView>
                
        );
    }
}

module.exports = newReminder;
