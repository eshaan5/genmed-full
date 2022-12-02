// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from 'firebase/compat/app';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChJnDWZ_dblsyo-6knY1NxXW8H3FTwcbo",
  authDomain: "genmed-65616.firebaseapp.com",
  projectId: "genmed-65616",
  storageBucket: "genmed-65616.appspot.com",
  messagingSenderId: "433686007001",
  appId: "1:433686007001:web:c8839d5205186b242a02c8",
  measurementId: "G-S8CDZHQG9T"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth();
// export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();