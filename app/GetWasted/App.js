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


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCbxZ-OoW54x_xZxyoXNXA9WzoHfTTRwcQ",
    authDomain: "getwasteduw.firebaseapp.com",
    databaseURL: "https://getwasteduw.firebaseio.com",
    storageBucket: "getwasteduw.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        console.log();
        super(props);
        this.itemsRef = firebaseApp.database().ref();

        this.state = {
        };
      }
    
    listenForItems(itemsRef) {
        itemsRef.on("value", (snap) => {

            // get children as an array
            var items = [];
            snap.forEach((child) => {
                items.push({
                    title: child.val().title,
                    _key: child.key
                });
            });
            console.log("turd");
            

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            });

        });
    }

    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }
    


    
    render() {
        return(
      <View style={styles.container}>
        <Text style={styles.welcome}>
            TEST
        </Text>
      </View>
        );
    }
}
const styles = require('./styles.js');


