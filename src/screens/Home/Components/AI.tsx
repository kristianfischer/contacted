import { Text, TouchableOpacity, TextInput, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from "react";
import { Octicons } from '@expo/vector-icons'; 
import { doc, setDoc, getDocs, collection, getFirestore, query, onSnapshot } from "firebase/firestore";
import * as Clipboard from 'expo-clipboard';

const db = getFirestore();

const AI = () => {

    const db = getFirestore();
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("This feature is not yet available!")
    const [promptChanged, setPromptChanged] = useState(false);

    useEffect(() => {
        if (promptChanged) {
            const docRef = doc(db, "GeneratedMessages", aiphrase.concat(prompt));
            const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    setResponse(data.summary)
                } else {
                    console.log("Error finding document")
                }
            });
            return () => {
                unsubscribe();
            };
        }
    }, [prompt]);

    
    const [typedprompt, setTypedPrompt] = useState("");

    
    let aiphrase = "Draft a text message for this subject: "

    const addtobase = async (first) => {
        setPromptChanged(true);
        setTypedPrompt("");
        setResponse("")
        try {
            const docRef = await setDoc(doc(db, "GeneratedMessages", first), {
                text: first,
                summary: "Your response will load here. Touch the message to copy!" 
            });
                
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setPrompt(first);
    }
    

    return (
        <View className='w-full bg-white h-[27%]'>
            <Text className='pl-4 text-2xl pt-3 font-semibold text-custom'>Generate Message</Text>
            <View className='flex-row pb-1'>
                <View className=' w-[83%]'>
                    <TextInput
                        placeholder="i.e Hey mom!"
                        placeholderTextColor={"white"}
                        onChangeText={setTypedPrompt}
                        value={typedprompt}
                        className="h-10 text-start m-3 p-2 rounded-md bg-custom text-white">
                    </TextInput>
                </View>
                <TouchableOpacity className='pt-3 pl-2 ml-0.5'
                    >
                    <Octicons
                        name="arrow-right"
                        size={40}
                        color = "#008080">
                    </Octicons>
                </TouchableOpacity>
            </View>
            <View className='items-center'>
                <TouchableOpacity
                    onPress={() => { response != "" ? Clipboard.setString(response) : null }}
                    className="h-28  w-[85%] rounded-xl text-start p-2 bg-custom">
                        {((response == "" || response == "Your response will load here. Touch the message to copy!") && promptChanged)?
                        <View className=''>
                            <Text className='text-gray-400'>Your response will load here. Touch the message to copy!</Text>   
                            <ActivityIndicator color="#000" size="small" className='pt-9'/>
                        </View> : <Text className={response == "This feature is not yet available!" ? 'text-white text-center pt-10' : 'font-semibold'}>{response}</Text>}
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default AI;

//onPress={() => { addtobase(aiphrase.concat(typedprompt)) }}