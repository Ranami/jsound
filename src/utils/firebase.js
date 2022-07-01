// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4HXTwVBpKBJVmwzrrV2tJnqzg_uoCgR8",
  authDomain: "jsound-b63bd.firebaseapp.com",
  databaseURL: "https://jsound-b63bd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "jsound-b63bd",
  storageBucket: "jsound-b63bd.appspot.com",
  messagingSenderId: "72847788604",
  appId: "1:72847788604:web:2da43bbb089e2d3bac9139",
  measurementId: "G-WX1340V3Z3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);