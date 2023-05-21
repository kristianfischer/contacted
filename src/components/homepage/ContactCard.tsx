import { Text, View, TouchableOpacity } from 'react-native';
import { getDocs, collection, getFirestore } from "firebase/firestore"; 
import React, { useState, useEffect } from "react";

const db = getFirestore();

const getContacts = async () => {
    const contactList = [];
    const querySnapshot = await getDocs(collection(db, "Contacts"));
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

const buildContactCards = async () => {
    try {
        const contacts = await retrieveContacts();
        const contactCards = [];
        const conlength = contacts.length;

        for (let i = 0; i < conlength; i++) {
            contactCards.push(
                <TouchableOpacity
                    //onPress={ContactView}
                    key={"contact: " + (i + 1)}
                    className='rounded-md h-14 bg-white space-x-3 border-2'>
                    <View className='flex-row'>
                        <Text className='pl-3 pt-1'>
                            {contacts[i].first + " " + contacts[i].last}
                        </Text>
                        <Text className='pt-1 ml-5'>
                            {contacts[i].number}
                        </Text>
                    </View>
                    <View className={contacts[i].relation != "Professional" ? 'flex-row': 'flex-row space-x-3'}>
                        <Text className='pt-1 text-gray-400'>
                            {contacts[i].relation}
                        </Text>
                        <Text className={contacts[i].relation != "Professional" ? 'pt-1 mr- text-gray-400 pl-56' :  'pt-1 mr- text-gray-400 pl-44'}>
                            {contacts[i].freqgen}
                        </Text>
                    </View>
                </TouchableOpacity>
                );
        }
        
        

        return contactCards;
    } catch (error) {
        console.error('Error building contact cards:', error);
        return [];
    }
};

export default buildContactCards;
