import React, { useState } from "react";
import { Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
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

            <Text style = {styles.Titletext}>Login</Text>

            <TextInput
                id="email"
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                style={styles.input}  
            />

            <TextInput
                style={styles.input}
                id="password"
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
            />

            <TouchableOpacity style={styles.button} onPress={SignIn}>
                <Text> Login </Text>
            </TouchableOpacity>
                
            <Pressable
                onPress={() => {SignUp}}>
                <Text style={styles.text}>{"Not a Member? Register Here"}</Text>
            </Pressable>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    Titletext: {
        alignSelf: 'center',
        fontSize: 60,
        color: 'black'
    },
    text: {
        fontSize: 16,
        color: 'blue'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
    countContainer: {
        alignItems: 'center',
        padding: 10,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    });
    
export default Login;