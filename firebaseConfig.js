// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence } from "firebase/auth/react-native"
import { getFirestore } from "firebase/firestore";
import { initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAupiCpZX_G-MfhharrkshGQIrzi3ti0Lk",
  authDomain: "contacted-1f3ad.firebaseapp.com",
  projectId: "contacted-1f3ad",
  storageBucket: "contacted-1f3ad.appspot.com",
  messagingSenderId: "1005730373512",
  appId: "1:1005730373512:web:3dc923e858e2ddd506e43d",
  measurementId: "G-684F4CFQNH"
};


const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

const db = getFirestore(app);