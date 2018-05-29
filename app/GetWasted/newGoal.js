import * as firebase from 'firebase';
import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, FlatList, ListView, ListItem, ScrollView, SectionList, Alert } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import Button from 'react-native-button';
import reduce from './reduce';
import app from './app';
import moment from 'moment';
import goalPage from './goalPage';
import editGoal from './editGoal';
import goalSummary from './goalSummary';
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
    endDate: t.Date,
    goalNotes: t.maybe(t.String),
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
        }
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


export default class newGoal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.setState({
            user: firebase.auth().currentUser /* gets current user */
        });
    }

    componentWillUnmount() {
        if (this.goalRef) {
            this.goalRef.off();
        }
    }

    // when the user presses submit this method will be called
    handleSubmit() {
        const { navigate } = this.props.navigation;
        const formValue = this._form.getValue();
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
                this.userGoalsRef = firebase.database().ref("Users/" + this.state.user.uid + "/goals/");
                var goalData = {
                    beginDate: formValue['beginDate'].toString(),
                    endDate: formValue['endDate'].toString(),
                    goalText: formValue['goalText'],
                    goalNotes: formValue['goalNotes'],
                    otherUsers: '',
                    status: 'Current'
                };
                this.userGoalsRef.push(goalData);

                // let user know goal was added
                Alert.alert(
                    'Success',
                    'New goal created!',
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
                    <Text style={styles.title}>WasteLess</Text>
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

                <Text style={styles.headerPadding}>NEW GOAL</Text>
                <ScrollView>
                    <Form ref={c => this._form = c} type={User} options={options} />
                    <Button style={styles.button} title="Create" onPress={
                        function () {
                            handleSubmit();
                        }
                    }>Create</Button>

                    <Button style={[styles.button3, { marginBottom: 275 }]} onPress={() => {
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

module.exports = newGoal;
