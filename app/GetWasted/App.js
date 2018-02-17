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

        this.state = {
        };
    }

    componentDidMount() {
        this.blogsRef = firebaseApp.database().ref('Blogs');
        this.blogsRef.on('value', (snapshot) => {
            var blogs = [];
            snapshot.forEach((child) => {
                blogs.push(child.val())
            });
            console.log(blogs)
            this.setState({ 'blogs': blogs });
        });
    }
    
    componentWillUnmount() {
        if (this.blogsRef) {
            this.blogsRef.off();
        }
    }

    render() {
        console.log(this.state.blogs);
        return (
                <View style={styles.container}>
                <Text style={styles.welcome}>Testing</Text> 
                <Text style={styles.welcome}>{}</Text> 
                </View>
        )
    }
}
const styles = require('./styles.js');


