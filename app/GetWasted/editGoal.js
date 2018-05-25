import * as firebase from 'firebase';
import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, FlatList, ListView, ListItem, ScrollView, SectionList, Alert } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import Button from 'react-native-button';
import reduce from './reduce';
import moment from 'moment';
import app from './app';
import goalPage from './goalPage';
import newGoal from './newGoal';
import goalSummary from './goalSummary';

import {
    StackNavigator,
} from 'react-navigation';

const styles = require('./styles.js');

// creates the form
const Form = t.form.Form;
var Status = t.enums({
    Current: 'Current',
    Canceled: 'Canceled',
    Completed: 'Completed'
});
// creates the user input
const User = t.struct({
    goalText: t.String,
    beginDate: t.Date,
    endDate: t.Date,
    goalNotes: t.maybe(t.String),
    status: Status,
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
            fontSize: 18,
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 3,
        },
        // keep style the same if there's an error
        error: {
            backgroundColor: 'white',
            padding: 10,
            fontSize: 18,
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 3,
        },
    },
    controlLabel: {
        normal: {
            fontSize: 25,
            padding: 10,
            paddingLeft: 0,
            fontStyle: "italic",
            fontWeight: "200",
        },
        // keep style the same if there's an error
        error: {
            fontSize: 25,
            padding: 10,
            paddingLeft: 0,
            fontStyle: "italic",
            fontWeight: "200",
        }
    }
}

// these are the options for the login form
const options = {
    fields: {
        goalText: {
            label: 'Goal title',
        },
        beginDate: {
            mode: 'date',
            config: {
                format: (date) => moment(date).format('ddd MMM DD YYYY')
            }
        },
        endDate: {
            mode: 'date',
            config: {
                format: (date) => moment(date).format('ddd MMM DD YYYY')
            }
        },
        goalNotes: { type: 'textarea' }
    },
    stylesheet: formStyles,
};


export default class editGoal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            goalID: this.props.navigation.state.params.key,
            goals: {},
            initialValue: {}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        var user = firebase.auth().currentUser;
        this.goalRef = firebase.database().ref().child("Users/" + user.uid + "/goals/" + this.state.goalID);
        this.goalRef.on("value", function (snapshot) {
            this.setState(
                {
                    user: user,
                    goals: snapshot.val(),
                    initialValue: {
                        goalText: snapshot.val()['goalText'],
                        beginDate: new Date(snapshot.val()['beginDate']),
                        endDate: new Date(snapshot.val()['endDate']),
                        goalNotes: snapshot.val()['goalNotes'],
                        status: snapshot.val()['status'],
                    }
                }
            );
        }.bind(this));
    }

    componentWillUnmount() {
        if (this.goalRef) {
            this.goalRef.off();
        }
    }

    // when the user presses submit this method will be called
    handleSubmit() {
        const formValue = this._form.getValue();
        const gs = this.goalSummary;
        const rd = this.reduce;

        if (formValue) {
            var begin = formValue['beginDate'];
            var end = formValue['endDate'];

            // set time to beginning of day
            begin.setHours(0, 0, 0, 0);
            // set time to end of day
            end.setHours(23, 59, 59, 59);

            // if end date is before begin date
            if (begin > end) {
                Alert.alert(
                    "Error", // title
                    "End date cannot be before begin date.", // message
                    [
                        { text: 'OK' } // button
                    ],
                    { cancelable: false }
                );
            } else {

                var updates = {};
                updates["Users/" + this.state.user.uid + "/goals/" + this.state.goalID] = {
                    beginDate: formValue['beginDate'],
                    endDate: formValue['endDate'],
                    goalText: formValue['goalText'],
                    goalNotes: formValue['goalNotes'],
                    otherUsers: this.state.goals.otherUsers,
                    status: formValue['status']
                };
                firebase.database().ref().update(updates);

                // let user know edit was successful
                Alert.alert(
                    'Success',
                    'Goal was edited!',
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
                "Please include a title for your goal.", // message
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

                <Text style={styles.headerPadding}>EDIT GOAL</Text>

                <ScrollView>
                    <Form ref={c => this._form = c} type={User} options={options} value={this.state.initialValue} />
                    <Button style={styles.button} title="Create" onPress={
                        function () {
                            handleSubmit();
                        }
                    }>Save</Button>

                    <Button style={styles.button3} onPress={() => {
                            // navigate back to goals page
                            this.props.navigation.goBack();
                        }
                    }>Cancel</Button>

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
                        <View style={styles.icon}>
                            <Image style={styles.image} source={require("./001-reload.png")} />
                        </View></Button>


                    <Button style={[styles.icon]}
                        onPress={
                            function () {
                                navigate('read', {});
                            }.bind(this)
                        }>
                        <View style={styles.iconClicked}>
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

module.exports = editGoal;




