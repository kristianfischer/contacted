import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity  } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


interface LoginProp {
    auth: firebase.auth.Auth;
}

const Login: React.FC<LoginProp> = ({ auth }) => {
        
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

    const SignUp = async () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("BOOYAH");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    const SignIn = async () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <input
                className="border border-gray-400 rounded-md p-2 w-full mb-4"
                type="email"
                placeholder="Email"
                value= {email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="border border-gray-400 rounded-md p-2 w-full mb-4"
                type="password"
                placeholder="Password"
                value= {password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={SignUp}
            >
                SignUp
            </button>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={SignIn}
            >
                SignIn
            </button>
            </div>
    );
}
    
export default Login;