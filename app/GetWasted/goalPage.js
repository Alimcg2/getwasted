import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View, StyleSheet, Button, Text, Image } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import {
  StackNavigator,
} from 'react-navigation';

import app from './app';

const styles = require('./styles.js');





export default class goalPage extends Component {
    constructor(props) {
        super(props);
        this.state = { userName : firebase.auth().currentUser.displayName};
    }

    render() {
        var url ="https://lh3.googleusercontent.com/TRAAn5wOYk8bcbATVTAW32DozRag2qD2GUbUX5qq9Qe4Z3X67DG3SxId2oy-I35-sCybHJHC6y1Ydb29O4wN7EAjvxQ-uZ9wQ5kePwq7sK1MDGz3hbq2c91le_RljfMogt4TSzHTb2rX4piqRREt7qzxY7YgYIL8ViWeoMyJy39GICl2Mal6KFmCdtxi5DCisPyzL1lw-SRK0mglCROgsExYu6iPziF2bSiVx0-0MS0Zc-qFhEiHtAa0p8KZ9WjRN3yrL-gcrY-TO8y8eYtbXC0FxjhqKe3GJUbQytv8kQV1Tn8a4AsVtzEfOgVn_AJ0oYmVkynJlGbud9sqs2JNvJy6SvImMKkp0Dg7J5vh9beLwPFpJIvTwjZjsVLnftEamH_c9JTux9PA7ExgXEzgLu8cpNDKoOrtpHmZQ6PvqR61qLApZanKB8jgROVBzvBiu9GG6Z9DAbFWVCamv1IAFa-CTDIwAw3WfK1-BFk-psrGzvU78mAfDYoVOQw0XfuY7kUAqv5FPRQh58QVFbgw6oe9BwsNEuzYjEIvoBS6sd6Kbl3YoVUqh7JJm92gYMkz3rsbrUCn4DwDTWqfL2WcDnfRxD_2LqENOARe9oI=s755-no";
        let display = this.state.userName;
        return (
                <View style={styles.container}>
                        <Image
          style={{width: 50, height: 50}}
          source={{uri: url}}
        />
                <Text style={styles.welcome}>{display}</Text>
            </View>

        );
    }
}

module.exports = goalPage;
