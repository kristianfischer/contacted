import { Text, TextInput, View, ScrollView, TouchableOpacity, Pressable, Image } from 'react-native';
import React, { useState } from "react";
import { Zocial } from '@expo/vector-icons'; 
import { Octicons, Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { deleteDoc, doc, setDoc, getFirestore } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from "firebase/auth";

const db = getFirestore();
const today = new Date();

const AddContact = (props) => {

    const [image, setImage] = useState(props.contact.imagepath);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        if (!result.canceled) {
        setImage(result.assets[0].uri);
        }
    };

    const [edit, setEdit] = useState(false);
    const [firstname, setFirst] = useState(props.contact.first);
    const [lastd, setLastd] = useState(props.contact.lastdate);
    const [lastm, setLastm] = useState(props.contact.lastm);
    const [lastname, setLast] = useState(props.contact.last);
    const [number1, setNumber1] = useState(props.contact.number.substring(0,3));
    const [number2, setNumber2] = useState(props.contact.number.substring(3,6));
    const [number3, setNumber3] = useState(props.contact.number.substring(6,10));
    const [email, setEmail] = useState(props.contact.email);
    const [insta, setInsta] = useState(props.contact.insta);
    const [snap, setSnap] = useState(props.contact.snap);
    const [duration, setDuration] = useState(props.contact.lor);
    const [relation, setRelation] = useState(props.contact.relation);
    const [unit, setUnit] = useState(props.contact.unit);
    const [choosegen, setGen] = useState(props.contact.freqgen);
    const [choosespec, setSpec] = useState(props.contact.freqspec);

    const [iter, setIter] = useState(props.contact.iterative);


    const deleteCon = async () => {
        await deleteDoc(doc(db, "Users", getAuth().currentUser.uid, "Contacts", props.contact.last + ", " + props.contact.first));
    }

    const addtobase = async () => {
        var newdate;
        if (unit == "Days") {
            newdate = new Date(today.getTime() - (parseInt(duration) * 24 * 60 * 60 * 1000));
        } else if (unit == "Months") {
            newdate = new Date(today.getFullYear() - Math.floor(parseInt(duration) / 12), today.getMonth() - (parseInt(duration) % 12), today.getDate());
        } else if (unit == "Years") {
            newdate = new Date(today.getFullYear() - parseInt(duration), today.getMonth(), today.getDate());
        }

        try {
            const docRef = await setDoc(doc(db, "Users", getAuth().currentUser.uid, "Contacts", props.contact.last + ", " + props.contact.first), {
                first: firstname,
                last: lastname,
                number: number1.concat(number2, number3),
                email: email,
                insta: insta,
                snap: snap,
                relation: relation,
                unit: unit,
                lor: duration,
                freqgen: choosegen,
                freqspec: choosespec,
                metdate: String(newdate).substring(0, 15),
                startdate: props.contact.startdate,
                iterative: String(iter),
                imagepath: image,
                lastdate: props.contact.lastdate,
                lastmess: props.contact.lastmess,
                updated: "y"

            });  
            } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    return (

        <View className="h-full flex flex-1 justify-start w-full bg-white">
            

            <View className='w-full px-3 h-full mb-3 bg-white'>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    scrollToOverflowEnabled
                >
                    

                    <View className='flex-row'>    
                        <Text className='text-3xl text-start ml-5 w-[57%]'>
                            { edit ? "Edit Contact" : "View Contact"}
                        </Text>
                        <TouchableOpacity
                            className='mt-1 pl-14'
                            onPress={() => {
                                (firstname != "" && lastname != "" && (relation == "Professional" || relation == "Friend" || relation == "Family") && choosespec != "" && edit == true) ? addtobase() : null
                                setEdit(!edit) }}>
                            {edit == false? <Feather
                                name="edit"
                                size={30}
                                color="black">
                            </Feather> : <Feather
                                name="check-square"
                                size={30}
                                color="black">
                            </Feather>}
                        </TouchableOpacity>
                        <TouchableOpacity
                            className='pt-1 pl-5'
                            onPress={() => {
                                deleteCon()}}>
                            <Octicons
                                name="trash"
                                size={30}
                            color="black">
                            </Octicons>
                        </TouchableOpacity>
                    </View>


                    <View className={'flex-row w-full bg-gray-100 rounded-lg border-2 mt-3'}>
                        <View className={'flex-col w-full pl-4 w-[75%]'}>
                            <TextInput
                                editable={edit}
                                selectTextOnFocus={edit}
                                className= 'h-12 text-start text-xl'
                                onChangeText={setFirst}
                                value={firstname}
                                placeholder="First Name"
                            >
                            </TextInput>
                            <TextInput
                                editable={edit}
                                selectTextOnFocus={edit}
                                className='h-12 text-start text-xl pb-3'
                                onChangeText={setLast}
                                value={lastname}
                                placeholder={"Last Name"}
                            >
                            </TextInput>
                        </View>
                        <TouchableOpacity
                            disabled={!edit}
                            className={image == null ?'pt-2':'pt-3 pl-1'}
                            onPress={pickImage}>
                            {image == null ?
                                <MaterialIcons
                                    name="account-circle"
                                    size={80}
                                    color="black">
                                </MaterialIcons> :
                                <Image className='border-2' source={{ uri: image }} style={{ width: 70, height: 70, borderRadius: 35}} />}
                        </TouchableOpacity>
                    </View>

                    
                    <View className={(firstname == "" || lastname == "") ? 'border-b-4 border-gray-300 pt-10 mx-36' : 'border-b-4 pt-10 mx-36'}></View>

                    <View>
                        <Text className='text-2xl pt-5 pl-1 mb-4'>
                            Socials
                        </Text>
                    </View>

                    <View className={'flex-col w-full space-y-5 bg-gray-100 rounded-lg border-2'}>
                        <View className='flex-row pt-3 space-x-12 pl-5'>
                            <Octicons
                                name="comment-discussion"
                                size={22}
                                color="black"
                            >
                            </Octicons>
                            <View className='flex-row space-x-1'>
                                <TextInput
                                    editable={edit}
                                    selectTextOnFocus={edit}
                                    className='w-[22%] border-b-2 h-7 pb-2 text-center'
                                    onChangeText={setNumber1}
                                    value={number1}
                                    placeholder=""
                                    keyboardType="numeric"
                                >
                                </TextInput>
                                <Text className='text-lg'>-</Text>
                                <TextInput
                                    editable={edit}
                                    selectTextOnFocus={edit}
                                    className='w-[22%] border-b-2 h-7 pb-2 text-center'
                                    onChangeText={setNumber2}
                                    value={number2}
                                    placeholder=""
                                    keyboardType="numeric"
                                >
                                </TextInput>
                                <Text className='text-lg'>-</Text>
                                <TextInput
                                    editable={edit}
                                    selectTextOnFocus={edit}
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
                                editable={edit}
                                selectTextOnFocus={edit}
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
                                editable={edit}
                                selectTextOnFocus={edit}
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
                                editable={edit}
                                selectTextOnFocus={edit}
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


                    <View className={'flex-col w-full space-y-6 px-8 mt-4 pt-4 pb-3 mb-8 border-2 rounded-lg bg-gray-100'}>

                        <View className='flex-row space-x-9'>
                            <Pressable
                                disabled={!edit}
                                onPress={() => { setRelation("Professional") }}>
                                <Text
                                    className={relation == "Professional" ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                        Professional
                                </Text>
                            </Pressable>
                            <Pressable
                                disabled={!edit}
                                onPress={() => { setRelation("Family")}}>
                                <Text
                                    className={relation == "Family" ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                        Family
                                </Text>
                            </Pressable>
                            <Pressable
                                disabled={!edit}
                                onPress={() => { setRelation("Friend")}}>
                                <Text
                                    className={relation == "Friend" ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                        Friend
                                </Text>
                            </Pressable>
                        </View>
                            <View>
                                <Text
                                    className='w-full h-7 text-center text-lg text-black italic'>
                                    How long have you known them?
                                </Text>
                                <View className='flex-row space-x-10 pl-4 pt-6'>
                                <Pressable
                                    disabled={!edit}
                                    onPress={() => { setUnit("Days") }}
                                    className='pl-2'>
                                    <Text
                                        className={unit == "Days" ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                            Days
                                    </Text>
                                </Pressable>
                                <Pressable
                                    disabled={!edit}
                                    onPress={() => { setUnit("Months")}}>
                                    <Text
                                        className={unit == "Months" ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                            Months
                                    </Text>
                                </Pressable>
                                <Pressable
                                    disabled={!edit}
                                    onPress={() => { setUnit("Years")}}>
                                    <Text
                                        className={unit == "Years" ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                            Years
                                    </Text>
                                </Pressable>
                            </View>
                                    <View className='pt-2 items-center'> 
                                        <TextInput
                                            editable={edit}
                                            selectTextOnFocus={edit}
                                            className='w-[60%] h-12 pb-2 text-center text-lg'
                                            onChangeText={setDuration}
                                            value={duration}
                                            placeholder="How many?"
                                            keyboardType='numeric'
                                        >
                                        </TextInput> 
                                    </View>  
                            </View>
                    </View>

                    
                    <View className={(duration == "") ? 'border-b-4 border-gray-300 pt-2 mx-36': 'border-b-4 pt-2 mx-36'}></View>


                    <View>
                        <Text className='text-2xl pt-5 pl-1'>
                            Frequency
                        </Text>
                    </View>

                    
                    <View className={'flex-col w-full space-y-6 px-4 mt-4 pt-2 border-2 rounded-lg bg-gray-100'}>
                        <Text
                            className='w-full h-7 pb-2 text-center text-lg text-black italic'>
                            How often do you want to reach out?
                        </Text>
                        <View className='flex-row space-x-10 pl-6'>
                            <Pressable
                                disabled={!edit}
                                onPress={() => { setGen("Weekly")}}>
                                <Text
                                    className={choosegen == "Weekly" ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                        Weekly
                                </Text>
                            </Pressable>
                            <Pressable
                                disabled={!edit}
                                onPress={() => { setGen("Monthly")}}>
                                <Text
                                    className={choosegen == "Monthly" ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                        Monthly
                                </Text>
                            </Pressable>
                            <Pressable
                                disabled={!edit}
                                onPress={() => { setGen("Yearly")}}>
                                <Text
                                    className={choosegen == "Yearly" ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                        Yearly
                                </Text>
                            </Pressable>
                        </View>
                        {(choosegen == "Weekly") ? 
                        <View className='flex-row space-x-2 pb-4'>
                            <Pressable
                                disabled={!edit}
                                className='' 
                                    onPress={() => {
                                        setSpec("Twice a week")
                                        setIter(4)}}>
                                <Text
                                    className={choosespec == "Twice a week" ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                        Twice a week
                                </Text>
                            </Pressable>
                                <Pressable
                                    disabled={!edit}
                                    onPress={() => {
                                        setSpec("Once a week")
                                        setIter(7)
                                    }}>
                                <Text
                                    className={choosespec == "Once a week" ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                        Once a week
                                </Text>
                            </Pressable>
                                <Pressable
                                    disabled={!edit}
                                    onPress={() => {
                                        setSpec("Bi-weekly")
                                        setIter(14)}}>
                                <Text
                                    className={choosespec == "Bi-weekly" ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                        Bi-weekly
                                </Text>
                            </Pressable>
                        </View> : (choosegen == "Monthly") ? 
                        <View className='flex-row space-x-2 pb-4'>
                                    <Pressable
                                        disabled={!edit}
                                        onPress={() => {
                                            setSpec("Once a month")
                                            setIter(30)}}>
                                <Text
                                    className={choosespec == "Once a month" ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                        Once a month
                                </Text>
                            </Pressable>
                                    <Pressable
                                        disabled={!edit}
                                        onPress={() => {
                                            setSpec("Bi-monthly")
                                            setIter(60)}}>
                                <Text
                                    className={choosespec == "Bi-monthly" ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                        Bi-monthly
                                </Text>
                            </Pressable>
                                    <Pressable
                                        disabled={!edit}
                                        onPress={() => {
                                            setSpec("Tri-monthly")
                                            setIter(90)}}>
                                <Text
                                    className={choosespec == "Tri-monthly" ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                        Tri-monthly
                                </Text>
                            </Pressable>
                        </View> : (choosegen == "Yearly") ? 
                        <View className='flex-row space-x-1 pb-4'>
                                        <Pressable
                                            disabled={!edit}
                                            onPress={() => {
                                                setSpec("Semi-annually")
                                                setIter(180)}}>
                                <Text
                                    className={choosespec == "Semi-annually" ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                        Semi-annually
                                </Text>
                            </Pressable>
                                        <Pressable
                                            disabled={!edit}
                                            onPress={() => {
                                                setSpec("Once a year")
                                                setIter(365)}}>
                                <Text
                                    className={choosespec == "Once a year" ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
                                        Once a year
                                </Text>
                            </Pressable>
                                        <Pressable
                                            disabled={!edit}
                                className='mr-1'       
                                            onPress={() => {
                                                setSpec("Bi-annually")
                                                setIter(730)}}>
                                <Text
                                    className={choosespec == "Bi-annually" ? 'text-black text-lg' : 'text-gray-400 text-lg'}>
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

