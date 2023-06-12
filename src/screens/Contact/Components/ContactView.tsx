import { Text, TextInput, View, ScrollView, TouchableOpacity, Pressable, Image } from 'react-native';
import React, { useState } from "react";
import { Zocial } from '@expo/vector-icons'; 
import { Octicons, Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { deleteDoc, doc, setDoc, getFirestore } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from "firebase/auth";
import account from "../../../../assets/acount.png";

const db = getFirestore();
const today = new Date();

const AddContact = ({contact, onCardPress }) => {

    const [image, setImage] = useState(contact.imagepath);

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

    const [birthday1, setBirthday1] = useState(contact.birthday.substring(0,2));
    const [birthday2, setBirthday2] = useState(contact.birthday.substring(3,5));
    const [birthday3, setBirthday3] = useState(contact.birthday.substring(6,10));
    const [edit, setEdit] = useState(false);
    const [firstname, setFirst] = useState(contact.first);
    const [lastname, setLast] = useState(contact.last);
    const [number1, setNumber1] = useState(contact.number.substring(0,3));
    const [number2, setNumber2] = useState(contact.number.substring(3,6));
    const [number3, setNumber3] = useState(contact.number.substring(6,10));
    const [email, setEmail] = useState(contact.email);
    const [insta, setInsta] = useState(contact.insta);
    const [snap, setSnap] = useState(contact.snap);
    const [duration, setDuration] = useState(contact.lor);
    const [relation, setRelation] = useState(contact.relation);
    const [unit, setUnit] = useState(contact.unit);
    const [choosegen, setGen] = useState(contact.freqgen);
    const [choosespec, setSpec] = useState(contact.freqspec);

    const [iter, setIter] = useState(contact.iterative);

    const [wrong, setWrong] = useState(false)


    const deleteCon = async () => {
        await deleteDoc(doc(db, "Users", getAuth().currentUser.uid, "Contacts", contact.last.concat(", ", contact.first)));
        onCardPress(false);
    }

    const addtobase = async () => {
        setWrong(false)
        deleteCon();
        var newdate;
        if (unit == "Days") {
            newdate = new Date(today.getTime() - (parseInt(duration) * 24 * 60 * 60 * 1000));
        } else if (unit == "Months") {
            newdate = new Date(today.getFullYear() - Math.floor(parseInt(duration) / 12), today.getMonth() - (parseInt(duration) % 12), today.getDate());
        } else if (unit == "Years") {
            newdate = new Date(today.getFullYear() - parseInt(duration), today.getMonth(), today.getDate());
        }

        try {
            const docRef = await setDoc(doc(db, "Users", getAuth().currentUser.uid, "Contacts", lastname + ", " + firstname), {
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
                metdate: contact.updated == 'y' ? contact.metdate : String(newdate).substring(0, 15),
                startdate: contact.startdate == "" ? String(new Date(today.getTime() + iter * 24 * 60 *60 * 1000)) : contact.startdate,
                iterative: String(iter),
                imagepath: image,
                lastdate: contact.lastdate,
                lastmess: contact.lastmess,
                updated: "y",
                nextcon: String(new Date(today.getTime() + iter * 24 * 60 * 60 * 1000)),
                birthday: birthday1.concat("/", birthday2, "/", birthday3)

            }); 
            } catch (e) {
            console.error("Error adding document: ", e);
        }
        setEdit(!edit) 
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
                        <Text className='text-3xl text-start ml-1 w-[57%]'>
                            { edit ? "Edit Contact" : "View Contact"}
                        </Text>
                        <TouchableOpacity
                            className='mt-1 pl-16'
                            onPress={() => {
                                (firstname != "" && lastname != "" && (relation == "Professional" || relation == "Friend" || relation == "Family") && choosespec != "" && edit == true) ? addtobase() : edit ? setWrong(true) : setEdit(!edit)
                                }}>
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

                    {wrong ? 
                    <Text className='pt-2 px-4 text-center'>Please provide a full name, number, relationship, and frequency</Text> : null}



                    <View className = {(firstname == "" || lastname == "") ? 'flex-row w-full bg-gray-100 rounded-lg mt-3' : 'flex-row w-full bg-custom rounded-lg mt-3'}>
                        <View className={'flex-col w-[75%] pl-4'}>
                            <TextInput
                                editable={edit}
                                selectTextOnFocus={edit}
                                className={(firstname == "" || lastname == "") ? 'h-12 text-start text-xl' : 'h-12 text-start text-xl text-white'}
                                onChangeText={setFirst}
                                value={firstname}
                                placeholder="First Name"
                            >
                            </TextInput>
                            <TextInput
                                editable={edit}
                                selectTextOnFocus={edit}
                                className={(firstname == "" || lastname == "") ? 'h-12 text-start text-xl pb-3' : 'h-12 text-start text-xl text-white pb-3'}
                                onChangeText={setLast}
                                value={lastname}
                                placeholder={"Last Name"}
                            >
                            </TextInput>
                            <View className='flex-row'>
                                <Text className={ (firstname != "" && lastname != "") ? "text-white" : (birthday1 == "" && birthday2 == "" && birthday3 == "") ? 'text-mygray' : ""}>DOB:</Text>
                                <TextInput
                                    maxLength={2}
                                    placeholderTextColor={(firstname != "" && lastname != "") ? "white" : '#C7C7CD'}
                                    autoCorrect={false}
                                    className={(firstname == "" || lastname == "") ? 'h-7 text-start text-md pb-2.5 pl-1' : 'h-7 text-start text-md text-white pb-2.5 pl-1'}
                                    onChangeText={setBirthday1}
                                    value={birthday1}
                                    placeholder={"dd"}
                                    keyboardType='numeric'>
                                </TextInput>
                                <Text className={(firstname != "" && lastname != "") ? "text-white" : (birthday1 == "" && birthday2 == "") ? 'text-mygray' : ""}>/</Text>
                                <TextInput
                                    maxLength={2}
                                    placeholderTextColor={(firstname != "" && lastname != "") ? "white" : '#C7C7CD'}
                                    autoCorrect={false}
                                    className={(firstname == "" || lastname == "") ? 'h-7 text-start text-md pb-2.5' : 'h-7 text-start text-md text-white pb-2.5'}
                                    onChangeText={setBirthday2}
                                    value={birthday2}
                                    placeholder={"mm"}
                                    keyboardType='numeric'>
                                </TextInput>
                                <Text className={(firstname != "" && lastname != "") ? "text-white" : (birthday2 == "" && birthday3 == "") ? 'text-mygray' : ""}>/</Text>
                                <TextInput
                                    maxLength={4}
                                    placeholderTextColor={(firstname != "" && lastname != "") ? "white" : '#C7C7CD'}
                                    autoCorrect={false}
                                    className={(firstname == "" || lastname == "") ? 'h-7 text-start text-md pb-2.5' : 'h-7 text-start text-md text-white pb-2.5'}
                                    onChangeText={setBirthday3}
                                    value={birthday3}
                                    placeholder={"yyyy"}
                                    keyboardType='numeric'>
                                </TextInput>
                            </View>
                        </View>
                        <TouchableOpacity
                            disabled={!edit}
                            className={image == null ?'pt-2':'pt-3 pl-1'}
                            onPress={pickImage}>
                            {image == null ?
                                <Image className="h-full w-full mt-1 ml-1" source={{ uri: Image.resolveAssetSource(account).uri }} style={{ width: 70, height: 70, borderRadius: 35 }}></Image>
                                                            :
                                <Image className = "" source={{ uri: image }} style={{ width: 70, height: 70, borderRadius: 35}} />}
                        </TouchableOpacity>
                    </View>

                    
                    {/* <View className={(firstname == "" || lastname == "") ? 'border-b-4 border-gray-300 pt-10 mx-36' : 'border-b-4 pt-10 mx-36'}></View> */}

                    <View>
                        <Text className='text-2xl pt-5 pl-1 mb-4'>
                            Socials
                        </Text>
                    </View>

                    <View className={'flex-col w-full space-y-5 bg-gray-100 rounded-lg'}>
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


                    {/* <View className={(number1 == "" || number2 == "" || number3 == "") ? 'border-b-4 border-gray-300 pt-10 mx-36' : 'border-b-4 pt-10 mx-36'}></View> */}


                    <View>
                        <Text className='text-2xl pt-5 pl-1'>
                            Relationship
                        </Text>
                    </View>


                    <View className={'flex-col w-full space-y-6 px-8 mt-4 pt-4 pb-3 mb-8 rounded-lg bg-gray-100'}>

                        <View className='flex-row space-x-9'>
                            <Pressable
                                className='pl-3'
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
                                    className='pl-5'>
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

                    
                    {/* <View className={(duration == "") ? 'border-b-4 border-gray-300 pt-2 mx-36': 'border-b-4 pt-2 mx-36'}></View> */}


                    <View>
                        <Text className='text-2xl pt-5 pl-1'>
                            Frequency
                        </Text>
                    </View>

                    
                    <View className={'flex-col w-full space-y-6 px-4 mt-4 pt-2 rounded-lg bg-gray-100'}>
                        <Text
                            className='w-full h-7 pb-2 text-center text-lg text-black italic'>
                            How often do you want to reach out?
                        </Text>
                        <View className='flex-row space-x-10 pl-6'>
                            <Pressable
                                className='pl-3'
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
                        <View className='flex-row space-x-5 pb-4'>
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
                        <View className='flex-row space-x-4 pb-4'>
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
                        <View className='flex-row space-x-3.5 pb-4'>
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
                                className=''       
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

