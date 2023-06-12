import { Keyboard, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Octicons } from '@expo/vector-icons'; 
import React, { useState } from "react";
import { useKeyboard } from "@react-native-community/hooks"
import * as SMS from 'expo-sms';
import { getAuth } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';


const db = getFirestore();


const DraftMess = ({ contact, call, date, ai }) => {    
    
        
    const [message, setMessage] = useState("");
    const keyboard = useKeyboard();

    const storeValue = async (value, contactId) => {
        try {
            const storedTasks = await AsyncStorage.getItem('contactTasks');
            const tasks = storedTasks ? JSON.parse(storedTasks) : {};
            tasks[contactId] = value;
            await AsyncStorage.setItem('contactTasks', JSON.stringify(tasks));   
        } catch (error) {
            console.log('Error storing value:', error);
        }
    };
    
        const send = async () => {
            if (message != "" && contact.number != "") { 
                const { result } = await SMS.sendSMSAsync(
                    contact.number,
                    message,
                    
                );
                if (result == 'sent') {
                    try {
                        const docRef = await setDoc(doc(db, "Users", getAuth().currentUser.uid, "Contacts", contact.last + ", " + contact.first), {
                            first: contact.first,
                            last: contact.last,
                            number: contact.number,
                            email: contact.email,
                            insta: contact.insta,
                            snap: contact.snap,
                            relation: contact.relation,
                            unit: contact.unit,
                            lor: contact.lor,
                            freqgen: contact.freqgen,
                            freqspec: contact.freqspec,
                            metdate: contact.metdate,
                            startdate: contact.startdate,
                            iterative: contact.iterative,
                            imagepath: contact.imagepath,
                            lastdate: String(new Date()).substring(0,16),
                            lastmess: message,
                            updated: 'y',
                            nextcon: String(new Date(new Date().getTime() + contact.iterative * 24 * 60 * 60 * 1000)),
                            birthday: contact.birthday
            
                        });
                    } catch (e) {
                        console.error("Error adding document: ", e);
                    }
                    setMessage("");

                    storeValue("Completed", contact.first + contact.last + String(date).substring(0, 15));
                }
            }   
        }

        return (
            <View className={!keyboard.keyboardShown || ai ? 'w-full h-[16%] bg-white mt-8' : 'w-full h-[100%] bg-white'}>
                <View className={!keyboard.keyboardShown || ai ? 'pl-2 pt-2' : 'pl-2'}>
                    <TouchableOpacity
                        disabled
                        className={keyboard.keyboardShown ? "mt-3 p-1 pb-2 rounded-xl max-h-24 w-[98%] pr-1 bg-gray-200" : "mt-3 p-1 pb-2 rounded-xl max-h-24 w-[98%] pr-1 bg-gray-200"}
                    >
                        <View className='flex-row'>
                        {contact == null ? <TouchableOpacity
                            className='pt-1 ml-2.5'
                            onPress={Keyboard.dismiss}>
                            <Octicons
                                name="person"
                                size={27}
                                color="#008080">
                            </Octicons>
                        </TouchableOpacity> :
                        <Image className="h-full w-full mt-0.5" source={{ uri: contact.imagepath }} style={{ width: 30, height: 30, borderRadius: 15 }}></Image>}
                        <TextInput
                            //multiline
                            id="message"
                            placeholder="Message..."
                            placeholderTextColor={'gray'}
                            onChangeText={setMessage}
                            value={message}
                            className={keyboard.keyboardShown && message == "" ? "max-h-28 w-[69%] pt-1.5 ml-3" : keyboard.keyboardShown && message != "" ? "max-h-8 w-[76.5%] pt-1.5 ml-3" : ! keyboard.keyboardShown && message != "" ? "max-h-8 w-[76.5%] pt-1.5 ml-3" : "max-h-28 w-[69%] pt-1.5 ml-3"}
                        />
                            {message == "" ? <TouchableOpacity
                                className={'pt-1'}
                                onPress={() => {
                                    call()
                                    Keyboard.dismiss()
                                }}>
                            <Octicons
                                name="dependabot"
                                size={27}
                                color="black">
                            </Octicons>
                        </TouchableOpacity> : null}
                        <TouchableOpacity
                            className='pt-1 ml-3'
                                onPress={() => {
                                    Keyboard.dismiss
                                    {contact != null?  send() : null}}}
                            disabled = {!keyboard.keyboardShown && message == "" ? true : false}>
                            <Octicons
                                name="paper-airplane"
                                size={27}
                                color = "black">
                            </Octicons>
                        </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    export default DraftMess;