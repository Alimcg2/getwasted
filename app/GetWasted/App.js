/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as firebase from 'firebase';
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';


import {YellowBox} from 'react-native';
console.disableYellowBox = true;
import signUp from './signUp';
import signIn from './signIn';
import landing from './landing';
import goalPage from './goalPage';
import reduce from './reduce'; 
import trashy from './trashy'; 
import editGoal from './editGoal'; 
import newGoal from './newGoal'; 
import goalSummary from './goalSummary'; 
import cameraTest from './cameraTest'; 
import newReminder from './newReminder';
import read from './read';
import shop from './shop';
import shareFeed from './shareFeed';
import profile from './profile';
import otherProfile from './otherProfile';
import setting from './setting';
import tutorialPage1 from './tutorialPage1';
import tutorialPage2 from './tutorialPage2';
import tutorialPage3 from './tutorialPage3';
import tutorialPage4 from './tutorialPage4';
import tutorialPage5 from './tutorialPage5';
import tutorialPage6 from './tutorialPage6';

const styles = require('./styles.js');

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCbxZ-OoW54x_xZxyoXNXA9WzoHfTTRwcQ",
    authDomain: "getwasteduw.firebaseapp.com",
    databaseURL: "https://getwasteduw.firebaseio.com",
    storageBucket: "getwasteduw.appspot.com",
};
firebase.initializeApp(firebaseConfig);

import {
  StackNavigator,
} from 'react-navigation';

let Transition = (index, position) => {
    const inputRange = [index - 1, index, index + 1, index + 1];

    const opacity = position.interpolate({
        inputRange,
        outputRange: ([1, 1, 1, 1]),
    });

    const translateX = 0;
    const translateY = 0;

    return {
        opacity,
        transform: [
            { translateX },
            { translateY }
        ],
    };
};

let TransitionConfiguration = () => {
    return {
        // Define scene interpolation, eq. custom transition
        screenInterpolator: (sceneProps) => {

            const {position, scene} = sceneProps;
            const {index} = scene;

            return Transition(index, position);
        }
    }
};

const Stacks = StackNavigator({
    landing: { screen: landing },
    signUp: { screen: signUp },
    signIn: { screen: signIn },
    goalPage: { screen: goalPage },
    reduce: { screen: reduce }, 
    trashy: { screen: trashy },
    editGoal: { screen: editGoal },
    newGoal: { screen: newGoal }, 
    goalSummary: { screen: goalSummary }, 
    cameraTest: { screen: cameraTest }, 
    newReminder: { screen: newReminder },
    read: { screen: read },
    shop: { screen: shop },
    shareFeed: { screen: shareFeed},
    profile: { screen: profile },
    otherProfile: { screen: otherProfile },
    setting: { screen: setting },
    tutorialPage1: { screen: tutorialPage1},
    tutorialPage2: { screen: tutorialPage2},
    tutorialPage3: { screen: tutorialPage3},
    tutorialPage4: { screen: tutorialPage4},
    tutorialPage5: { screen: tutorialPage5},
    tutorialPage6: { screen: tutorialPage6}
},
{ 
    headerMode: 'none',
    transitionConfig: TransitionConfiguration
  }
);

export default class App extends Component {
    render() {
        return (
                <Stacks />
        );
    }
}

module.exports = App;
