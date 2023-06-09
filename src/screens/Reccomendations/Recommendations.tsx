import { Text, TouchableOpacity, TextInput, View, Pressable, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from "react";
import { Octicons } from '@expo/vector-icons'; 
import { query, onSnapshot, doc, setDoc } from "firebase/firestore";
import * as Clipboard from 'expo-clipboard';
import { useKeyboard } from "@react-native-community/hooks"
import { getDocs, getDoc, collection, getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";

const Recommendations = ({ }) => {

    const db = getFirestore();
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("Your response will load here. Touch the message to copy!")
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

    
    const keyboard = useKeyboard();
    let aiphrase = "Draft a text message for this subject: "

    const addtobase = async (first) => {
        setResponse("")
        try {
            const docRef = await setDoc(doc(db, "GeneratedMessages", first), {
                text: first,
                summary: "Your response will load here. Touch the message to copy!" 
            });
                
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }


    const promptAI = (first) => {
        setPromptChanged(true);
        setTypedPrompt("");
        addtobase(aiphrase.concat(first));
        setPrompt(first);
    }


    return (
        <View className="h-full flex flex-1 justify-start w-full bg-custom pt-20">
            <View className='items-start pl-5'>
                <Text className='text-3xl text-white'>
                    Need Help Reaching Out?
                </Text>
                <Text className='text-md pl-3 pt-2 pb-4 text-white font-semibold pr-5'>
                    Press a subject and get a reccomended message to reach out with!
                </Text>
            </View>
            <View className='items-center'>
                <View className='w-[85%] h-20  rounded-md bg-white mb-3.5 items-center space-y-3'>
                    <View className='flex-row space-x-4 pt-1'>
                        <Pressable
                            disabled = {keyboard.keyboardShown ? true : false}
                            onPress={() => { promptAI("Professional First Contact") }}>
                            <Text className={prompt != "Professional First Contact" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>First Contact</Text>
                        </Pressable>
                        <Pressable onPress={() => { promptAI("Professional Thank You") }} disabled = {keyboard.keyboardShown ? true : false}>
                            <Text className={prompt != "Professional Thank You" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Thank You</Text>
                        </Pressable>
                        <Pressable onPress={() => { promptAI("Professional Event Invitation") }} disabled = {keyboard.keyboardShown ? true : false}>
                            <Text className={prompt != "Professional Event Invitation" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Event Invitation</Text>
                        </Pressable>
                    </View>
                    <View className='flex-row space-x-2'>
                        <Pressable onPress={() => { promptAI("Professional News Update") }} disabled = {keyboard.keyboardShown ? true : false}>
                            <Text className={prompt != "Professional News Update" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>News Update</Text>
                        </Pressable>
                        <Pressable onPress={() => { promptAI("Professional Reccomendation Request") }} disabled = {keyboard.keyboardShown ? true : false}>
                            <Text className={prompt != "Professional Reccomendation Request" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Reccomendation</Text>
                        </Pressable>
                        <Pressable onPress={() => { promptAI("Professional Collaboration Request") }} disabled = {keyboard.keyboardShown ? true : false}>
                            <Text className={prompt != "Professional Collaboration Request" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Collaboration</Text>
                        </Pressable>
                    </View>
                </View>
                <View className='w-[85%] h-20 bg-white rounded-md mb-3.5 items-center space-y-3'>
                    <View className='flex-row space-x-4 pt-1'>
                        <Pressable onPress={() => { promptAI("Friendly Catch Up") }} disabled = {keyboard.keyboardShown ? true : false}>
                            <Text className={prompt != "Friendly Catch Up" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Catch Up</Text>
                        </Pressable>
                        <Pressable onPress={() => { promptAI("Friendly Life Update") }} disabled = {keyboard.keyboardShown ? true : false}>
                            <Text className={prompt != "Friendly Life Update" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Life Update</Text>
                        </Pressable>
                        <Pressable onPress={() => { promptAI("Friendly Event Invitation") }} disabled = {keyboard.keyboardShown ? true : false}>
                            <Text className={prompt != "Friendly Event Invitation" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Event Invitation</Text>
                        </Pressable>
                    </View>
                    <View className='flex-row space-x-2'>
                        <Pressable onPress={() => { promptAI("Friendly Check In") }} disabled = {keyboard.keyboardShown ? true : false}>
                            <Text className={prompt != "Friendly Check In" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Check In</Text>
                        </Pressable>
                        <Pressable onPress={() => { promptAI("Friendly Appreciation") }} disabled = {keyboard.keyboardShown ? true : false}>
                            <Text className={prompt != "Friendly Appreciation" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Appreciation</Text>
                        </Pressable>
                        <Pressable onPress={() => { promptAI("Friendly Joke") }} disabled = {keyboard.keyboardShown ? true : false}>
                            <Text className={prompt != "Friendly Joke" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Joke</Text>
                        </Pressable>
                    </View>
                </View>
                <View className='w-[85%] h-20 bg-white rounded-md mb-1 items-center space-y-3'>
                    <View className='flex-row space-x-4 pt-1'>
                        <Pressable onPress={() => { promptAI("Family Personal Update") }} disabled = {keyboard.keyboardShown ? true : false}>
                            <Text className={prompt != "Family Personal Update" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Personal Update</Text>
                        </Pressable>
                        <Pressable onPress={() => { promptAI("Sharing Family News") }} disabled = {keyboard.keyboardShown ? true : false}>
                            <Text className={prompt != "Sharing Family News" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Family News</Text>
                        </Pressable>
                        <Pressable onPress={() => { promptAI("Family Providing Support") }} disabled = {keyboard.keyboardShown ? true : false}>
                            <Text className={prompt != "Family Providing Support" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Support</Text>
                        </Pressable>
                    </View>
                    <View className='flex-row space-x-2'>
                        <Pressable onPress={() => { promptAI("A Family Gathering") }} disabled = {keyboard.keyboardShown ? true : false}>
                            <Text className={prompt != "A Family Gathering" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Family Gathering</Text>
                        </Pressable>
                        <Pressable onPress={() => { promptAI("Family Check In") }} disabled = {keyboard.keyboardShown ? true : false}>
                            <Text className={prompt != "Family Check In" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Check In</Text>
                        </Pressable>
                        <Pressable onPress={() => { promptAI("Showing Family Gratitude") }} disabled = {keyboard.keyboardShown ? true : false}>
                            <Text className={prompt != "Showing Family Gratitude" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Gratitude</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View className='flex-row pl-4 ml-0.5'>
            <View className='flex-row pb-1'>
                    <View className=' w-[83%]'>
                        <TextInput
                            placeholder="i.e Hey mom!"
                            onChangeText={setTypedPrompt}
                            value={typedprompt}
                            className="h-10 text-start m-3 p-2 rounded-md bg-white">
                        </TextInput>
                    </View>
                    <TouchableOpacity className='pt-3 pl-2 ml-0.5'
                        onPress={() => { promptAI(typedprompt) }}>
                        <Octicons
                            name="arrow-right"
                            size={40}
                            color = "white">
                        </Octicons>
                    </TouchableOpacity>
                </View>
            </View>
            <Text className='text-md pl-8 text-white font-semibold pb-4 pr-2'>
                    Or, come up with your own! Type a subject to recieve a personal message for your contact.
                </Text>
            <View className='items-center'>
                <TouchableOpacity
                    onPress={() => { response != "" ? Clipboard.setString(response) : null }}
                    className="h-44  w-[85%] rounded-xl text-start p-2 bg-white">
                        {((response == "" || response == "Your response will load here. Touch the message to copy!") && promptChanged)?
                        <View className=''>
                            <Text className='text-gray-400'>Your response will load here. Touch the message to copy!</Text>   
                            <ActivityIndicator color="#000" size="small" className='pt-9'/>
                        </View> : <Text className={response == "Your response will load here. Touch the message to copy!" ? 'text-gray-400' : 'font-semibold'}>{response}</Text>}
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default Recommendations;