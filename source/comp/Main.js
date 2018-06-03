import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Dimensions from 'Dimensions';
import {Actions} from 'react-native-router-flux';

export default class Main extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text>
           <Image style={styles.logo} source={require
             ('../images/image.png')} />
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => Actions.Login()}>
            <Text style={styles.button}>
             Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.Login()}>
            <Text style={styles.button}>
             Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logo:{
  },
  buttonsContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    fontFamily: 'gotham rounded',
    backgroundColor: '#2590B6',
    textAlign: 'center',
    fontSize: 20,
    alignItems: 'center',
    height: 45,
    width: DEVICE_WIDTH - 60,
    borderRadius: 30,
    color: 'white',
    marginBottom: 7,
    textAlignVertical: 'center',
  },

});
