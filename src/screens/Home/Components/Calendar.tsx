import { Text, View, TouchableOpacity, Keyboard } from 'react-native';
import NextCalendarCard from './NextCalendarCard';
import { useKeyboard } from "@react-native-community/hooks"
import React, { useState, useEffect } from "react";
import DraftMess from './DraftMess';
import AI from './AI';
import LastMess from './LastMess';
import { query, collection, getFirestore, onSnapshot } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";
import CalendarProfile from './CalendarProfile';

const db = getFirestore();

const Calendar = ({ }) => {
    const [date, setDate] = useState(new Date());
    const [contacts, setContactCards] = useState([])
    const [filter, setFilter] = useState("Next");
    const [pressed, setPressed] = useState(false);
    const [contact, setContact] = useState(null);
    const [ai, setAI] = useState(false);
    
    const touchpress = (contact) => {
        setPressed(true);
        setContact(contact);
        setAI(false);
    }

    const call = () => {
        Keyboard.dismiss;
        setAI(!ai);
        setPressed(false);
    }

    useEffect(() => {
        const q = query(collection(db, "Users", getAuth().currentUser.uid, "Contacts"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const contacts = [];
        querySnapshot.forEach((doc) => {
            contacts.push(doc.data());
        });
            setContactCards(contacts)
        });

        return () => {
            unsubscribe()
        }

    }, []);

    const keyboard = useKeyboard();





    return (
        <View className='h-full w-full'>
        <View className={(keyboard.keyboardShown || pressed || ai) ?  'w-full h-[43%] bg-white' : 'w-full h-[70%] bg-white'}>
            <View className={(keyboard.keyboardShown || pressed || ai) ?  'bg-white h-[45.55%] space-y-1 w-full mb-7' : 'bg-white h-[28%] space-y-1 w-full mb-7'}>
                    <View className='flex-row'>
                        <View className='w-[53%]'>
                            <Text className = "pl-4 pt-2 text-2xl font-semibold">
                                My Planner
                            </Text>
                        </View>
                        <TouchableOpacity className={filter == "Next" ? 'h-7 w-16 ml-8 rounded-l-md mt-3 border-2 border-custom bg-custom' : 'h-7 w-16 ml-8 rounded-l-md mt-3 border-b border-l border-t bg-gray-200 border-gray-200'}
                            onPress={() => {
                                setFilter("Next")
                                setDate(new Date())
                                }}>
                            <Text className={filter == "Next" ? 'text-center mt-1 text-white font-semibold' : 'text-center mt-1 font-semibold'}>
                                Focused
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={filter == "Week" ? 'h-7 w-16 rounded-r-md mt-3 border-2 border-custom bg-custom' : 'h-7 w-16 rounded-r-md mt-3 border-b border-r border-t border-gray-200 bg-gray-200'}
                            onPress={() => {
                                setFilter("Week")
                                setDate(new Date())
                                }}>
                            <Text className={filter == "Week" ? 'text-center mt-1 text-white font-semibold' : 'text-center mt-1 font-semibold'}>
                                Weekly
                            </Text>
                        </TouchableOpacity>
                    </View> 
                    <View className='items-center'>
                        { filter == "Week" ? 
                            <NextCalendarCard contacts={contacts} onCardPress={setDate} next={false} num={7} />
                        : 
                            <NextCalendarCard contacts={contacts} onCardPress={setDate} next={true} num={31} />
                        }
                    </View>
                </View>
                <View className={(keyboard.keyboardShown || pressed || ai) ?  "bg-white h-[31.5%] w-full" : "bg-white h-[100%] w-full"}>
                    { filter == "Week" ?
                        <View className='bg-white'>
                            <CalendarProfile contacts = {contacts} onCardPress = {touchpress} date = {date}/>
                        </View>
                        :
                        <View className='bg-white'>
                            <CalendarProfile contacts = {contacts} onCardPress = {touchpress} date = {date}/>
                        </View>
                        }
                </View>
            </View>
            {(ai) ? < AI /> : (pressed && !keyboard.keyboardShown) ? < LastMess props={contact} call={setPressed} /> :  null}
            <DraftMess contact={contact} call={call} date={date} ai={ai} />
            </View>
    );
};

export default Calendar;