import { Text, View, TouchableOpacity, Image } from 'react-native';
import { getDocs, collection, getFirestore } from "firebase/firestore"; 
import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

const db = getFirestore();

const getContacts = async () => {
    const contactList = [];
    const querySnapshot = await getDocs(collection(db, "Users", getAuth().currentUser.uid, "Contacts"));
    querySnapshot.forEach((doc) => {
        contactList.push(doc.data());
    });
    return contactList;
};

const retrieveContacts = async () => {
    try {
        const contacts = await getContacts();
        return contacts;
    } catch (error) {
        console.error('Error retrieving contacts:', error);
        return []; 
    }
};

const buildContactCards = async (onCardPress) => {
    try {
        const contacts = await retrieveContacts();
        const contactCards = [];
        const profarr = [];
        const friendarr = [];
        const famarr = [];
        const filteredContactCards = [];
        const conlength = contacts.length;

        for (let i = 0; i < conlength; i++) {
            contactCards.push(
                <TouchableOpacity
                    onPress={() => onCardPress(contacts[i])}
                    key={contacts[i].first + " " + contacts[i].last}
                    className={'h-14  bg-white space-x-3 border-b'}>
                    <View className='flex-row'>
                        <Image className="h-full w-full border-2 mt-1 ml-1" source={{ uri: contacts[i].imagepath }} style={{ width: 47, height: 47, borderRadius: 23.5 }}></Image>
                        <View className='flex-col'>
                            <Text className='text-lg font-semibold pt-5 w-52 pl-2'>
                                {contacts[i].first + " " + contacts[i].last}
                            </Text>
                        </View>
                        {contacts[i].updated == "y" ?
                        <View className='items-end w-[30%]'>
                            <View className='pt-1'>
                                <Text className=''>{contacts[i].freqspec}</Text>
                            </View>
                            <View className='pt-3 pl-2'>
                                <Text className='text-gray-500'>
                                    {contacts[i].relation}
                                </Text>
                            </View>
                        </View> : 
                        <View className='items-end w-[30%]'>
                            <View className='flex-row pt-7 pl-2'>
                                <View className='rounded-xl h-5 w-5 bg-yellow-400 border-2'><Text className='ml-1.5'>!</Text></View>  
                                <Text className='pl-2 pt-1'>
                                    Update Contact
                                </Text>
                            </View>
                        </View>}
                    </View>
                </TouchableOpacity>
            );

            
            if (contacts[i].relation == "Professional")
                profarr.push(contactCards[i]);
            else if (contacts[i].relation == "Friend")
                friendarr.push(contactCards[i]);
            else if (contacts[i].relation == "Family")
                famarr.push(contactCards[i]);
        }

        for (let k = 0; k < famarr.length; k++)
            filteredContactCards.push(famarr[k]);
        for (let k = 0; k < profarr.length; k++)
            filteredContactCards.push(profarr[k]);
        for (let k = 0; k < friendarr.length; k++)
            filteredContactCards.push(friendarr[k]);

        if (conlength < 10) {
            for (let i = 0; i < 10 - conlength; i++) {
                contactCards.push(<View
                    key={"hi" + i}
                    className={' h-14 bg-white space-x-3 border-b' }>
                </View>);
                filteredContactCards.push(<View
                    key={"hi" + i}
                    className={' h-14 bg-white space-x-3 border-b' }>
                </View>);
            }
        }

            

        return [contactCards, filteredContactCards];
    } catch (error) {
        console.error('Error building contact cards:', error);
        return [];
    }
};

export default buildContactCards;
