import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4HXTwVBpKBJVmwzrrV2tJnqzg_uoCgR8",
  authDomain: "jsound-b63bd.firebaseapp.com",
  databaseURL:
    "https://jsound-b63bd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "jsound-b63bd",
  storageBucket: "jsound-b63bd.appspot.com",
  messagingSenderId: "72847788604",
  appId: "1:72847788604:web:2da43bbb089e2d3bac9139",
  measurementId: "G-WX1340V3Z3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
//const db = firebase.firestore();
export const db = getFirestore(app);
