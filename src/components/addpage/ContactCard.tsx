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

const buildContactCards = async (onCardPress) => {
    try {
        const contacts = await retrieveContacts();
        const contactCards = [];
        const conlength = contacts.length;

        for (let i = 0; i < conlength; i++) {
            contactCards.push(
                <TouchableOpacity
                    onPress={() => onCardPress(contacts[i])}
                    key={"contact: " + (i + 1)}
                    className={contacts[i].color == "bg-orange-200" ? 'rounded-md h-14 bg-orange-200 space-x-3 border-2' : contacts[i].color == "bg-pink-200" ? 'rounded-md h-14 bg-pink-200 space-x-3 border-2' : 'rounded-md h-14 bg-yellow-100 space-x-3 border-2'}>
                    <View className='flex-row w-full'>
                        <View className='items-start pl-3 pt-1 w-[50%]'>
                            <Text>
                                {contacts[i].first + " " + contacts[i].last}
                            </Text>
                        </View>
                        <View className='pt-1 items-end w-[50%] pr-2'>
                            <Text>
                                {contacts[i].number}
                            </Text>
                        </View>
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
