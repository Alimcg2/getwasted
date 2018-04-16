import * as firebase from 'firebase';
import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, FlatList, List, Linking, ListView, ListItem, ScrollView, SectionList } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import flatListdata from './reduce_fake_picture';

import Button from 'react-native-button';
import app from './app';
import reduce from './reduce';

import {
    StackNavigator,
} from 'react-navigation';

const styles = require('./styles.js');



export default class shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getMenu: false,
            profileImg: "",
            imgs: [],
            loading: true,
            numProducts: 10
        };
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    componentWillMount() {
        var user = firebase.auth().currentUser;

        this.imageRef = firebase.database().ref().child("Users/" + user.uid + "/image"); /* gets the image-parent class*/
        this.imageRef.on("value", function (snapshot) {
            this.setState({ profileImg: snapshot.val() });
        }.bind(this)); /* actual image-info */

        this.blogsRef = firebase.database().ref().child("StorePosts/");
        this.blogsRef.on("value", function (snapshot) {
            var productsArray = [];
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                var format;
                if (childData.ImageURL == "NULL - image") {
                    format = { title: childData.Title, blog: childData.Blog, img: require("./getwastedicon.png"), link: childData.Link }
                }
                else {
                    format = { title: childData.Title, blog: childData.Store, img: { uri: childData.ImageURL }, link: childData.ItemURL }
                }
                productsArray.push(format);
            }.bind(this));
            this.setState({ imgs: this.shuffleArray(productsArray) });
            this.setState({ loading: false });
        }.bind(this)); /* actual image-info */
    }

    componentWillUnmount() {
        if (this.imageRef) {
            this.imageRef.off();
        }
        if (this.blogsRef) {
            this.blogsRef.off();
        }
    }

    shuffleArray(arr) {
        return arr.map(a => [Math.random(), a])
            .sort((a, b) => a[0] - b[0])
            .map(a => a[1]);
    }

    handleSignOut() {
        if (firebase.auth().currentUser) {
            firebase.auth().signOut();
        }
        this.props.navigation.navigate('landing', {});
    }

    render() {
        var url = this.state.profileImg.toString();
        const { navigate } = this.props.navigation;
        var allProducts = this.state.imgs;
        var visibleProducts = allProducts.slice(0, this.state.numProducts);
        var loading = this.state.loading;

        return (
            <View style={styles.container_main}>

                {this.state.loading ?
                    <View style={styles.center}>
                        <Text>LOADING...</Text>
                    </View> :

                    <View>
                        <View style={[styles.menu, this.state.getMenu && styles.menu_active]}>

                            <Button style={[styles.menu_item]}
                                onPress={
                                    function () {
                                        navigate('profile', {});
                                    }.bind(this)
                                }>Profile</Button>

                            <Button style={[styles.menu_item]}
                                onPress={
                                    function () {
                                        navigate('reduce', {});
                                    }.bind(this)
                                }>Reduce</Button>

                            <Button style={[styles.menu_item]}
                                onPress={
                                    function () {
                                        navigate('read', {});
                                    }.bind(this)
                                }>Read</Button>

                            <Button style={[styles.menu_item]}
                                onPress={
                                    function () {
                                        this.setState({ getMenu: false });
                                    }.bind(this)
                                }>Shop</Button>

                            <Button style={[styles.menu_item]}
                                onPress={
                                    function () {
                                        navigate('shareFeed', {});
                                    }.bind(this)
                                }>Share</Button>

                            <Button style={styles.menu_item} title="Sign out"
                                onPress={this.handleSignOut} >Sign Out</Button>
                        </View>

                        <Button onPress={
                            function () {
                                this.setState({ getMenu: true });
                            }.bind(this)}>
                            <Image style={styles.image} source={{ url }} />
                        </Button>

                        <ScrollView>
                            <FlatList style={styles.posts}
                                data={visibleProducts}
                                renderItem={({ item }) => <View style={styles.list_container}>

                                    <Button onPress={() => Linking.openURL("")}>
                                        <Image style={styles.trashyPic} source={item.img} />
                                    </Button>

                                    <Text style={styles.subtitle}>{item.title}</Text>
                                    <Text style={styles.subtitle2}>{item.blog}</Text>

                                </View>
                                }
                            />

                            {visibleProducts.length < allProducts.length ?
                                <Button style={[styles.button, styles.more_posts]} onPress={
                                    function () {
                                        this.setState({ numProducts: this.state.numProducts + 10 });
                                    }.bind(this)}>
                                    Load More Products
                            </Button> :
                                <View></View>
                            }

                        </ScrollView>
                    </View>
                }
            </View>
        );
    }
}

module.exports = shop;
