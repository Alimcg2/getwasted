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


// creates the form
const Form = t.form.Form;

// creates the user input
const User = t.struct({
    seach: t.String
});
// this is the styling for the sign in form, we might be able to put this into the
// stylesheet but its a little weird because its using tcomb
const formStyles = {
    ...Form.stylesheet,
    formGroup: {
        normal: {
            marginBottom: 10,
        },
    },
    textbox: {
        normal: {
            backgroundColor: '#e2ddd0',
            padding: 10,
            fontSize: 20,
            marginTop: 10
        },
    },
    controlLabel: {
        normal: {
            display: "none"
        },
        // the style applied when a validation error occours
        error: {
            color: 'red',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        }
    }
}

// these are the options for the sign in form
const options = {
    fields: {
        search: {}
    },
    stylesheet: formStyles,
};



export default class read extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getMenu: false,
            profileImg: "",
            imgs: [],
            loading: true,
            numPosts: 10,
            keywords: [],
            searchOn: false,
            searchPosts: [],
        };
        this.handleSignOut = this.handleSignOut.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentWillMount() {
        var user = firebase.auth().currentUser;

        this.imageRef = firebase.database().ref().child("Users/" + user.uid + "/image"); /* gets the image-parent class*/
        this.imageRef.on("value", function (snapshot) {
            this.setState({ profileImg: snapshot.val() });
        }.bind(this)); /* actual image-info */

        this.blogsRef = firebase.database().ref().child("BlogPosts/");
        this.blogsRef.on("value", function (snapshot) {
            var postsArray = [];
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                var format;
                if (childData.ImageURL == "NULL - image") {
                    format = { title: childData.Title, blog: childData.Blog, img: require("./getwastedicon.png"), link: childData.Link }
                }
                else {
                    format = { title: childData.Title, blog: childData.Blog, img: { uri: childData.ImageURL }, link: childData.Link }
                }
                postsArray.push(format);
                var all = this.state.keywords;
                all.push(childData.Keywords)
                this.setState({ keywords: all })
            }.bind(this));
            this.shuffleArray(postsArray)
            this.setState({ imgs: postsArray });
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

    handleSearch = () => {
        const value = this._form.getValue();
        var result = [];
        console.log(value.seach);
        var list = this.state.keywords
        for (var i = 0; i < list.length; i++) {
            if (list[i].includes(value.seach.toLowerCase())) {
                console.log(list[i]);
                result.push(this.state.imgs[i])
            }
        }
        console.log(result)
        this.setState({ searchPosts: result, searchOn: true });
    }


    render() {
        const handleSearch = this.handleSearch;
        var url = this.state.profileImg.toString();
        const { navigate } = this.props.navigation;
        var allPosts = this.state.imgs;
        var visiblePosts = allPosts.slice(0, this.state.numPosts);
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
                         this.setState({ getMenu: false });
                     }.bind(this)
                 }>Read</Button>

                 <Button style={[styles.menu_item]}
                 onPress={
                     function () {
                         navigate('shop', {});
                     }.bind(this)
                 }>Shop</Button>

                 <Button style={[styles.menu_item]}
                 onPress={
                     function () {
                         navigate('shareFeed', {});
                     }.bind(this)
                 }>Share</Button>

                 <Button style={[styles.menu_item]}
                 onPress={
                     function () {
                         navigate('setting', {});
                     }.bind(this)
                 }>Settings</Button>
                 
                 <Button style={styles.signOut} title="Sign out"
                 onPress={this.handleSignOut} >Sign Out</Button>
                 </View>
                 

                 
                 {/* icon to open sidebar */}
                 <View>
                 <Button onPress={
                     function () {
                                    this.setState({ getMenu: true });
                                }.bind(this)}>
                                <Image style={styles.image} source={{ url }} />
                            </Button>
                            <Text style={styles.header}>READ</Text>
                        </View>

                        <Form ref={c => this._form = c}
                            type={User}
                            options={options}
                        />

                        <Button style={styles.search_button}
                            onPress={
                                function () {
                                    handleSearch();
                                }
                            }><Image style={styles.search_button} source={{ uri: "https://cdn.shopify.com/s/files/1/1161/9636/t/15/assets/search-icon.png?7610983656426791530" }} /></Button>


                        <ScrollView style={[styles.postContainer, this.state.searchOn && styles.search_active]}>
                            <FlatList style={styles.posts}
                                data={visiblePosts}
                                renderItem={({ item }) => <View style={styles.list_container}>

                                    <Button onPress={() => Linking.openURL("")}>
                                        <Image style={styles.trashyPic} source={item.img} />
                                    </Button>

                                    <Text style={styles.subtitle}>{item.title}</Text>
                                    <Text style={styles.subtitle2}>{item.blog}</Text>
                                </View>
                                }
                            />

                            {visiblePosts.length < allPosts.length ?
                                <Button style={[styles.button, styles.more_posts]} onPress={
                                    function () {
                                        this.setState({ numPosts: this.state.numPosts + 10 });
                                    }.bind(this)}>
                                    Load More Posts
                                </Button> :
                                <View></View>
                            }

                        </ScrollView>

                        <ScrollView style={[styles.postContainer, !this.state.searchOn && styles.search_active]}>
                            <FlatList style={styles.posts}
                                data={this.state.searchPosts}
                                renderItem={({ item }) => <View style={styles.list_container}>

                                    <Button onPress={() => Linking.openURL("")}>
                                        <Image style={styles.trashyPic} source={item.img} />
                                    </Button>

                                    <Text style={styles.subtitle}>{item.title}</Text>
                                    <Text style={styles.subtitle2}>{item.blog}</Text>
                                </View>
                                }
                            />

                            {visiblePosts.length < allPosts.length ?
                                <Button style={[styles.button, styles.more_posts]} onPress={
                                    function () {
                                        this.setState({ numPosts: this.state.numPosts + 10 });
                                    }.bind(this)}>
                                    Load More Posts
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

module.exports = read;
