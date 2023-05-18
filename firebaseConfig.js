// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence } from "firebase/auth/react-native"
import { getAnalytics } from "firebase/analytics";
import { initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCjASomuifpgKwYpgOmXwuvDby-cBh_Wso",
  authDomain: "contacted-b203c.firebaseapp.com",
  projectId: "contacted-b203c",
  storageBucket: "contacted-b203c.appspot.com",
  messagingSenderId: "560930713469",
  appId: "1:560930713469:web:0f7c2c6dd8923a0a56a614",
  measurementId: "G-CSHHR0914L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})