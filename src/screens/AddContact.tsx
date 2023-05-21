import { Text, TextInput, View, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from "react";
import { Zocial } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { collection, addDoc, getFirestore } from "firebase/firestore";
import FrequencyCard from '../components/addpage/FrequencyCard';
import RelationshipCard from '../components/addpage/RelationshipCard';
import ContactHead from '../components/addpage/ContactHead';
import InformationCard from '../components/addpage/InformationCard';

const db = getFirestore();

const AddContact = ({ }) => {

    const [firstname, setFirst] = useState("");
    const [lastname, setLast] = useState("");
    const [number1, setNumber1] = useState("");
    const [number2, setNumber2] = useState("");
    const [number3, setNumber3] = useState("");
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
    const [ans, setAns] = useState("");

    const Revertother = (first) => {
        setAns(first);
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
        } else if (first == "Weekly") {
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

    const checktruth = (first, second, third) => {
        if (first == true)
            return first
        else if (second == true)
            return second
        else if (second == true)
            return third
    }

    const dothing = (one) => {
        if (ans == "wk") {
            if (checktruth(twoaw, oneaw, biw) == twoaw)
                return "Twice a week"
            else if (checktruth(twoaw, oneaw, biw) == oneaw)
                return "Once a week"
            else if (checktruth(twoaw, oneaw, biw) == biw)
                return "Bi-weekly"
        } else if (ans == "mn") {
            if (checktruth(oneam, bim, trim) == oneam)
                return "Once a month"
            else if (checktruth(oneam, bim, trim) == bim)
                return "Bi-monthly"
            else if (checktruth(oneam, bim, trim) == trim)
                return "Tri-monthly"
        } else if (ans == "yr") {
            if (checktruth(hyr, oneay, biy) == hyr)
                return "Semi-annually"
            else if (checktruth(hyr, oneay, biy) == oneay)
                return "Once a year"
            else if (checktruth(hyr, oneay, biy) == biy)
                return "Bi-anually"
            else
                return "undefined"
        }
    }

    const addtobase = async () => {
        
        try {
            const docRef = await addDoc(collection(db, "Contacts"), {
                first: firstname,
                last: lastname,
                number: number1.concat("-", number2, "-", number3),
                email: email,
                insta: insta, 
                snap: snap,
                relation: checktruth(prof, fam, friend) == prof ? "Professional" : checktruth(prof, fam, friend) == fam ? "Family" : "Friend",
                unit: checktruth(days, months, years) == days ? "Days" : checktruth(days, months, years) == months ? "Months" : "Years",
                lor: duration,
                freqgen: checktruth(wks, mns, yrs) == wks ? "Weekly" : checktruth(wks, mns, yrs) == mns ? "Monthly" : "Yearly",
                freqspec: ans
            });  
            } catch (e) {
            console.error("Error adding document: ", e);
        }
        setFirst("");
        setLast("");
        setNumber1("");
        setNumber2("");
        setNumber3("");
        setEmail("");
        setInsta("");
        setSnap("");
        setProf(false);
        setFam(false);
        setFriend(false);
        setDays(false);
        setMonths(false);
        setYears(false);
        setDuration("");
        setWk(false);
        setMn(false);
        setYr(false);
        setTwoaw(false);
        setOneaw(false);
        setBiw(false);
        setOneam(false);
        setBim(false);
        setTrim(false);
        setHyr(false);
        setOneay(false);
        setBiy(false);
    }


    return (
        <View className="h-full flex flex-1 justify-start w-full bg-white">
            

            


            <View className='w-full px-3 h-full mb-3 bg-white'>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    scrollToOverflowEnabled
                >
                    
                    <View className='flex-row mt-8 space-x-36'>    
                        <Text className='text-3xl text-start pt-6 ml-3'>
                            New Contact
                        </Text>
                        <TouchableOpacity
                            className='mt-7'
                        onPress={addtobase}>
                            <Octicons
                                name='plus'
                                size={30}
                                color = "black">
                            </Octicons>
                        </TouchableOpacity>
                    </View>


                    <View className={'flex-row w-full bg-gray-100 rounded-lg border-2 mt-3'}>
                        <View className={'flex-col w-full pl-4 w-[75%]'}>
                            <TextInput
                                className= 'h-12 text-start text-xl'
                                onChangeText={setFirst}
                                value={firstname}
                                placeholder="First Name"
                            >
                            </TextInput>
                            <TextInput
                                className='h-12 text-start text-xl pb-3'
                                onChangeText={setLast}
                                value={lastname}
                                placeholder={"Last Name"}
                            >
                            </TextInput>
                        </View>
                        <TouchableOpacity
                            className='pt-2'>
                            <MaterialIcons
                                name="account-circle"
                                size={80}
                                color = "black">
                            </MaterialIcons>
                        </TouchableOpacity>
                    </View>

                    
                    <View className={(firstname == "" || lastname == "") ? 'border-b-4 border-gray-300 pt-10 mx-36' : 'border-b-4 pt-10 mx-36'}></View>

                    <View>
                        <Text className='text-2xl pt-5 pl-1 mb-4'>
                            Socials
                        </Text>
                    </View>


                    <View className='flex-col w-full space-y-5 bg-gray-100 rounded-lg border-2'>
                        <View className='flex-row pt-3 space-x-12 pl-5'>
                            <Octicons
                                name="comment-discussion"
                                size={22}
                                color="black"
                            >
                            </Octicons>
                            <View className='flex-row space-x-1'>
                                <TextInput
                                    className='w-[22%] border-b-2 h-7 pb-2 text-center'
                                    onChangeText={setNumber1}
                                    value={number1}
                                    placeholder=""
                                    keyboardType="numeric"
                                >
                                </TextInput>
                                <Text className='text-lg'>-</Text>
                                <TextInput
                                    className='w-[22%] border-b-2 h-7 pb-2 text-center'
                                    onChangeText={setNumber2}
                                    value={number2}
                                    placeholder=""
                                    keyboardType="numeric"
                                >
                                </TextInput>
                                <Text className='text-lg'>-</Text>
                                <TextInput
                                    className='w-[27%] border-b-2 h-7 pb-2 text-center'
                                    onChangeText={setNumber3}
                                    value={number3}
                                    placeholder=""
                                    keyboardType="numeric"
                                >
                                </TextInput>
                            </View>
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
                        <View className='flex-row space-x-11 pl-4 mr-1 mb-5'>
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


                    <View className={(number1 == "" || number2 == "" || number3 == "") ? 'border-b-4 border-gray-300 pt-10 mx-36' : 'border-b-4 pt-10 mx-36'}></View>


                    <View>
                        <Text className='text-2xl pt-5 pl-1'>
                            Relationship
                        </Text>
                    </View>


                    <View className='flex-col w-full space-y-6 px-8 mt-4 pt-4 pb-3 mb-8 border-2 rounded-lg bg-gray-100'>
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
                                    className='w-full h-7 text-center text-lg text-black italic'>
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
                                    <View className='pt-2 items-center'> 
                                        <TextInput
                                            className='w-[60%] h-12 pb-2 text-center text-lg'
                                            onChangeText={setDuration}
                                            value={duration}
                                            placeholder="How many?"
                                            keyboardType='numeric'
                                        >
                                        </TextInput> 
                                    </View> :
                                    <View className='pt-4'></View>}     
                            </View>:
                        <View></View>}
                    </View>

                    
                    <View className={(duration == "") ? 'border-b-4 border-gray-300 pt-2 mx-36': 'border-b-4 pt-2 mx-36'}></View>


                    <View>
                        <Text className='text-2xl pt-5 pl-1'>
                            Frequency
                        </Text>
                    </View>


                    <View className='flex-col w-full mt-4 space-y-6 px-4 pt-2 border-2 rounded-lg bg-gray-100'>
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
                        <View className='flex-row space-x-5 pb-4'>
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
                            <View className='flex-row space-x-5 pb-4'>
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
                    <View className='h-[30%] bg-white'>
                        <Text className='bg-white h-7'></Text>
                    </View>

                </ScrollView>
            </View>
        </View>
    );
};

export default AddContact;