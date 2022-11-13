// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAnhKiro-heOjg6843y9J1TZ65twZwiQG8',
  authDomain: 'geotasks-fede4.firebaseapp.com',
  databaseURL: 'https://geotasks-fede4-default-rtdb.firebaseio.com',
  projectId: 'geotasks-fede4',
  storageBucket: 'geotasks-fede4.appspot.com',
  messagingSenderId: '521192654679',
  appId: '1:521192654679:web:7747a831d041026a062012',
  measurementId: 'G-24TPXNYMG9',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app),
  auth = getAuth(app)
