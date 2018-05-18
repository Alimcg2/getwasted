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


// creates the form for search bar
const Form = t.form.Form;

// creates the search input
const Search = t.struct({
    search: t.String
});

// form styling
const formStyles = {
    ...Form.stylesheet,
    formGroup: {
        normal: {
            marginBottom: 10,
        },
        error: {
            marginBottom: 10
        }
    },
    textbox: {
        normal: {
            backgroundColor: '#e2ddd0',
            padding: 10,
            fontSize: 20,
            marginTop: 10
        },
        error: {
            backgroundColor: '#e2ddd0',
            padding: 10,
            fontSize: 20,
            marginTop: 10
        }
    },
    controlLabel: {
        normal: {
            display: "none"
        },
        // the style applied when a validation error occours
        error: {
            display: "none"
        }
    }
}

// these are the options for the search form
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
            searchOn: false,
            searchPosts: [],
            searchValue: ""
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
                    format = {
                        title: childData.Title,
                        blog: childData.Blog,
                        keywords: childData.Keywords,
                        img: { uri: childData.ImageURL },
                        link: childData.Link
                    };
                }
                postsArray.push(format);
            }.bind(this));
            postsArray = this.shuffleArray(postsArray);
            this.setState({ imgs: postsArray, loading: false });
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
        if (value) {
            var result = [];
            this.setState({ searchValue: value.search });
            console.log(value.search);
            // var list = this.state.imgs;
            var list = this.state.imgs.map(item => item.keywords);
            for (var i = 0; i < list.length; i++) {
                if (list[i]) {
                    if (list[i].includes(value.search.toLowerCase())) {
                        result.push(this.state.imgs[i])
                    }
                }
            }
            console.log(result);
            this.setState({ searchPosts: result, searchOn: true });
        }
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


                        {/* icon to open sidebar */}
                        <View>
                            <Text style={styles.headerPadding}>EXPLORE</Text>
                        </View>


                        {/* search bar */}
                        <Form ref={c => this._form = c}
                            type={Search}
                            options={options}
                        />
                        <Button style={styles.search_button}
                            onPress={
                                function () {
                                    handleSearch();
                                }
                            }><Image style={styles.search_button} source={{ uri: "https://cdn.shopify.com/s/files/1/1161/9636/t/15/assets/search-icon.png?7610983656426791530" }} />
                        </Button>

                        {/* text under search bar after search */}
                        {this.state.searchOn ?
                            <View style={{ paddingBottom: 10 }}>
                                <Text>Showing posts for &quot;{this.state.searchValue}&quot;</Text>
                                <Text style={{ fontWeight: "bold" }} onPress={() => {
                                    this.setState({
                                        searchPosts: [],
                                        searchOn: false,
                                        searchValue: ""
                                    });
                                }}>Clear Search</Text>
                            </View> :
                            <View></View>
                        }

                        {/* normal content */}
                        <ScrollView style={[styles.postContainer, this.state.searchOn && styles.search_active]}>
                            <FlatList style={styles.posts}
                                data={visiblePosts}
                                renderItem={({ item }) =>
                                    <View style={styles.list_container}>
                                        {/* linked image */}
                                        <Button onPress={() =>
                                            Linking.openURL(item.link).catch(err => console.error('An error occurred', err))
                                        }>
                                            <Image style={styles.trashyPic} source={item.img} />
                                        </Button>

                                        {/* linked title */}
                                        <Text style={styles.subtitle}
                                            onPress={(() => {
                                                Linking.openURL(item.link).catch(err => console.error('An error occurred', err))
                                            })}>
                                            {item.title}
                                        </Text>

                                        {/* blog name */}
                                        <Text style={styles.subtitle2}>{item.blog}</Text>
                                    </View>
                                }
                            />

                            <View style={styles.more_posts}>
                                {visiblePosts.length < allPosts.length ?
                                    <Button style={styles.button} onPress={
                                        function () {
                                            this.setState({ numPosts: this.state.numPosts + 10 });
                                        }.bind(this)}>
                                        Load More Posts
                                    </Button> :
                                    <View></View>
                                }
                            </View>
                        </ScrollView>

                        {/* search content */}
                        <ScrollView style={[styles.postContainer, !this.state.searchOn && styles.search_active]}>
                            <FlatList style={styles.posts}
                                data={this.state.searchPosts}
                                renderItem={({ item }) =>
                                    <View style={styles.list_container}>
                                        {/* linked image */}
                                        <Button onPress={() =>
                                            Linking.openURL(item.link).catch(err => console.error('An error occurred', err))
                                        }>
                                            <Image style={styles.trashyPic} source={item.img} />
                                        </Button>

                                        {/* linked title */}
                                        <Text style={styles.subtitle}
                                            onPress={(() => {
                                                Linking.openURL(item.link).catch(err => console.error('An error occurred', err))
                                            })}>
                                            {item.title}
                                        </Text>

                                        {/* blog name */}
                                        <Text style={styles.subtitle2}>{item.blog}</Text>
                                    </View>
                                }
                            />
                            <View style={styles.more_posts}></View>
                        </ScrollView>

                    </View>
                }

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

module.exports = read;
