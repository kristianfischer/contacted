import { Text, TextInput, View, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from "react";
import { Zocial } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';


const RelationshipCard = ({ }) => {

    const [prof, setProf] = useState(false);
    const [fam, setFam] = useState(false);
    const [friend, setFriend] = useState(false);
    const [days, setDays] = useState(false);
    const [months, setMonths] = useState(false);
    const [years, setYears] = useState(false);
    const [duration, setDuration] = useState("");


    const Revertother = (first) => {
        if (first == "Professional") {
            setProf(!prof);
            setFam(false);
            setFriend(false);
        } else if (first == "Family") {
            setProf(false);
            setFam(!fam);
            setFriend(false);
        } else if (first == "Friend") {
            setProf(false);
            setFam(false);
            setFriend(!friend);
        } else if (first == "Days") {
            setDays(!days);
            setMonths(false);
            setYears(false);
        } else if (first == "Months") {
            setDays(false);
            setMonths(!months);
            setYears(false);
        } else if (first == "Years") {
            setDays(false);
            setMonths(false);
            setYears(!years);
        } 
    }

    return (
        <View className='flex-col w-full space-y-6 px-8 pt-6'>
            <View className='flex-row space-x-10'>
                <Pressable
                    onPress={() => { Revertother("Professional") }}
                    className='pl-2'>
                    <Text
                        className={prof==true ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                            Professional
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => { Revertother("Family")}}>
                    <Text
                        className={fam==true ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                            Family
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => { Revertother("Friend")}}>
                    <Text
                        className={friend==true ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                            Friend
                    </Text>
                </Pressable>
            </View>
            {(friend == true || prof == true || fam == true) ? 
                <View>
                    <Text
                        className='w-full h-7 pb-2 text-center text-lg text-black italic'>
                        How long have you known them?
                    </Text>
                    <View className='flex-row space-x-10 pl-8 pt-6'>
                    <Pressable
                        onPress={() => { Revertother("Days") }}
                        className='pl-2'>
                        <Text
                            className={days==true ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                Days
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => { Revertother("Months")}}>
                        <Text
                            className={months==true ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                Months
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => { Revertother("Years")}}>
                        <Text
                            className={years==true ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                Years
                        </Text>
                    </Pressable>
                </View>
                    {(days == true || months == true || years == true) ?
                        <View className='pt-4 items-center'> 
                            <TextInput
                                className='w-[60%] h-8 pb-2 text-center text-lg'
                                onChangeText={setDuration}
                                value={duration}
                                placeholder="How many?"
                                keyboardType='numeric'
                            >
                            </TextInput> 
                        </View> :
                        <View className='pt-4'></View>}     
                </View>:
            <View className='pt-4'></View>}
        </View>
    );
};

export default RelationshipCard;