import React, { useState } from "react";
import AccBanner from "../components/homepage/AccBanner";
import Calendar from "../components/homepage/Calendar";
import DraftMess from '../components/homepage/DraftMess';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Octicons } from '@expo/vector-icons'; 
import AI from "../components/homepage/AI";

const Home = ({ }) => {

    const [button, setButton] = useState("Draft");

    return (
        <View className="flex flex-1 items-end justify-start bg-black">
            < AccBanner />
            < Calendar />
            <View className='flex-row bg-white w-full pt-3'>
                <View className="w-[50%] flex-row">
                    <Text className='pl-4 text-2xl'>
                        Connect
                    </Text>
                    <TouchableOpacity
                        className='pl-2 pt-2'>
                        <Octicons
                            name="info"
                            size={17}
                            color="black">
                        </Octicons>
                    </TouchableOpacity>
                </View>
                <View className="flex-row">
                <TouchableOpacity className={button == "Draft" ? 'h-7 w-16 ml-6 rounded-l-md mt-0.5 border-2' : 'h-7 w-16 ml-6 rounded-l-md mt-0.5 border-b-2 border-l-2 border-t-2 border-gray-400'}
                        onPress={() => {
                            setButton("Draft")}}>
                        <Text className='text-center mt-1'>
                            Draft
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className={button == "Generate" ? 'h-7 w-20 rounded-r-md mt-0.5 border-2' : 'h-7 w-20 rounded-r-md mt-0.5 border-b-2 border-r-2 border-t-2 border-gray-400'}
                        onPress={() => {
                            setButton("Generate")
                        }}>
                    <Text className='text-center mt-1'>
                            Generate
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {button == "Draft"
                ? 
                < DraftMess />
                :
                < AI />
            }
        </View>
    );
};
export default Home;