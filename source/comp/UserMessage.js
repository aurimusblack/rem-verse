'use strict';
import Dimensions from 'Dimensions';

import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import {Actions} from 'react-native-router-flux';
import firebase from './firebase';
import Communications from 'react-native-communications';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.cardsContainer}>
      <View>
        <Text style={styles.texts}>Contact for item</Text>
      </View>
      <View style={styles.card}>
        <Image style={styles.thumbnail} source={{uri: 'https://96x3me6wq9-flywheel.netdna-ssl.com/wp-content/uploads/2016/09/como-criar-um-perfil-no-facebook-guia-para-iniciantes-700x410.jpg' }} />
        <Text style={styles.text}>{this.props.mobilenumber}</Text>
        <Text style={styles.text}>{this.props.search}</Text>
      </View>
      </View>
    )
  }
}

class NoMoreCards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={styles.noMoreCards}>No more Contacts</Text>
      </View>
    )
  }
}

let cards = [
  {address: 'bh', mobilenumber: '7894566665', search:'hey', uname:'admin'},
]


export default class UserMessage extends React.Component {

  state = {
    cardss: cards,
    outOfCards: false,
    category: 'none',
    email: this.props.uname,
    address: '',
    buname: '',
    search: this.props.search,
  }
  constructor(props) {
    super(props);



    firebase.database().ref('messagesDB/').once("value",(snapshot) =>{
      let x = snapshot.val()
      let y = []
      var keys = Object.keys(x)
      let j
      for (j = 0; j < keys.length; j++) {
        if(this.state.email == x[keys[j]].uname){
        y.push(x[keys[j]])
        console.log(y)
      }
      }
      console.log(y)
      this.setState({cardss: y})
    }).then(() =>{
      console.log("yeah")
    }).catch((error) =>{
      console.log("No")
    })
}
  handleYup (card) {
    Communications.phonecall(card.mobilenumber, true);
    console.log("yes")
  }

  handleNope (card) {
    console.log("no")
  }


  render() {
    return (
      <SwipeCards
        cards={this.state.cardss}
        loop={false}

        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={true}
        showNope={true}

        handleYup={this.handleYup.bind(this)}
        handleNope={this.handleNope}

      />
    )
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 1,
    justifyContent: 'center',
    width: DEVICE_WIDTH - 80,
    height: 380,
    borderRadius: 20,

  },
  cardsContainer:{
    flex:1,
  },
  thumbnail: {
    width: 100,
    height: 100,
    margin: 20,
    marginTop: 0,
    borderRadius: 150,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    paddingTop: 15,
    paddingBottom: 10,
    textAlign: 'center',
    color: 'black',
  },
  texts: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    margin: 20,
    marginBottom: 40,
  },
  noMoreCards: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
  }
})
