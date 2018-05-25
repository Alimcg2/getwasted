import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, Alert } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import Button from 'react-native-button';
import moment from 'moment';
import app from './app';
import {
    StackNavigator,
} from 'react-navigation';
import RNCalendarEvents from 'react-native-calendar-events';

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
        // keep style the same if there's an error
        error: {
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
        // keep style the same if there's an error
        error: {
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
        // keep style the same if there's an error
        error: {
            color: 'black',
            fontSize: 25,
            marginBottom: 7,
            fontWeight: '400',
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
            user: "",
            goalBeginDate: this.props.navigation.state.params.beginDate.toISOString(),
            goalEndDate: this.props.navigation.state.params.endDate.toISOString()
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        // ask for permission to access calendar
        RNCalendarEvents.authorizeEventStore();

        this.setState({
            user: firebase.auth().currentUser /* gets current user */
        });
    }

    componentWillUnmount() {
        if (this.goalRef) {
            this.goalRef.off();
        }
    }

    getNextDayOfWeek(dayOfWeek) {
        var d = new Date(this.state.goalBeginDate);
        d.setDate(d.getDate() + ((7 - d.getDay()) % 7 + dayOfWeek) % 7);
        return d;
    }

    createEvent(eventBeginDate) {
        // get time from form
        const formValue = this._form.getValue();
        var hour = formValue.timeOfDay.getHours();
        var mins = formValue.timeOfDay.getMinutes();

        // set time for begin date to time from form
        eventBeginDate.setHours(hour);
        eventBeginDate.setMinutes(mins);
        eventBeginDate.setSeconds(0);

        // create new event on calendar
        // starts at goal begin date and ends at goal end date,
        // repeating weekly for the days selected by the user
        RNCalendarEvents.saveEvent('Reminder event', {
            location: 'location',
            notes: 'notes',
            startDate: eventBeginDate,
            endDate: eventBeginDate,
            recurrenceRule: {
                frequency: "weekly",
                endDate: this.state.goalEndDate
            },
            alarm: [{
                date: -1
            }]
        }).then(id => {
            console.log(id);
        }).catch(error => {
            console.log(error);
        });
    }

    // when the user presses submit this method will be called
    handleSubmit() {
        const formValue = this._form.getValue();

        // if text value is filled out
        if (formValue) {
            // if no days are selected
            if (!formValue.Sunday && !formValue.Monday && !formValue.Tuesday
                && !formValue.Wednesday && !formValue.Thursday &&
                !formValue.Friday && !formValue.Saturday) {
                    Alert.alert(
                        "Error", // title
                        "Please select at least on day of the week.", // message
                        [
                            { text: 'OK' } // button
                        ],
                        { cancelable: false }
                    );
            } else {
                if (formValue.Sunday) {
                    var sun = this.getNextDayOfWeek(0);
                    this.createEvent(sun);
                }
                if (formValue.Monday) {
                    var mon = this.getNextDayOfWeek(1);
                    this.createEvent(mon);
                }
                if (formValue.Tuesday) {
                    var tues = this.getNextDayOfWeek(2);
                    this.createEvent(tues);
                }
                if (formValue.Wednesday) {
                    var wed = this.getNextDayOfWeek(3);
                    this.createEvent(wed);
                }
                if (formValue.Thursday) {
                    var thurs = this.getNextDayOfWeek(4);
                    this.createEvent(thurs);
                }
                if (formValue.Friday) {
                    var fri = this.getNextDayOfWeek(5);
                    this.createEvent(fri);
                }
                if (formValue.Saturday) {
                    var sat = this.getNextDayOfWeek(6);
                    this.createEvent(sat);
                }

                // let user know reminders were added to phone calendar
                Alert.alert(
                    'Reminder has been added to your calendar!',
                    'You can edit your reminders from your phone calendar.',
                    [
                        {
                            text: 'OK', onPress: (() => {
                                // navigate back to goal summary page
                                this.props.navigation.goBack();
                            })
                        },
                    ],
                    { cancelable: false }
                );
            }

        } else {
            Alert.alert(
                "Error", // title
                "Please include some text for your reminder.", // message
                [
                    { text: 'OK' } // button
                ],
                { cancelable: false }
            );
        }

    }

    render() {
        const handleSubmit = this.handleSubmit;
        const { navigate } = this.props.navigation;
        return (

            <View style={styles.container_main}>
                <View style={styles.topContainer}>
                    <Text style={styles.title}>Wasteless</Text>
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

                <Text style={styles.headerPadding}>NEW REMINDER</Text>

                <ScrollView>
                    <Form ref={c => this._form = c} type={Reminder} options={options} />

                    <Button style={styles.button2} title="Create" onPress={
                        function () {
                            handleSubmit();
                        }
                    }>Create</Button>
                </ScrollView>

                <View style={[styles.menu]}>
                    <Button style={[styles.icon]}
                        onPress={
                            function () {
                                navigate('profile', {});
                            }.bind(this)
                        }>
                        <View style={styles.icon}>
                            <Image style={styles.image} source={require("./005-avatar.png")} />
                        </View>
                    </Button>

                    <Button style={[styles.icon]}
                        onPress={
                            function () {
                                navigate('reduce', {});
                            }.bind(this)
                        }>
                        <View style={styles.iconClicked}>
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

module.exports = newReminder;
