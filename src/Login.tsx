import React, { useState } from "react";
import { Text, SafeAreaView, TextInput, TouchableOpacity, Pressable, View } from 'react-native';
import { getAuth, signInWithEmailAndPassword, User, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, doc, setDoc, getFirestore } from "firebase/firestore";




const Login = ({ setUser = (user: User) => { } }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const db = getFirestore();


    const SignUp = async () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                try {
                    const docRef = setDoc(doc(db, "Users", userCredential.user.uid), {
                        email: email,
                        password: password,
                        id: userCredential.user.uid
                    });  
                } catch (e) {
                console.error("Error adding document: ", e);
            }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    const SignIn = async () => {
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (
        <SafeAreaView className="flex flex-1 items-center justify-start w-full space-y-16">

            <Text className="pt-16 text-6xl">Login</Text>
            
            <View className="w-[50%] space-y-8">
                <TextInput
                    id="email"
                    placeholder="Email"
                    onChangeText={setEmail}
                    value={email}
                    className="h-10 m-3 border-2 p-2 w-fit"
                />   
                <TextInput
                    id="password"
                    placeholder="Password"
                    onChangeText={setPassword}
                    value={password}
                    className="h-10 m-3 border-2 p-2 w-fit"
                />
            </View>

            <TouchableOpacity className="p-3 items-center justify-center bg-blue-400" onPress={SignIn}>
                <Text className="p-2 px-4 text-white"> Login </Text>
            </TouchableOpacity>
                
            <Pressable
                className="h-40 m-12 border-1 p-2"
                onPress={() => { SignUp() }}>
                <Text className="p-16 text-blue-400">Not a Member? Register Here</Text>
            </Pressable>

        </SafeAreaView>
    );
};

export default Login;