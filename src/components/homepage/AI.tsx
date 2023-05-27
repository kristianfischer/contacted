import { Text, TouchableOpacity, TextInput, View, Pressable, Image } from 'react-native';
import React, { useState } from "react";
import { Octicons } from '@expo/vector-icons'; 
import { collection, addDoc, getFirestore } from "firebase/firestore";

const db = getFirestore();

const AI = () => {

    const addtobase = async (first) => {
        try {
            // const docRef = await addDoc(collection(db, "Generated Messages"), {
            //     message: first
            // });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const [typedprompt, setTypedPrompt] = useState("")

    return (
        <View className='w-full bg-white h-full pt-4'>
            <View className='flex-row pl-20'>
                <View className='flex-row'>
                    <View className='pt-4'>
                        <Octicons
                            name="dependabot"
                            size={35}
                            color = "black">
                        </Octicons>
                    </View>
                    <View className='pl-1 w-[70%]'>
                        <TextInput
                            placeholder="i.e Hey mom!"
                            onChangeText={setTypedPrompt}
                            value={typedprompt}
                            className="h-10 text-start m-3 border-2 p-2 rounded-md">
                        </TextInput>
                    </View>
                    <TouchableOpacity className='pt-5'
                        onPress={() => { addtobase(typedprompt) }}>
                        <Octicons
                            name="check-circle"
                            size={25}
                            color = "black">
                        </Octicons>
                    </TouchableOpacity>
                </View>
            </View>
            <View className='items-center'>
                <TouchableOpacity
                    className="h-40 m-1 border-2 w-fit rounded-xl text-start pl-2 pt-2 bg-gray-100">
                    <Text className='text-gray-400'>
                        Your response will load here. Touch the message to copy!
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default AI;