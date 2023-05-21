import { Text, TextInput, View, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from "react";
import { Zocial } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';


const InformationCard = ({ }) => {

    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [insta, setInsta] = useState("");
    const [snap, setSnap] = useState("");

    return (
        <View className='flex-col w-full space-y-5 px-10'>
            <View className='flex-row space-x-12 pt-3 pl-5'>
                <Octicons
                    name="comment-discussion"
                    size={22}
                    color="black"
                >
                </Octicons>
                <TextInput
                    className='w-[60%] border-b-2 h-7 pb-2 text-start'
                    onChangeText={setNumber}
                    value={number}
                    placeholder="Phone Number"
                    keyboardType="numeric"
                >
                </TextInput>
            </View>
            <View className='flex-row space-x-12 pl-5'>
                <Octicons
                    name="mention"
                    size={22}
                    color="black"
                >
                </Octicons>
                <TextInput
                    className='w-[60%] border-b-2 h-7 pb-2 text-start'
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                >
                </TextInput>
            </View>
            <View className='flex-row space-x-12 pl-5'>
                <Zocial
                    className=''
                    name="instagram"
                    size={22}
                    color="black"
                >
                </Zocial>
                <TextInput
                    className='w-[60%] border-b-2 h-7 pb-2 text-start'
                    onChangeText={setInsta}
                    value={insta}
                    placeholder="Instagram"
                >
                </TextInput>
            </View>
            <View className='flex-row space-x-11 pl-4 mr-1'>
                <MaterialCommunityIcons
                    name="snapchat"
                    size={30}
                    color="black"
                    className=''
                >
                </MaterialCommunityIcons>
                <TextInput
                    className='w-[60%] border-b-2 h-7 pb-2 text-start'
                    onChangeText={setSnap}
                    value={snap}
                    placeholder="Snapchat"
                >
                </TextInput>
            </View>
        </View>
    );
};

export default InformationCard;