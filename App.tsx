import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Login from "./src/Login";
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCjASomuifpgKwYpgOmXwuvDby-cBh_Wso",
    authDomain: "contacted-b203c.firebaseapp.com",
    projectId: "contacted-b203c",
    storageBucket: "contacted-b203c.appspot.com",
    messagingSenderId: "560930713469",
    appId: "1:560930713469:web:0f7c2c6dd8923a0a56a614",
    measurementId: "G-CSHHR0914L"
    };

firebase.initializeApp(firebaseConfig);
const auth = getAuth();


export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Login auth={auth} />
    </View>
  );
}