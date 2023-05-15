import React, { useState } from "react";
import { Text, SafeAreaView, TextInput, Button, Image } from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCjASomuifpgKwYpgOmXwuvDby-cBh_Wso",
    authDomain: "contacted-b203c.firebaseapp.com",
    projectId: "contacted-b203c",
    storageBucket: "contacted-b203c.appspot.com",
    messagingSenderId: "560930713469",
    appId: "1:560930713469:web:0f7c2c6dd8923a0a56a614",
    measurementId: "G-CSHHR0914L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const SignUp = async () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                console.log("hi");
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    const SignIn = async () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("success");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    return (
        <SafeAreaView>

            <Text
                className="text-6xl"
            >
                Login
            </Text>


            <TextInput
                id="email"
                className="w-full mt-1 border px-4 py-2 focus:border-gray-300"
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                style={{padding: 10}}   
            /> 
            
            <TextInput
                id="password"
                className="w-full mt-1 border px-4 py-2 focus:border-gray-300"
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                style={{padding: 10}}   
            /> 

            <Button
                title="Login"
                color="#f194ff"
                onPress={SignIn}
                />
                
            <Button
                title="Not a Member? Register Here"
                onPress={SignUp}
            />
        </SafeAreaView>
    );
};
    
export default Login;