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
export default class TestingBlogs extends Component<Props> {
    constructor(props) {
        console.log();
        super(props);

        this.state = { blogs: [] };
    }

    componentDidMount() {
        this.blogsRef = firebaseApp.database().ref('Blogs');
        this.blogsRef.on('value', (snapshot) => {
            var blogs = [];
            snapshot.forEach((child) => {
                blogs.push(child.val())
            });
            this.setState({ 'blogs': blogs });
        });
    }
    
    componentWillUnmount() {
        if (this.blogsRef) {
            this.blogsRef.off();
        }
    }

    render() {

        var blogItems = this.state.blogs.map((blog) => {
            return (<Text style={styles.blogName} key={blog["Name"]}>{blog["Name"]}</Text>);
        });
        return (
                <View style={styles.container}>
                    {blogItems}
                </View>
        )

    }
}
const styles = require('./styles.js');


