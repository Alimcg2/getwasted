import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View, StyleSheet, SectionList, Text, Image, ScrollView } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import Moment from 'react-moment';
import Button from 'react-native-button';
import {
    StackNavigator,
} from 'react-navigation';

import app from './app';
import goalPage from './goalPage';
import editGoal from './editGoal';
import newGoal from './newGoal';
// import newReminder from './newReminder';

const styles = require('./styles.js');

export default class goalSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: firebase.auth().currentUser, /* gets current user */
            userName: firebase.auth().currentUser.displayName,
            profileImg: "",
            goalID: this.props.navigation.state.params.key,
            goalText: this.props.navigation.state.params.item,
            goalBeginDate: "",
            goalEndDate: [],
            goalStatus: [],
            goalNotes: []
        };

    }

    componentWillMount() {
        this.setState({ userName: this.state.user.displayName })
        this.imageRef = firebase.database().ref().child("Users/" + this.state.user.uid + "/image"); /* gets the image-parent class*/
        this.imageRef.on("value", function (snapshot) {
            this.setState({ profileImg: snapshot.val() });
        }.bind(this)); /* actual image-info */


        this.goalRef = firebase.database().ref().child("Users/" + this.state.user.uid + "/goals/" + this.state.goalID);
        this.goalRef.on("value", function (snapshot) {
            this.setState(
                {
                    goalBeginDate: new Date(snapshot.val()['beginDate']),
                    goalEndDate: new Date(snapshot.val()['endDate']),
                    goalStatus: snapshot.val()['status'],
                    goalNotes: snapshot.val()['goalNotes'],
                }
            );
            console.log(this.state)
        }.bind(this));
    }

    componentWillUnmount() {
        if (this.imageRef) {
            this.imageRef.off();
        }
        if (this.goalRef) {
            this.goalRef.off();
        }
    }



    render() {
        const { navigate } = this.props.navigation;

        let display = this.state.userName;
        var url = this.state.profileImg.toString();
        var title = this.state.goalText;
        var beginDate = this.state.goalBeginDate;
        var endDate = this.state.goalEndDate;
        var status = this.state.goalStatus;
        var key = this.state.goalID;
        var goalNotes = this.state.goalNotes;
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

                <Text style={styles.headerPadding}>{title.toUpperCase()}</Text>
                <ScrollView>
                <Text style={styles.header2}>Status</Text>
                    <Text style={styles.status}>{status}</Text>
                    <Text style={styles.header2}>Notes</Text>
                    <Text style={styles.status}>{goalNotes ? goalNotes : "No notes"}</Text>
                    <Text style={styles.header2}>Start Date</Text>
                    <Moment element={Text} format='ddd MMM DD YYYY' style={styles.date}>{beginDate}</Moment>
                    <Text style={styles.header2}>End Date</Text>
                    <Moment element={Text} format='ddd MMM DD YYYY' style={styles.date}>{endDate}</Moment>
                    <Button style={styles.button} onPress={
                        function () {
                            navigate('editGoal', { title, key });
                        }
                    }>Edit Goal</Button>

                    <Button style={styles.button2} onPress={
                        function () {
                            navigate('newReminder', { key, beginDate, endDate });
                        }
                    }>New Reminder</Button>
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

module.exports = goalSummary;
