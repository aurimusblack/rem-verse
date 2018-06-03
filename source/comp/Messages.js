import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Picker,
  Alert
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';

export default class Messages extends Component{
  state = {
    email: this.props.uname,
    address: [],

  }
  componentWillMount(){
    const firebaseConfig = {
      apiKey: "AIzaSyA3iBjXsBS5TkcJF38tKeff0ttQNiDpIbg",
      authDomain: "thindger.firebaseapp.com",
      databaseURL: "https://thindger.firebaseio.com",
      projectId: "thindger",
      storageBucket: "thindger.appspot.com",
      messagingSenderId: "774427113792"
    }
    try{
    const firebaseApp = firebase.initializeApp(firebaseConfig);
    }
    catch(error){

    }
    firebase.database().ref('messagesDB/').once("value",(snapshot) =>{
      let x = snapshot.val()
      let y = []
      var keys = Object.keys(x)
      let j
      for (j = 0; j < keys.length; j++) {
        if(this.state.email == x[keys[j]].uname){
        y.push(x[keys[j]].address)
      }
      }
      console.log(y)
      this.setState({address: y})
    }).then(() =>{
      console.log("yeah")
    }).catch((error) =>{
      console.log("No")
    })
  }
  render() {
    var Components = this.state.address.join("\r\n\n");
    return (
      <View style={styles.container}>
        <Text style={styles.formElement}>{Components}</Text>
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

  logo:{
    zIndex: 11,
  },
  formElement:{
    flexDirection: 'column',
    backgroundColor: 'rgba(196, 196, 196, 0.4)',
    height: 350,
    width: DEVICE_WIDTH - 60,
    borderRadius: 10,
    marginBottom: 5,
    fontSize: 20,
    textAlign:'center',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer:{

  },
  picker:{
    width: DEVICE_WIDTH - 60,
    borderRadius: 10,
    marginBottom: 50,
  },
});
