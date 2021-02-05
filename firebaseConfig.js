import firebase from 'firebase';
require('@firebase/firestore');

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCu5AjwQ-tfv_sKroiBN4mlmMCtWb5oXgA",
    authDomain: "advanced-trex-game-1.firebaseapp.com",
    databaseURL: "https://advanced-trex-game-1.firebaseio.com",
    projectId: "advanced-trex-game-1",
    storageBucket: "advanced-trex-game-1.appspot.com",
    messagingSenderId: "869261029098",
    appId: "1:869261029098:web:23c937e8feafa5b8327193"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();