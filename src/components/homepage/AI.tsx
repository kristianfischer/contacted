import { Text, TouchableOpacity, TextInput, View } from 'react-native';
import React, { useState } from "react";
import { Octicons } from '@expo/vector-icons'; 
import { doc, setDoc, getDocs, collection, getFirestore } from "firebase/firestore";
import * as Clipboard from 'expo-clipboard';

const db = getFirestore();

const AI = () => {

    const [typedprompt, setTypedPrompt] = useState("")
    const [prompt, setPrompt] = useState("")
    const [response, setResponse] = useState("")

    const getMessage = async () => {
        const messageList = [];
        const querySnapshot = await getDocs(collection(db, "GeneratedMessages"));
        querySnapshot.forEach((doc) => {
            messageList.push(doc.data());
        });
        return messageList;
    };

    const retrieveMessage = async (first) => {
        try {
            const info = await getMessage();
            for (let i = 0; i < info.length; i++) {
                if (info[i].text == first)
                    setResponse(info[i].summary)
            }
            return info;

        } catch (error) {
            return []; 
        }
    };

    let aiphrase = "Draft a text message for this subject: "

    const addtobase = async () => {
        setResponse("")
        setPrompt(aiphrase.concat(typedprompt))
        try {
            const docRef = await setDoc(doc(db, "GeneratedMessages", prompt), {
                text: prompt,
                summary: "Error generating message. Please try again!"
            });

            
            setTimeout(await retrieveMessage, 3500, prompt);

                
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }
    

    return (
        <View className='w-full bg-white h-[27%]'>
            <Text className='pl-4 text-2xl pt-3 font-semibold'>Generate Message</Text>
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
                        onPress={() => { addtobase() }}>
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
                    onPress={() => { response != "" ? Clipboard.setString(response) : null }}
                    className="h-28 m-1 border-2 w-[80%] rounded-xl text-start pl-2 pt-2 bg-gray-100">
                    <Text className='text-gray-400'>
                        {response == "" ? "Your response will load here. \nTouch the message to copy!" : response}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default AI;