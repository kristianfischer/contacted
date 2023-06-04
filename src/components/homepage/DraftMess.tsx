import { Keyboard, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Octicons } from '@expo/vector-icons'; 
import React, { useState } from "react";
import { useKeyboard } from "@react-native-community/hooks"
import * as SMS from 'expo-sms';
import { getAuth } from "firebase/auth";
import { deleteDoc, doc, setDoc, getFirestore } from "firebase/firestore";

const db = getFirestore();


const DraftMess = ({ contact, call }) => {    
    
        
        const [message, setMessage] = useState("");
        const keyboard = useKeyboard();
    
        const send = async () => {
            if (message != "" && contact.number != "") { 
                const { result } = await SMS.sendSMSAsync(
                    contact.number.substring(0, 3) + contact.number.substring(4, 7) + contact.number.substring(8, 12),
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
                            lastmess: message
            
                        });
                    } catch (e) {
                        console.error("Error adding document: ", e);
                    }
                    setMessage("");
                }
            }   
        }

        return (
            <View className={!keyboard.keyboardShown? 'w-full h-[16%] bg-white mt-8' : 'w-full h-[100%] bg-white'}>
                <View className={!keyboard.keyboardShown ? 'pl-2 pt-2' : 'pl-2'}>
                    <TouchableOpacity
                        disabled
                        className={keyboard.keyboardShown ? "mt-3 p-1 pb-2 border rounded-xl max-h-24 w-[98%] pr-1 bg-gray-100" : "mt-3 p-1 pb-2 border rounded-xl max-h-24 w-[98%] pr-1 bg-gray-100"}
                    >
                        <View className='flex-row '>
                        {contact == null ? <TouchableOpacity
                            className='pt-1 ml-2.5'
                            onPress={Keyboard.dismiss}>
                            <Octicons
                                name="person"
                                size={27}
                                color="black">
                            </Octicons>
                        </TouchableOpacity> :
                        <Image className="h-full w-full border mt-0.5" source={{ uri: contact.imagepath }} style={{ width: 30, height: 30, borderRadius: 15 }}></Image>}
                        <TextInput
                            //multiline
                            id="message"
                            placeholder="Message..."
                            placeholderTextColor={'gray'}
                            onChangeText={setMessage}
                            value={message}
                            className={keyboard.keyboardShown && message == "" ? "max-h-28 w-[70%] pt-1.5 ml-3" : keyboard.keyboardShown && message != "" ? "max-h-8 w-[77.5%] pt-1.5 ml-3" : ! keyboard.keyboardShown && message != "" ? "max-h-8 w-[77.5%] pt-1.5 ml-3" : "max-h-28 w-[70%] pt-1.5 ml-3"}
                        />
                            {message == "" ? <TouchableOpacity
                                className={'pt-1'}
                                onPress={call}>
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