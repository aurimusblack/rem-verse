import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Picker,
} from 'react-native';
import firebase from './firebase';
import {Actions} from 'react-native-router-flux';


export default class Login extends React.Component<Props> {

  state = {
    email: '',
    password: '',
    auth: false,
    user: '',
    type:''
  }


  onLogIn(){
    var ind = this.state.email.indexOf('@')
    var newuname = this.state.email.slice(0,ind)
    firebase.database().ref('auth/'+newuname).once("value", (snapshot) =>{
      this.setState({type: snapshot.toJSON().cat})
    }).then(() =>{
      if(this.state.type=='Seller'){
        Actions.SwipeCards({uname:this.state.email})
        console.log('loggedin')

      }
      else{
        Actions.UserInterface({uname:this.state.email});
        console.log('loggedin')
      }
    }).catch((error) =>{
      console.log("noooo")
    });
    }
    onRegister(){
      firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
      .then(()=>{
          Actions.Category({uname:this.state.email,pwd:this.state.password});
          Alert('registered');
          console.log('registered');
        })
      .catch((error)=>{
        console.log(error)
      });
      }

  renderCurrentState(){
    if(this.state.auth){
      return(
      <View>
        <ActivityIndicator size='large'/>
      </View>
    );
    }
    else{
    return(
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text>
           <Image style={styles.logo} source={require('../images/image.png')} />
          </Text>
        </View>
        <View style={styles.formContainer}>
          <View>
              <TextInput style = {styles.formElement}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               autoCapitalize = "none"
               onChangeText={email =>this.setState({email})}
               value ={this.state.email}/>

            <TextInput style = {styles.formElement}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               secureTextEntry
               autoCapitalize = "none"
               onChangeText={password =>this.setState({password})}
               value ={this.state.password}/>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={()=>this.onLogIn()}>
            <Text style={styles.button}>
             Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.onRegister()}>
            <Text style={styles.button}>
             SignUp
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
    }
  render(){
    return(
      <View style={styles.container}>
        {this.renderCurrentState()}
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
    flexDirection: 'row',
  },
  button:{
    fontFamily: 'gotham rounded',
    backgroundColor: '#2590B6',
    textAlign: 'center',
    fontSize: 20,
    alignItems: 'center',
    height: 45,
    width: 120,
    borderRadius: 30,
    color: 'white',
    textAlignVertical: 'center',
    marginRight: 5,
    marginBottom: 35,

  },
  formElement:{
    flexDirection: 'row',
    backgroundColor: 'rgba(196, 196, 196, 0.4)',
    height: 50,
    width: DEVICE_WIDTH - 60,
    borderRadius: 10,
    marginBottom: 5,
    fontSize: 20,

  },
  formContainer:{
    marginTop:35,

  }

});
