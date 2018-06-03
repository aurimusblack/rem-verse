'use strict';
import Dimensions from 'Dimensions';

import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import {Actions} from 'react-native-router-flux';
import firebase from './firebase';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View style={styles.cardsContainer}>
      <View>
        <Text style={styles.texts}>Do You Have</Text>
      </View>
      <View style={styles.card}>
        <Image style={styles.thumbnail} source={{uri: this.props.image}} />
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
        <Text style={styles.noMoreCards}>No more Searches</Text>
      </View>
    )
  }
}

let cards = [
  {uname:'admin', category: 'Others', image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif', search: 'sample'  }
]


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: cards,
      outOfCards: false,
      category: 'none',
      email: this.props.uname,
      address: '',
      buname: '',
      mobilenumber:'',
    }
    var ind = this.state.email.indexOf('@')
    var newuname = this.state.email.slice(0,ind)
    firebase.database().ref('sellerDB/'+newuname).once("value", (snapshot) =>{
      this.setState({address: snapshot.toJSON().address})
      this.setState({category: snapshot.toJSON().category})
      this.setState({mobilenumber: snapshot.toJSON().mobilenumber})
    }).then(() =>{
      console.log("yessss")
      console.log(this.state.address)
    }).catch((error) =>{
      console.log("noooo")
    })
    firebase.database().ref('searchesDB/').once("value",(snapshot) =>{
      let x = snapshot.val()
      let y = []
      var keys = Object.keys(x)
      let j
      for (j = 0; j < keys.length; j++) {
        if(this.state.category == x[keys[j]].category){
        y.push(x[keys[j]])
      }
      }
      console.log(y)
      this.setState({cards: y})
    }).then(() =>{
      console.log("yeah")
    }).catch((error) =>{
      console.log("No")
    })

}
  handleYup (card) {

    firebase.database().ref('messagesDB/'+card.search).set({
      address: this.state.address,
      uname: card.uname,
      mobilenumber:this.state.mobilenumber,
      search: card.search,
    }).then(() =>{
      console.log("address written")
    }).catch((error) =>{
      console.log(error)
    })
  }

  handleNope (card) {
    console.log("no")
  }


  render() {
    return (
      <SwipeCards
        cards={this.state.cards}
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
    width: DEVICE_WIDTH - 100,
    height: 320,
    borderRadius: 20,

  },
  cardsContainer:{
    flex:1,
  },
  thumbnail: {
    width: DEVICE_WIDTH - 140,
    height: 200,
    margin: 20,
    marginTop: 0,
    marginBottom: 30,
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
