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
        this.itemsRef = firebaseApp.database().ref("getwasteduw");

        this.state = {
        };
    }
    
    listenForItems(itemsRef) {
        itemsRef.on('value', (snapshot) => {

            // get children as an array
            var items = [];
            snapshot.forEach(child => {
                items.push({
                    title: child.key,
                });
                console.log(child)
            });
            console.log(snapshot.length);

            this.setState({
                //dataSource: this.state.dataSource.cloneWithRows(items)
            });

        });
    }
    

    
    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }

    render() {
        return (
                <View style={styles.container}>
                <Text style={styles.welcome}>{this.dataSource}</Text>
                </View>
        )
    }
    _renderItem(item) {

        return (
                <ListItem item={item}/>
        );
    }
}
const styles = require('./styles.js');


