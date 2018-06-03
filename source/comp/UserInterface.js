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


export default class UserInterface extends Component{
  state = {
    email: this.props.uname,
    category: '',
    image: '',
    search: '',
  }

    SwipeCards(){
      firebase.database().ref('searchesDB/'+this.state.search).set(
        {
          category: this.state.category,
          search: this.state.search,
          image: this.state.image,
          uname: this.state.email
        })
        .then(() => {
          Alert.alert('Search Submitted')
        }).catch((error) => {
          console.log(error)
        })
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
              <TextInput style = {styles.formElement}
               underlineColorAndroid = "transparent"
               placeholder = "Search"
               autoCapitalize = "none"
               onChangeText={search =>this.setState({search})}
               value = {this.state.search} />
               <TextInput style = {styles.formElement1}
                underlineColorAndroid = "transparent"
                placeholder = "ImageURL"
                autoCapitalize = "none"
                onChangeText={image =>this.setState({image})}
                value = {this.state.image} />
               <Picker
                style = {styles.picker}
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
          <TouchableOpacity>
            <Text style={styles.button} onPress={() => this.SwipeCards()}>
             Search
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.mImageContainer} onPress={() => Actions.UserMessage({uname: this.state.email,search:this.state.search})}>
          <Image style={styles.mImage} source={require('../images/mail.png')}>
          </Image>
        </TouchableOpacity>
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
      marginTop:10,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop:10,
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
  formElement:{
    flexDirection: 'row',
    backgroundColor: 'rgba(196, 196, 196, 0.4)',
    height: 50,
    width: DEVICE_WIDTH - 60,
    borderRadius: 10,
    marginBottom: 5,
    fontSize: 20,
    marginTop: 60,

  },
  formElement1:{
    flexDirection: 'row',
    backgroundColor: 'rgba(196, 196, 196, 0.4)',
    height: 50,
    width: DEVICE_WIDTH - 60,
    borderRadius: 10,
    marginBottom: 5,
    fontSize: 20,
    marginTop: 0,

  },
  formContainer:{

  },
  picker:{
    width: DEVICE_WIDTH - 60,
    borderRadius: 10,
    marginBottom: 25,
  },
  mImageContainer:{
    width: 50,
    height: 50,
    backgroundColor: '#2590B6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    alignSelf: 'flex-end',
    margin: 15,
  },
  mImage:{
    width: 30,
    height: 30,
  },
  mImagenotif:{
    height: 20,
    width: 20,
    zIndex: 11,
    alignSelf: 'flex-end',
    right:18,
    top: 45,
  },
});
