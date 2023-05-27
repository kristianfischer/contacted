import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Octicons } from '@expo/vector-icons'; 
import React, { useState } from "react";


    const DraftMess = ({ }) => {    
        
    const [message, setMessage] = useState("");

        return (
            <View className='px-3 w-full h-[42%] bg-white pt-5'>
                <View className='items-center pt-3'>
                    <View className='flex-row'>
                        <TouchableOpacity
                            className='rounded-3xl h-8 w-[70%] bg-gray-200'>
                            <Text className='pt-2 pl-3'>
                                To:
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className='pl-3 pt-0.5'>
                            <Octicons
                                name="paper-airplane"
                                size={27}
                                color = "black">
                            </Octicons>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        id="message"
                        placeholder="Need inspiration? Visit reccomendations!"
                        onChangeText={setMessage}
                        value={message}
                        className=" m-3 border-2 pl-2 pb-28 rounded-xl h-[67%] w-[90%] bg-gray-100"
                    />
                </View>
            </View>
        );
    };

    export default DraftMess;