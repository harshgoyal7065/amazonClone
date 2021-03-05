// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyALZFgCzoDVeDY0xC4yj6x_Kw2e9NXGUEc",
    authDomain: "clone-91598.firebaseapp.com",
    projectId: "clone-91598",
    storageBucket: "clone-91598.appspot.com",
    messagingSenderId: "486980375190",
    appId: "1:486980375190:web:70ca21b80d505eaacf68b7",
    measurementId: "G-2EFJSLB1HS"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth = firebase.auth();

  export {db,auth};