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
// var Landing  = require('./landing'); <- KENZIES LANDING PAGE
// var SignUp  = require('./signUp');
// var HomePage = require('./homePage');
>>>>>>> efdd88631caf09bc9c7dcc5867c64750afb84b78

import signUp from './signUp';
import homePage from './homePage';
const styles = require('./styles.js');


// export default class App extends Component<Props> {
//     constructor(props) {
//         super(props);
//         // creates user info placeholders
//         this.state = {
            
//         };
        
//     }

//     render() {
//         return(
//                 <View>
//                  <SignUp />
//                 </View>
//         );
//     }
// }
import {
  StackNavigator,
} from 'react-navigation';

const Stacks = StackNavigator({
  signUp: { screen: signUp },
  homePage: { screen: homePage },
});


export default class App extends Component {
    render() {
<<<<<<< HEAD
        return(
                <View>
                <Landing/>
                </View>
=======
        return (
                <Stacks />
>>>>>>> efdd88631caf09bc9c7dcc5867c64750afb84b78
        );
    }
}
