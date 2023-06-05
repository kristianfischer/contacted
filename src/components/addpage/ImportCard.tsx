import { Text, View, TouchableOpacity, Image } from 'react-native';
import React from "react";
import * as Contacts from 'expo-contacts';
import { Octicons, Feather } from '@expo/vector-icons'; 
import { collection, addDoc, doc, setDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import account from "../../../assets/acount.png";


const db = getFirestore();

const today = new Date();

const importcontacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
        });

        if (data.length > 0) {
            return data;
            }
        return [];
    }
};


const buildImportCards = async () => {
    try {
        const contact = await importcontacts();
        const importCards = [];

        const contacts = contact.reverse()
        const conlength = contacts.length;  
        
        const addtobase = async (index) => {
                
            try {
                const docRef = await setDoc(doc(db, "Users", getAuth().currentUser.uid, "Contacts", contacts[index].lastName != undefined ? contacts[index].lastName + ", " + contacts[index].firstName : "" + ", " + contacts[index].firstName), {
                    first: contacts[index].firstName != undefined ? contacts[index].firstName: "",
                    last: contacts[index].lastName != undefined ? contacts[index].lastName: "",
                    number: contacts[index].phoneNumbers[0].digits == undefined ? "" : contacts[index].phoneNumbers[0].digits.substring(0,1) == "+" ? contacts[index].phoneNumbers[0].digits.substring(2, 13) : contacts[index].phoneNumbers[0].digits,
                    email: "",
                    insta: "",
                    snap: "",
                    relation: "",
                    unit: "",
                    lor: "",
                    freqgen: "",
                    freqspec: "",
                    metdate: "",
                    startdate: String(today),
                    iterative: "",
                    imagepath: contacts[index].image != null ? contacts[index].image.uri : Image.resolveAssetSource(account).uri,
                    lastdate: " ",
                    lastmess: " ",
                    updated: "n"
        
                });
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }

        for (let i = 0; i < conlength; i++) {
            importCards.push(
                <View
                    key={contacts[i].firstName + " " + contacts[i].lastName}
                    className={'h-14  bg-white space-x-3 border-b'}>
                    <View className='flex-row'>
                        {contacts[i].imageAvailable == true ? <Image className="h-full w-full border mt-1 ml-1" source={{ uri: contacts[i].image.uri }} style={{ width: 47, height: 47, borderRadius: 23.5 }}></Image>
                            :
                            <Image className="h-full w-full border mt-1 ml-1" source={{ uri: Image.resolveAssetSource(account).uri }} style={{ width: 47, height: 47, borderRadius: 23.5 }}></Image>}
                        <View className='flex-col w-[60%]'>
                            <Text className='text-lg font-semibold pt-5 w-56 pl-2'>
                                {contacts[i].lastName != null ?  contacts[i].firstName + " " + contacts[i].lastName : contacts[i].firstName + " " }
                            </Text>
                        </View>
                        <View className='items-end w-[25%]'>
                            <TouchableOpacity
                                className='pt-3'
                                onPress={() => { addtobase(i) }}>
                                <Octicons
                                    name="check-circle"
                                    size={30}
                                    color = {'black'}>
                                </Octicons>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        }
        

        if (conlength < 10) {
            for (let i = 0; i < 10 - conlength; i++) {
                importCards.push(<View
                    key={"hi" + i}
                    className={' h-14 bg-white space-x-3 border-b' }>
                </View>);
            }
        }

            return importCards;
            
    } catch (error) {
        console.error('Error building contact cards:', error);
        return [];
    }
};

export default buildImportCards;
