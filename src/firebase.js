import firebase from 'firebase/app';
import 'firebase/database';


// Import the functions you need from the SDKs you need



// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBk6PBR2T4p4Q6cFPeA2fNV30slPw1YGjM",
  authDomain: "japan-travel-log-app.firebaseapp.com",
  databaseURL: "https://japan-travel-log-app-default-rtdb.firebaseio.com",
  projectId: "japan-travel-log-app",
  storageBucket: "japan-travel-log-app.appspot.com",
  messagingSenderId: "640671634265",
  appId: "1:640671634265:web:2960e7299f4a450c223248"

};


// Initialize Firebase

firebase.initializeApp(firebaseConfig);

export default firebase;