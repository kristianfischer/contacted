import React, { useState, useEffect } from "react";
import { Text, View, Image, TextInput, Pressable, TouchableOpacity } from 'react-native';
import { getAuth, signInWithCredential, User, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import * as WebBrowser from 'expo-web-browser';
import { Octicons } from '@expo/vector-icons'; 
import * as Google from 'expo-auth-session/providers/google';
import planner from "../assets/planner.png";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { black, transparent, white } from "tailwindcss/colors";




WebBrowser.maybeCompleteAuthSession();


const Login = ({ setUser = (user: User) => { } }) => {

    const [ep, setEP] = useState(false);
    const [token, setToken] = useState("");
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "1005730373512-ip47uq1bstu3dsgjcqqbnoimfrj41atu.apps.googleusercontent.com",
        iosClientId: "1005730373512-1555aqcdaoeafuo77kcnm2v240um9gpf.apps.googleusercontent.com",
        expoClientId: "1005730373512-k978p07d5gsd24an9mj4s68frk9795e9.apps.googleusercontent.com"
    });

    useEffect(() => {
        if (response?.type === "success") {
            setToken(response.authentication.accessToken);
            getUserInfo();
        }
        }, [response, token]);
    
    const getUserInfo = async () => {
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                headers: { Authorization: `Bearer ${token}` },
                }
            );
        
            response.json().then(data => {
                const credential = GoogleAuthProvider.credential(null, token);
                SignIn(credential)
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const SignIn = (credential) => {
        const auth = getAuth();
        return signInWithCredential(auth, credential)
            .then((userCredential) => {
                setUser(userCredential.user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const SignUp = async () => {
        console.log("here")
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("done")
                setUser(userCredential.user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    const SignInE = async () => {
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
            })
            .catch((error) => {
                console.log(error.message)
            });
    }


    return (
    <View className="flex flex-1 justify-start w-full bg-custom">
            <View className="items-center mt-32">
                
                <Text className="text-white font-bold text-5xl">Contacted</Text>
            </View>
            <Text className="text-white text-5xl pt-20 pl-8">Sign In</Text>
            {!ep ? <Text className="text-white text-4xl pl-8">With Google</Text> : <Text className="text-white text-4xl pl-8">With Email</Text>}
            {!ep ? <View className="items-center pt-10 pl-1 h-40">
                <FontAwesome.Button name="google" color={white} backgroundColor={transparent} size={100} onPress={() => { promptAsync() }} />
            </View> : 
            <View className="pt-10 pl-16 h-40">
                <TextInput
                    id="email"
                    placeholder="Email"
                    placeholderTextColor={black}
                    onChangeText={setEmail}
                    value={email}
                    className="h-10 m-3 border bg-white p-2 w-60 rounded-md"
                />   
                <TextInput
                    id="password"
                    placeholder="Password"
                    placeholderTextColor={black}
                    onChangeText={setPassword}
                    value={password}
                    className="h-10 m-3 border p-2 w-60 bg-white rounded-md placeholder-gray-500"
                />
                    <View className="flex-row">
                        <Pressable onPress={() => { SignUp() }}><Text className="text-white font-semibold pt-1 pl-3">Register this account</Text></Pressable>
                        <TouchableOpacity className="pt-10 pl-16 mr-3"
                            onPress={() => { SignInE() }}>
                        <Octicons
                            name="arrow-right"
                            size={40}
                            color = {"white"}>      
                        </Octicons>
                            </TouchableOpacity>
                    </View>
            </View>
            }

            <Pressable className="items-center mt-32" onPress={() => { setEP(!ep) }}><Text className="text-white font-semibold">{!ep ? "Don't have a Google account?" : "Have a Google Account?"}</Text></Pressable>
        </View >
        
    
    );
};

export default Login;