import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from "react";
import { Octicons } from '@expo/vector-icons';
import DraftMess from "../components/homepage/DraftMess";


const Messages = ({ }) => {

    return (
        <View className="flex flex-1 justify-start bg-white pt-16">
            <View className='flex-row'>
                <Text className='text-start text-3xl ml-6 pb-3'>
                        Messages
                </Text>
                <TouchableOpacity className='items-end w-[55%]'>
                    <Octicons
                        name="light-bulb"
                        size={30}
                        color = {'black'}>
                    </Octicons>
                </TouchableOpacity>
                
            </View>
            <View className='h-[30%] w-full items-center'>
                <ScrollView>
                    <Text className='mt-4'>
                        Reach out to some suggestions below!
                    </Text>
                </ScrollView>
            </View>
            < DraftMess />
        </View>
    );
};
export default Messages;