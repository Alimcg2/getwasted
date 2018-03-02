import * as firebase from 'firebase';
import React, { Component } from 'react';
import {Dimensions,  View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {RNCamera} from 'react-native-camera';
import signUp from './signUp';
import signIn from './signIn';
import goalPage from './goalPage';
import Button from 'react-native-button';

import {
    StackNavigator,
} from 'react-navigation';
'react-navigation';

class cameraTest extends Component {
    constructor(props) {
        super(props)

        this.takePicture = this.takePicture.bind(this);
    }
    
    takePicture = async function() {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options)
            console.log(data.uri);
        }

    }
    
    render() {
        const takePicture = this.takePicture;
        return (
                <View style={styles.container}>
                <RNCamera
            ref={ref => {
                this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
                />
                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
                <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
                >
                <Text style={{fontSize: 14}}> SNAP </Text>
                </TouchableOpacity>
                </View>
                </View>
        );
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});

module.exports = cameraTest;

