import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyDJbPFl5QAGReWtLVzzMBb98mnQJSeIHh8",
  authDomain: "remverse.firebaseapp.com",
  databaseURL: "https://remverse.firebaseio.com",
  projectId: "remverse",
  storageBucket: "remverse.appspot.com",
  messagingSenderId: "578917406138"

}

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
