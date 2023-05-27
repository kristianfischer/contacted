import { Text, TouchableOpacity, TextInput, View, Pressable, Image } from 'react-native';
import React, { useState } from "react";
import { Octicons } from '@expo/vector-icons'; 
import { collection, addDoc, getFirestore } from "firebase/firestore";


const Recommendations = ({ }) => {

    const db = getFirestore();

    const [prompt, setPrompt] = useState("");
    const [promptshown, setPromptshown] = useState("");
    const [typedprompt, setTypedPrompt] = useState("");
    const [typedbool, setTypedBool] = useState(false);


    const addtobase = async (first) => {
        try {
            const docRef = await addDoc(collection(db, "Generated Messages"), {
                message: first
            });
            console.log("done")
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    const promptAI = (first) => {

        let newwordbool;
        let newword = "";
        setPrompt(first);
        setTypedPrompt("");
        setTypedBool(false);

        for (let i = 0; i < first.length - 1; i++) {
            if (first[i] == " ") {
                newwordbool = true;
            }
            if (newwordbool) {
                newword = newword + first[i+1];
            }
        }
        setPromptshown(newword);
        //addtobase(prompt);
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
                            onPress={() => { promptAI("Professional First Contact Message") }}>
                            <Text className={prompt != "Professional First Contact Message" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>First Contact</Text>
                        </Pressable>
                        <Pressable onPress={() => { promptAI("Professional Thank You Message") }}>
                            <Text className={prompt != "Professional Thank You Message" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Thank You</Text>
                        </Pressable>
                        <Pressable onPress={() => { promptAI("Professional Event Invitation Message") }}>
                            <Text className={prompt != "Professional Event Invitation Message" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Event Invitation</Text>
                        </Pressable>
                    </View>
                    <View className='flex-row space-x-2'>
                        <Pressable onPress={() => { promptAI("Professional News Update Message") }}>
                            <Text className={prompt != "Professional News Update Message" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>News Update</Text>
                        </Pressable>
                        <Pressable onPress={() => { promptAI("Professional Reccomendation Request Message") }}>
                            <Text className={prompt != "Professional Reccomendation Request Message" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Reccomendation</Text>
                        </Pressable>
                        <Pressable onPress={() => { promptAI("Professional Collaboration Request Message") }}>
                            <Text className={prompt != "Professional Collaboration Request Message" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Collaboration</Text>
                        </Pressable>
                    </View>
                </View>
                <View className='w-[85%] h-20 border-2 bg-gray-100 border-dashed border-gray-600 rounded-sm mb-4 items-center space-y-3'>
                    <View className='flex-row space-x-4'>
                        <Pressable onPress={() => { promptAI("Friendly Catch Up Message") }}>
                            <Text className={prompt != "Friendly Catch Up Message" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Catch Up</Text>
                        </Pressable>
                        <Pressable onPress={() => { promptAI("Friendly Life Update Message") }}>
                            <Text className={prompt != "Friendly Life Update Message" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Life Update</Text>
                        </Pressable>
                        <Pressable onPress={() => { promptAI("Friendly Event Invitation Message") }}>
                            <Text className={prompt != "Friendly Event Invitation Message" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Event Invitation</Text>
                        </Pressable>
                    </View>
                    <View className='flex-row space-x-2'>
                        <Pressable onPress={() => { promptAI("Friendly Check In Message") }}>
                            <Text className={prompt != "Friendly Check In Message" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Check In</Text>
                        </Pressable>
                        <Pressable onPress={() => { promptAI("Friendly Appreciation Message") }}>
                            <Text className={prompt != "Friendly Appreciation Message" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Appreciation</Text>
                        </Pressable>
                        <Pressable onPress={() => { promptAI("Friendly Joke Message") }}>
                            <Text className={prompt != "Friendly Joke Message" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Joke</Text>
                        </Pressable>
                    </View>
                </View>
                <View className='w-[85%] h-20 border-2 border-dashed border-gray-600 bg-gray-100 rounded-sm mb-4 items-center space-y-3'>
                    <View className='flex-row space-x-4'>
                        <Pressable onPress={() => { promptAI("Family Personal Update Message") }}>
                            <Text className={prompt != "Family Personal Update Message" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Personal Update</Text>
                        </Pressable>
                        <Pressable onPress={() => { promptAI("Message Sharing Family News") }}>
                            <Text className={prompt != "Message Sharing Family News" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Family News</Text>
                        </Pressable>
                        <Pressable onPress={() => { promptAI("Family Providing Support Message") }}>
                            <Text className={prompt != "Family Providing Support Message" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Support</Text>
                        </Pressable>
                    </View>
                    <View className='flex-row space-x-2'>
                        <Pressable onPress={() => { promptAI("A Family Gathering Message") }}>
                            <Text className={prompt != "A Family Gathering Message" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Family Gathering</Text>
                        </Pressable>
                        <Pressable onPress={() => { promptAI("Family Check In Message") }}>
                            <Text className={prompt != "Family Check In Message" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Check In</Text>
                        </Pressable>
                        <Pressable onPress={() => { promptAI("Message Showing Family Gratitude") }}>
                            <Text className={prompt != "Message Showing Family Gratitude" ? 'text-gray-400 pt-2' : 'text-black pt-2'}>Gratitude</Text>
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
                    <View className='pl-1 w-full'>
                        <TextInput
                            placeholder="i.e Hey mom!"
                            onChangeText={setTypedPrompt}
                            value={typedprompt}
                            className="h-10 w-[50%] text-start m-3 border-2 p-2 rounded-md">
                        </TextInput>
                    </View>
                </View>
            </View>
            <View className='items-center'>
                <TouchableOpacity
                    className="h-44 m-1 border-2 w-fit rounded-xl text-start pl-2 pt-2 bg-gray-100">
                    <Text className='text-gray-400'>
                        Your response will load here. Touch the message to copy!
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default Recommendations;