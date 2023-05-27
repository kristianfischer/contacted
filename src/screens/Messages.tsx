import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from "react";
import { Octicons } from '@expo/vector-icons';
import DraftMess from "../components/homepage/DraftMess";
import { useNavigation } from '@react-navigation/native';
import AccBanner from '../components/homepage/AccBanner';


const Messages = ({ }) => {

    const navigation = useNavigation();

    function handleReturn() {
        navigation.goBack();
    }

    return (
        <View className="flex flex-1 justify-start bg-white">
            <Text className='text-start text-2xl ml-2'>
                    Messages
            </Text>
            <View className='h-[50%] w-full items-center'>
                <ScrollView>
                    <Text className='mt-10'>
                        No Messages? Add contacts to begin reaching out!
                    </Text>
                </ScrollView>
            </View>
            < DraftMess />
        </View>
    );
};
export default Messages;