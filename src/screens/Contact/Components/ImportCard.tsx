import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useState } from "react";
import { Octicons } from '@expo/vector-icons'; 
import {doc, setDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import account from "../../../../assets/acount.png";

const db = getFirestore();
const today = new Date();

const ImportCard = ({ contacts: contactList, onCardPress, remove}) => {

    const contacts = contactList;
    const [selectedContacts, setSelectedContacts] = useState([]);

    const handleCardPress = (contact) => {
        if (selectedContacts.includes(contact)) {
            setSelectedContacts(selectedContacts.filter((c) => c !== contact));
            remove(contact);
        } else {
            setSelectedContacts([...selectedContacts, contact]);
            onCardPress(contact);
        }
    };

    return (
        <FlatList 
            className='w-full h-full space-y-2'
            data={contacts}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: contact }) => {
                const isSelected = selectedContacts.includes(contact);
                return (
                    <TouchableOpacity
                        activeOpacity={.9}
                        onPress={() => {
                            handleCardPress(contact)
                        } }
                        key={contact.firstName + " " + contact.lastName}
                        className={!isSelected? 'h-14 bg-white space-x-3 border-b border-gray-200' : "h-14 bg-custom space-x-3"}>
                        <View className='flex-row'>
                            {contact.imageAvailable == true ? <Image className="h-full w-full mt-1 ml-1" source={{ uri: contact.image.uri }} style={{ width: 47, height: 47, borderRadius: 23.5 }}></Image>
                                :
                                <Image className="h-full w-full mt-1 ml-1" source={{ uri: Image.resolveAssetSource(account).uri }} style={{ width: 47, height: 47, borderRadius: 23.5 }}></Image>}
                            <View className='flex-row w-[60%]'>
                                <Text className={!isSelected ? 'text-lg font-semibold pt-5 w-56 pl-2' : 'text-lg font-semibold pt-5 w-56 pl-2 text-white'}>
                                    {contact.lastName != null ? contact.firstName + " " + contact.lastName : contact.firstName + " "}
                                </Text>
                                {isSelected ?
                                    <View className='pt-3.5 pl-16'>
                                        <Octicons
                                            name="check"
                                            size={30}
                                            color={"white"}>
                                        </Octicons>
                                    </View> : null}
                            </View>
                        </View>
                    </TouchableOpacity>)
            }}
            />
            );
};

export default ImportCard;
