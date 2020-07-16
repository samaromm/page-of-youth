import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: "page-of-youth.firebaseapp.com",
    databaseURL: "https://page-of-youth.firebaseio.com",
    projectId: "page-of-youth",
    storageBucket: "page-of-youth.appspot.com",
    messagingSenderId: "730834431173",
    appId: "1:730834431173:web:52964274e5c717d9cf54ac",
    measurementId: "G-L1WQSFCWJR"
}
// Initialize Firebase
firebase.initializeApp(config);
firebase.firestore();

export default firebase;