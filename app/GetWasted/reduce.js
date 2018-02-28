import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View, StyleSheet, Button, Text, Image } from 'react-native';
import { FlatList, ScrollView, SectionList } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import app from './app';
import trashy from './trashy';
import goalPage from './goalPage';

import {
  StackNavigator,
} from 'react-navigation';

const styles = require('./styles.js');

const Stacks = StackNavigator({
    trashy: { screen: trashy },
    goalPage: { screen: goalPage },
  
});

export default class reduce extends Component {
    constructor(props) {
        super(props);
        var user = firebase.auth().currentUser; /* gets current user */
        this.state = { userName : user.displayName,
                       profileImg : "",
                       goalTitles : [],
                       goalBeginDates : [],
                       goalEndDates : [],
                       goalStatus: []};
        var imageRef = firebase.database().ref().child("Users/" + user.uid + "/image"); /* gets the image-parent class*/
        imageRef.on("value", function(snapshot) {
            this.setState({profileImg: snapshot.val()});
        }.bind(this)); /* actual image-info */
        
        var goalRef = firebase.database().ref().child("Users/" + user.uid + "/goals");
        goalRef.on("value", function(snapshot) {
            this.setState({goals: snapshot.val()});
            var titles = []
            var beginDates = []
            var endDates = []
            var status = []
            snapshot.forEach(function(data) {
                titles.push(data.val()["goalText"]);
                beginDates.push(data.val()["beginDates"]);
                endDates.push(data.val()["endDates"]);
                status.push(data.val()["goalStatus"]);
            }.bind(this));
            this.setState({goalTitles : titles});
            this.setState({goalBeginDates : beginDates});
            this.setState({goalEndDates : endDates});
            this.setState({goalStatus : status});
        }.bind(this));
    }

    render() {
        const ts = this.trashy; 
        const gp = this.goalPage;
        
        const { navigate }  = this.props.navigation;
        const resizeMode = 'center';

        let display = this.state.userName;
        var url = this.state.profileImg.toString();
        var titles = this.state.goalTitles;
        var beginDates = this.state.goalBeginDates;
        var endDates = this.state.goalEndDates;
        var status = this.state.goalStatus;
        //var testing2 = testing["goalText"];

        return (
            <View style={styles.container_reduce}>

                <Text style={styles.welcome}>Reduce</Text>
                
                <Image style={styles.image} source={{url}} />

                <Text style={styles.header2}>{display}</Text>

            <View style={styles.reduce_button_flex_container}>
                <Button style={styles.submit}
                title="Trashy Pics ;-)"
                onPress={
                    function() {
                        navigate('trashy', {});
                    }
                }/>

                <Button style={styles.submit}
                title="Goals"
                onPress={
                    function() {
                        navigate('goalPage', {});
                    }
                }/>
            </View>

            <Text style={styles.header2}>Pictures</Text>
            
            <View style={styles.reduce_test}>
                <SectionList
            sections={[
                {title: '', data: [<Image source={require('./trashtest.jpg')} />,
                <Image source={require('./trashtest2.jpg')} />,
                <Image source={require('./trashtest4.jpg')} />,]},
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
            renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
            keyExtractor={(item, index) => index}
            />
            </View>
            
        </View>
        );
    }
}

module.exports = reduce;