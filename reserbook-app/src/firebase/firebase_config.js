import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

export const firebaseConfig = {
    apiKey: "AIzaSyA3Vxj1JZn--1B-gTNLcsvfGOkTmsGPayI",
    authDomain: "book-reserve.firebaseapp.com",
    projectId: "book-reserve",
    storageBucket: "book-reserve.appspot.com",
    messagingSenderId: "1074247817191",
    appId: "1:1074247817191:web:1bea5c676dcf339fcdcf42"
};
  
initializeApp(firebaseConfig)

export const db = getFirestore();