import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Octicons } from '@expo/vector-icons'; 
import React, { useState } from "react";


    const DraftMess = ({ }) => {    
        
    const [message, setMessage] = useState("");

        return (
            <View className='px-3 w-full h-[40%] bg-white pt-3'>
                <View className='flex-row space-x-56'>
                    <Text className=' text-2xl'>
                        Messages
                    </Text>
                    <TouchableOpacity
                        className='pl-26 pt-1'>
                        <Octicons
                            name="paper-airplane"
                            size={25}
                            color="black">
                        </Octicons>
                    </TouchableOpacity>
                </View>
                <View className='items-center pt-3'>
                    <TouchableOpacity
                        className='rounded-3xl h-8 w-[80%] bg-gray-200'>
                        <Text className='pt-2 pl-3'>
                            To:
                        </Text>
                    </TouchableOpacity>
                    <TextInput
                        id="message"
                        placeholder="Need inspiration? Visit reccomendations!"
                        onChangeText={setMessage}
                        value={message}
                        className=" m-3 border-2 pl-2 pb-28 rounded-xl h-[65%] w-[90%] bg-gray-100"
                    />
                </View>
            </View>
        );
    };

    export default DraftMess;