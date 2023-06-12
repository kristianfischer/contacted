import { Text, TouchableOpacity, TextInput, View, Pressable, Image } from 'react-native';
import React, { useState } from "react";
import { Octicons } from '@expo/vector-icons'; 
import { collection, addDoc, getFirestore } from "firebase/firestore";
import * as Clipboard from 'expo-clipboard';

const db = getFirestore();

const LastMess = ({ props, call }) => {


    return (
        <View className='w-full bg-white h-[27%]'>
            <View className='flex-row'>
                <Text className='pl-4 text-2xl pt-3 font-semibold'>Last Message to {props.first + " " + props.last.substring(0,1)}</Text>
                <TouchableOpacity className='items-end pt-5 pl-44'
                    onPress={() => { call(false) }}>
                    <Octicons
                        name="x-circle"
                        size={25}
                        color = "black">
                    </Octicons>
                </TouchableOpacity>
            </View> 
            <View className='items-end pr-16 pt-5'>
                <Text className='text-md text-gray-400'>{ props.lastdate != " " ? props.lastdate : "First Message"}</Text>
            </View>
            <View className='flex-row pl-12'>
                <TouchableOpacity
                    disabled
                    className="h-28 m-1 w-[80%] rounded-xl text-start pl-2 pt-2 bg-custom">
                    <Text className='text-white font-semibold pr-2'>
                        {props.lastmess == " " ? "Send your first message to " + props.first + " " + props.last + "!": props.lastmess}
                    </Text>
                </TouchableOpacity>
                <View className='rounded-3xl mt-20 w-8 h-8 bg-custom'></View>
                <View className='rounded-3xl mt-24 w-5 h-5 bg-custom'></View>
            </View>
        </View>
    );
}

export default LastMess;