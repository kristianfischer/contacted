import { Text, TouchableOpacity, TextInput, View, Pressable } from 'react-native';
import React, { useState } from "react";
import { Octicons } from '@expo/vector-icons'; 
import { DocumentSnapshot, doc, setDoc } from "firebase/firestore";
import * as Clipboard from 'expo-clipboard';
import { useKeyboard } from "@react-native-community/hooks"
import { getDocs, collection, getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";

const Recommendations = ({ }) => {

    const db = getFirestore();

    
    const [typedprompt, setTypedPrompt] = useState("");
    const [response, setResponse] = useState("")
    const [prompt, setPrompt] = useState("");

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

    const keyboard = useKeyboard();
    let aiphrase = "Draft a text message for this subject: "

    const addtobase = async (first) => {
        setResponse("")
        try {
            const docRef = await setDoc(doc(db, "GeneratedMessages", first), {
                text: first,
                summary: "Error generating message. Please try again!"
            });

            
            setTimeout(await retrieveMessage, 3500, first);


                
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }


    const promptAI = (first) => {
        let newwordbool;
        let newword = "";
        setPrompt(first);
        setTypedPrompt("");
        addtobase(aiphrase.concat(first));
    }


    return (
        <View className="h-full flex flex-1 justify-start w-full bg-white pt-20">
            <View className='items-start pl-5'>
                <Text className='text-3xl'>
                    Need Help Reaching Out?
                </Text>
                <Text className='text-md pl-3 pt-2 pb-4'>
                    Press a subject and get a reccomended message to reach out with!
                </Text>
            </View>
            <View className='items-center'>
                <View className='w-[85%] h-20 border-2 bg-gray-100 border-dashed border-gray-600 rounded-sm mb-4 items-center space-y-3'>
                    <View className='flex-row space-x-4'>
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
                <View className='w-[85%] h-20 border-2 bg-gray-100 border-dashed border-gray-600 rounded-sm mb-4 items-center space-y-3'>
                    <View className='flex-row space-x-4'>
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
                <View className='w-[85%] h-20 border-2 border-dashed border-gray-600 bg-gray-100 rounded-sm mb-4 items-center space-y-3'>
                    <View className='flex-row space-x-4'>
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
                <Text className='text-md pl-3'>
                    Or, come up with your own! Type a subject below to recieve a personal message for your contact.
                </Text>
            </View>
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
                        onPress={() => { promptAI(typedprompt) }}>
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
                    className="h-44 m-1 border-2 w-[80%] rounded-xl text-start pl-2 pt-2 bg-gray-100">
                    <Text>
                        {response == ""? "Your response will load here. \nTouch the message to copy!" : response}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default Recommendations;