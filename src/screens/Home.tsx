import { Text, Pressable, View } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import React, { useState } from "react";
import { useUser } from '../providers/UserProvider';

const Home = ({ }) => {


    const SignOut = async () => {
        const auth = getAuth();
        signOut(auth)
    }

    return (
        <View className="h-full flex flex-1 items-end justify-start w-full">
            <Pressable onPress={() => {
                SignOut()
            }}>
                <Text className = 'p-16 px-9 text-base text-blue-400 justify-end'> Sign Out</Text>
            </Pressable>
        </View>
    );
};
export default Home;