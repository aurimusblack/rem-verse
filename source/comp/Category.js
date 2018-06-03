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
import firebase from './firebase';


export default class Category extends Component<>{
  state = {
    type: '',
    email: this.props.uname,
    password: this.props.pwd,
  }
  switchUI(){
    console.log(this.state.type);
    if(this.state.type == 't'){
      var ind = this.state.email.indexOf('@')
      var newunam = this.state.email.slice(0,ind)
      firebase.database().ref('auth/'+newunam).set(
        {
          uname: this.state.email,
          pwd: this.state.password,
          cat: 'Seller'
        }).then(()=>{Actions.SellerForm({uname: this.state.email, pwd: this.state.password})}).catch((error)=>{
          console.log(error)
        });

    }
    else{
      var ind = this.state.email.indexOf('@')
      var newunam = this.state.email.slice(0,ind)
      firebase.database().ref('auth/'+newunam).set(
        {
          uname: this.state.email,
          pwd: this.state.password,
          cat: 'User'
        })
      Alert.alert('Registration Successful')
      Actions.Login()
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text>
           <Image style={styles.logo} source={require('../images/image.png')} />
          </Text>
        </View>
        <View style={styles.formContainer}>
            <Picker style = {styles.picker}
              selectedValue = {this.state.type}
              onValueChange={(itemValue, itemIndex) => this.setState({type: itemValue})}>
              <Picker.Item label="User Type" value="none" />
              <Picker.Item label="Seller" value="t" />
              <Picker.Item label="User" value="f" />
            </Picker>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => this.switchUI()}>
            <Text style={styles.button}>
             SignUp
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
    zIndex: 11,
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
    width: DEVICE_WIDTH - 100,
    borderRadius: 30,
    color: 'white',
    marginBottom: 50,
    textAlignVertical: 'center',
    zIndex: 11,

  },
  formContainer:{
    flex: 1,
    width: DEVICE_WIDTH - 60,
    height: 45,
  },
  picker:{
    flex: 1,
    width: DEVICE_WIDTH - 60,
    borderRadius: 10,
    marginBottom: 50,
  }

});
