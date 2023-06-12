import { Text, TextInput, View, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from "react";
import { Zocial } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';


const FrequencyCard = ({ }) => {

    const [wks, setWk] = useState(false);
    const [mns, setMn] = useState(false);
    const [yrs, setYr] = useState(false);
    const [twoaw, setTwoaw] = useState(false);
    const [oneaw, setOneaw] = useState(false);
    const [biw, setBiw] = useState(false);
    const [oneam, setOneam] = useState(false);
    const [bim, setBim] = useState(false);
    const [trim, setTrim] = useState(false);
    const [hyr, setHyr] = useState(false);
    const [oneay, setOneay] = useState(false);
    const [biy, setBiy] = useState(false);


    const Revertother = (first) => {
        if (first == "Weekly") {
            setYr(false);
            setMn(false);
            setWk(!wks);
        } else if (first == "Monthly") {
            setYr(false);
            setMn(!mns);
            setWk(false);
        } else if (first == "Yearly") {
            setYr(!yrs);
            setMn(false);
            setWk(false);
        } else if (first == "Twice a week") {
            setTwoaw(!twoaw);
            setOneaw(false);
            setBiw(false);
        } else if (first == "Once a week") {
            setTwoaw(false);
            setOneaw(!oneaw);
            setBiw(false);
        } else if (first == "Bi-weekly") {
            setTwoaw(false);
            setOneaw(false);
            setBiw(!biw);
        } else if (first == "Once a month") {
            setOneam(!oneam);
            setBim(false);
            setTrim(false);
        } else if (first == "Bi-monthly") {
            setOneam(false);
            setBim(!bim);
            setTrim(false);
        } else if (first == "Tri-monthly") {
            setOneam(false);
            setBim(false);
            setTrim(!trim);
        } else if (first == "Semi-annually") {
            setHyr(!hyr);
            setOneay(false);
            setBiy(false);
        } else if (first == "Once a year") {
            setHyr(false);
            setOneay(!oneay);
            setBiy(false);
        } else if (first == "Bi-annually") {
            setHyr(false);
            setOneay(false);
            setBiy(!biy);
        }
            

    }

    return (
        <View className='flex-col w-full space-y-6 px-4 pt-2'>
                        <Text
                            className='w-full h-7 pb-2 text-center text-lg text-black italic'>
                            How often do you want to reach out?
                        </Text>
                        <View className='flex-row space-x-10 pl-10'>
                            <Pressable
                                
                                onPress={() => { Revertother("Weekly")}}>
                                <Text
                                    className={wks==true ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                        Weekly
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => { Revertother("Monthly")}}>
                                <Text
                                    className={mns==true ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                        Monthly
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => { Revertother("Yearly")}}>
                                <Text
                                    className={yrs==true ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                        Yearly
                                </Text>
                            </Pressable>
                        </View>
                        {(wks == true) ? 
                        <View className='flex-row space-x-5'>
                            <Pressable
                                className='' 
                                onPress={() => {  Revertother("Twice a week")}}>
                                <Text
                                    className={twoaw==true ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                        Twice a week
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => {  Revertother("Once a week")}}>
                                <Text
                                    className={oneaw==true ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                        Once a week
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => {  Revertother("Bi-weekly")}}>
                                <Text
                                    className={biw==true ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                        Bi-weekly
                                </Text>
                            </Pressable>
                        </View> : (mns == true) ? 
                            <View className='flex-row space-x-5'>
                            <Pressable
                                onPress={() => { Revertother("Once a month")}}>
                                <Text
                                    className={oneam==true ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                        Once a month
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => { Revertother("Bi-monthly")}}>
                                <Text
                                    className={bim==true ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                        Bi-monthly
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => { Revertother("Tri-monthly")}}>
                                <Text
                                    className={trim==true ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                        Tri-monthly
                                </Text>
                            </Pressable>
                        </View> : (yrs == true) ? 
                            <View className='flex-row space-x-4 pb-4'>
                            <Pressable
                                onPress={() => { Revertother("Semi-annually")}}>
                                <Text
                                    className={hyr==true ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                        Semi-annually
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => { Revertother("Once a year")}}>
                                <Text
                                    className={oneay==true ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                        Once a year
                                </Text>
                            </Pressable>
                            <Pressable
                                className='mr-1'       
                                onPress={() => { Revertother("Bi-annually")}}>
                                <Text
                                    className={biy==true ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                        Bi-annually
                                </Text>
                            </Pressable>
                        </View> :
                            <View></View>}
                    </View>
    );
};

export default FrequencyCard;

