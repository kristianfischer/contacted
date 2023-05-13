// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);