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
  ScrollView
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import firebase from './firebase';


export default class SellerForm extends Component<>{

  state = {
    category: 'none',
    email: this.props.uname,
    address: '',
    password: this.props.pwd,
    mobilenumber: ''
  }

  storeSellerData(){
      var ind = this.state.email.indexOf('@')
      var newuname = this.state.email.slice(0,ind)
      firebase.database().ref('sellerDB/'+newuname).set(
        {
          uname: this.state.email,
          category: this.state.category,
          address: this.state.address,
          mobilenumber: this.state.mobilenumber,
        })
      Actions.Login()
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
          <View>

            <TextInput style = {styles.formNumber}
               underlineColorAndroid = "transparent"
               placeholder = "MobileNumber"
               autoCapitalize = "none"
               onChangeText={mobilenumber =>this.setState({mobilenumber})}
               value ={this.state.mobilenumber}/>

          </View>
        </View>
        <View style={styles.formContainer}>
          <View>

            <TextInput style = {styles.formElement}
               underlineColorAndroid = "transparent"
               placeholder = "Address"
               autoCapitalize = "none"
               onChangeText={address =>this.setState({address})}
               value ={this.state.address}/>

               <Picker
                selectedValue = {this.state.category}
                onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}>
                <Picker.Item label="Select Category" value="none" />
                <Picker.Item label="Electronics" value="Electronics" />
                <Picker.Item label="Instruments" value="Instruments" />
                <Picker.Item label="Antiques" value="Antiques" />
                <Picker.Item label="Furniture" value="Furniture" />
                <Picker.Item label="Others" value="Others" />
               </Picker>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => this.storeSellerData()}>
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
  formNumber:{
    flexDirection: 'row',
    backgroundColor: 'rgba(196, 196, 196, 0.2)',
    height: 50,
    width: DEVICE_WIDTH - 60,
    borderRadius: 10,
    marginBottom: 5,
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop:50,
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
    marginTop:70,
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
  formElement:{
    flexDirection: 'row',
    backgroundColor: 'rgba(196, 196, 196, 0.2)',
    height: 50,
    width: DEVICE_WIDTH - 60,
    borderRadius: 10,
    marginBottom: 5,
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',

  },
  formContainer:{
    marginTop:10,

  },
  picker:{
    width: DEVICE_WIDTH - 60,
    borderRadius: 10,
    marginBottom: 50,
  }

});
