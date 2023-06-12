import { Text, View, TouchableOpacity, TextInput, ActivityIndicator, Image } from 'react-native'; 
import React, { useState, useEffect } from "react";
import ImportCard from "./ImportCard";
import * as Contacts from 'expo-contacts';
import { Octicons } from '@expo/vector-icons'; 
import {doc, setDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import account from "../../../../assets/acount.png";

const db = getFirestore();

const ImportScreen = ({onCardPress}) => {
    
    const [imarr, setImarr] = useState([])
    const [importCards, setImportCards] = useState([]);
    const [search, setSearch] = useState("");
    const [filtercards, setFilterCards] = useState([]);

    useEffect(() => {
        const importContacts = async () => {
        try {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync();
                if (data.length > 0) {
                    setImportCards(data.reverse());
                }
            } else {
                console.log('Permission denied for accessing contacts');
            }
        } catch (error) {
            console.log('Error fetching contacts:', error);
        }
        };
    
        importContacts();
    }, []);

    
    function twoCalls(name){
        setSearch(name);
        setFilterCards(filterSearch(name));
    }

    const filterSearch = (search) => {
        var lfiltercards = new Array();
        for (let i = 0; i < importCards.length; i++) {
            if ((search.toLowerCase() == (importCards[i].firstName + " " + importCards[i].lastName).substring(0, search.length).toLowerCase()) && !lfiltercards.includes(importCards[i])) {
                lfiltercards.push(importCards[i]);
            }
        }
        return lfiltercards
    }    


    const addim = (contact) => {
        var temparr = imarr;
        temparr.push(contact);
        setImarr(temparr)
    }

    const remim = (contact) => {
        var temparr = imarr;
        for (let i = 0; i < imarr.length; i++) {
            if (temparr[i] == contact) {
                temparr.splice(i, 1);
                break;
            }
        }
        setImarr(temparr);
    }

    const addtobase = async (contact) => {
        try {
            const docRef = await setDoc(doc(db, "Users", getAuth().currentUser.uid, "Contacts", contact.lastName != undefined ? contact.lastName + ", " + contact.firstName : "" + ", " + contact.firstName), {
                first: contact.firstName != undefined ? contact.firstName: "",
                last: contact.lastName != undefined ? contact.lastName: "",
                number: contact.phoneNumbers[0].digits == undefined ? "" : contact.phoneNumbers[0].digits.substring(0,1) == "+" ? contact.phoneNumbers[0].digits.substring(2, 13) : contact.phoneNumbers[0].digits,
                email: "",
                insta: "",
                snap: "",
                relation: "",
                unit: "",
                lor: "",
                freqgen: "",
                freqspec: "",
                metdate: "",
                startdate: "",
                iterative: "",
                imagepath: contact.image != null ? contact.image.uri : Image.resolveAssetSource(account).uri,
                lastdate: " ",
                lastmess: " ",
                updated: "n",
                nextcon: "",
                birthday: ""
    
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const addContacts = () => {
        for (let i = 0; i < imarr.length; i++)
            addtobase(imarr[i])
    }

    return (
        <View className='w-full h-[89.5%]'>
            <View className={'flex-row pl-4 bg-white'}>
                <Text className='mt-3 text-3xl'>
                    Import Contacts
                </Text>
                <TouchableOpacity className="ml-28 pl-1.5 mt-5"
                    onPress={() => {
                        onCardPress(false)
                        addContacts()}}>
                    <Octicons
                        name='upload'
                        size={25}
                        color={"#008080"} />
                </TouchableOpacity>
            </View>
            <View className = 'flex-row pl-3 bg-white'>
                <TouchableOpacity
                    disabled = {true}
                    className='rounded-3xl h-8 w-[80%] bg-gray-200 mb-3'>
                    <TextInput className='pt-2 pl-3'
                        onChangeText={twoCalls}          
                        placeholder="Search"
                        value={search}
                        placeholderTextColor={"black"}
                        >
                    </TextInput>
                </TouchableOpacity>
                <Text className='text-gray-500 pl-3 pt-3'>Newest</Text>
            </View>
            {importCards.length !=  0 ? (
                <ImportCard contacts={search != "" ? filtercards : importCards} onCardPress={addim} remove={remim} />
            ) : (
                <View className='items-center pt-10'>
                        <ActivityIndicator size={'large'} color={"white"} />
                    <Text className='pt-2 text-white font-semibold'>Fetching Contacts...</Text>
                </View>
            )}
        </View>
    );
};

export default ImportScreen;