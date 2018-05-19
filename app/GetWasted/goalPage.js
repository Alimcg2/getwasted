import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View, StyleSheet, SectionList, Text, Image, FlatList, ScrollView } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import Button from 'react-native-button';
import {
    StackNavigator,
} from 'react-navigation';

import app from './app';
import editGoal from './editGoal';
import newGoal from './newGoal';
import goalSummary from './goalSummary';
const styles = require('./styles.js');

export default class goalPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: firebase.auth().currentUser, /* gets current user */
            userName: "",
            profileImg: ""
        };
    }

    componentWillMount() {
        var user = firebase.auth().currentUser;
        this.imageRef = firebase.database().ref().child("Users/" + user.uid + "/image"); /* gets the image-parent class*/
        this.imageRef.on("value", function (snapshot) {
            this.setState({ profileImg: snapshot.val() });
        }.bind(this)); /* actual image-info */

        // get goal data from firebase, separate current and past
        this.goalRef = firebase.database().ref().child("Users/" + user.uid + "/goals");
        this.goalRef.on("value", (snapshot) => {
            var currentGoals = [];
            var pastGoals = [];
            snapshot.forEach((child) => {
                var goal = child.val();
                var key = child.key;
                if (goal.status == "Current") {
                    currentGoals.push({ goalKey: key, goalData: goal });
                } else {
                    pastGoals.push({ goalKey: key, goalData: goal });
                }
            });
            this.setState({ currentGoals: currentGoals });
            this.setState({ pastGoals: pastGoals });
        });
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
        const editGoal = this.editGoal;
        const newGoal = this.newGoal;
        const goalSummary = this.goalSummary;

        let display = this.state.userName;
        var url = this.state.profileImg.toString();

        const { navigate } = this.props.navigation;

        // items for current goals
        var currentKeys = Object.keys(this.state.currentGoals);
        var currentGoalButtons = currentKeys.map((goal, index) => {
            var key = this.state.currentGoals[goal].goalKey;
            var item = this.state.currentGoals[goal].goalData.goalText;

            return <Button style={styles.button} key={index} onPress={() => {
                navigate('goalSummary', { index, item, key });
            }}>
                {item}
            </Button>
        });

        // items for past goals
        var pastKeys = Object.keys(this.state.pastGoals);
        var pastGoalButtons = pastKeys.map((goal, index) => {
            var key = this.state.pastGoals[goal].goalKey;
            var item = this.state.pastGoals[goal].goalData.goalText;

            return <Button style={styles.button} key={index} onPress={() => {
                navigate('goalSummary', { index, item, key });
            }}>
                {item}
            </Button>
        });        

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
                <Text style={styles.headerPadding}>GOALS</Text>
                <Button onPress={() => {
                    navigate('newGoal', {});
                }}>
                    <Image style={styles.plusIcon} source={require("./plus-icon.png")} />
                </Button>

                <ScrollView>
                    <Text style={styles.goalTitle}>Current Goals</Text>
                    {currentGoalButtons.length > 0 ?
                        currentGoalButtons :
                        <Text style={styles.subtitle}>None</Text>
                    }

                    <Text style={styles.goalTitle}>Past Goals</Text>
                    {pastGoalButtons.length > 0 ?
                        pastGoalButtons :
                        <Text style={styles.subtitle}>None</Text>
                    }

                    <View style={{ paddingBottom: 125 }}></View>
                </ScrollView>

                {/* bottom nav bar */}
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

module.exports = goalPage;
