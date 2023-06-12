import { Text, TextInput, View, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from "react";
import { Octicons } from '@expo/vector-icons'; 




const ContactHead = ({ }) => {

    const [firstname, setFirst] = useState("");
    const [lastname, setLast] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [insta, setInsta] = useState("");
    const [snap, setSnap] = useState("");

    const [prof, setProf] = useState(false);
    const [fam, setFam] = useState(false);
    const [friend, setFriend] = useState(false);
    const [days, setDays] = useState(false);
    const [months, setMonths] = useState(false);
    const [years, setYears] = useState(false);
    const [duration, setDuration] = useState("");

    

    /*const wks = givestate[0];
    const mns = givestate[1];
    const yrs =  givestate[2];
    const twoaw = givestate[3];
    const oneaw = givestate[4];
    const biw = givestate[5];
    const oneam = givestate[6];
    const bim = givestate[7];
    const trim = givestate[8];
    const hyr = givestate[9];
    const oneay = givestate[10];
    const biy = givestate[11];*/


    return (
        <View className='w-full pl-3 h-38 bg-white'>
                <View className='flex-row space-x-44'>
                    <View className='flex-row space-x-2'>
                        <Text
                            className='pt-12 pl-2 text-2xl'>
                            New Contact
                        </Text>
                        <View className='border-r-2 h-[43.5%] mt-12'></View>
                    </View>
                    <TouchableOpacity
                        //onPress={addtobase}
                        className='pt-3 mt-11'>
                            <Octicons
                                name="diff-added"
                                size={25}
                                color="black">
                            </Octicons>
                    </TouchableOpacity>
                </View>
                <View className='border-b-2 w-[40.5%]'></View>
                <View className={'flex-row space-x-20 w-full pt-2'}>
                    <TextInput
                        className= 'w-[30%] h-12 ml-8 p-2 text-center text-xl'
                        onChangeText={setFirst}
                        value={firstname}
                        placeholder="First Name"
                    >
                    </TextInput>
                    <TextInput
                        className='w-[30%] h-12 ml-8 p-2 text-center text-xl'
                        onChangeText={setLast}
                        value={lastname}
                        placeholder="Last Name"
                    >
                    </TextInput>
                </View>
                <View className='mr-3 pt-3 border-b-2'></View>
            </View>
    );
};

export default ContactHead;