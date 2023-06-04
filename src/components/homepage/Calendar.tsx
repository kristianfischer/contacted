import { Text, View, ScrollView, TouchableOpacity, Keyboard } from 'react-native';
import buildCalendarCard from './CalendarCard';
import buildNextCCards from './NextCCard';
import { useKeyboard } from "@react-native-community/hooks"
import React, { useState, useEffect } from "react";
import DraftMess from './DraftMess';
import AI from './AI';
import LastMess from './LastMess';
import * as Notifications from 'expo-notifications';



const Calendar = ({ }) => {

    const sendNotif = async () => {
        await Notifications.scheduleNotificationAsync({
        content: {
            title: "Title",
            body: "body",
            //data: { data: "data goes here" }
        },
        trigger: {
            
        }
        });
    }
        
    

    const [calendarCards, setCalendarCards] = useState([]);
    const [ncalendarCards, setNCalendarCards] = useState([]);
    const [calendarProfile, setCalendarProfile] = useState([]);
    const [ncalendarProfile, nsetCalendarProfile] = useState([]);
    const [pb, setPB] = useState(0);
    const [filter, setFilter] = useState("Next");
    const [pressed, setPressed] = useState(false);
    const [contact, setContact] = useState(null);
    const [ai, setAI] = useState(false);
    
    const touchpress = (contact) => {
        setPressed(true);
        setContact(contact);
        setAI(false);
    }

    const close = () => {
        setPressed(false);
    }

    const call = () => {
        Keyboard.dismiss;
        setAI(!ai);
        setPressed(false);
    }

    useEffect(() => {
        const fetchCalendarCards = async () => {
        try {
            const cards = await buildCalendarCard(touchpress);
            setCalendarCards(cards[0]);
            setCalendarProfile(cards[1]);
            const ncards = await buildNextCCards(touchpress);
            setNCalendarCards(ncards[0]);
            nsetCalendarProfile(ncards[1]);
        } catch (error) {
            console.error('Error fetching contact cards:', error);
        }
        };

        fetchCalendarCards();
    }, []);

    const keyboard = useKeyboard();

    var newcalendarCards = new Array();
    var newfocusedcalendarCards = new Array();

    for (let i = 0; i < ncalendarCards.length; i++){
        newfocusedcalendarCards.push(
            <TouchableOpacity
                className='px-4'
                onPress={() => {setPB(i)}}>
                {ncalendarCards[i]}
            </TouchableOpacity>
        )
    } 

    for (let i = 0; i < calendarCards.length; i++){
        newcalendarCards.push(
            <TouchableOpacity
                className='px-4'
                onPress={() => {setPB(i)}}>
                {calendarCards[i]}
            </TouchableOpacity>
        )
    } 

    return (
        <View className='h-full w-full'>
        <View className={(keyboard.keyboardShown || pressed || ai) ?  'w-full h-[43%] bg-white' : 'w-full h-[70%] bg-white'}>
            <View className={(keyboard.keyboardShown || pressed || ai) ?  'bg-white h-[45.55%] space-y-1 w-full mb-7' : 'bg-white h-[28%] space-y-1 w-full mb-7'}>
                    <View className='flex-row'>
                        <View>
                            <Text className = "pl-4 pt-2 text-2xl font-semibold">
                                {"Kristian's Planner"}
                            </Text>
                        </View>
                        <TouchableOpacity className={filter == "Next" ? 'h-7 w-16 ml-8 rounded-l-md mt-3 border-2' : 'h-7 w-16 ml-8 rounded-l-md mt-3 border-b-2 border-l-2 border-t-2 border-gray-400'}
                            onPress={() => {
                                setFilter("Next")
                                setPB(0)}}>
                            <Text className='text-center mt-1'>
                                Focused
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={filter == "Week" ? 'h-7 w-16 rounded-r-md mt-3 border-2' : 'h-7 w-16 rounded-r-md mt-3 border-b-2 border-r-2 border-t-2 border-gray-400'}
                            onPress={() => {
                                setFilter("Week")
                                setPB(0)}}>
                        <Text className='text-center mt-1'>
                                Weekly
                            </Text>
                        </TouchableOpacity>
                    </View> 
                    <View className='items-center'>
                        <ScrollView
                            className='w-full pt-3'
                            horizontal
                            showsHorizontalScrollIndicator={false}>
                            { filter == "Week" ? 
                                newcalendarCards.map((card, index) => (
                                    <React.Fragment key={index}>
                                        <View>{card}</View>
                                    </React.Fragment>
                                ))
                            : 
                                newfocusedcalendarCards.map((card, index) => (
                                    <React.Fragment key={index}>
                                        <View>{card}</View>
                                    </React.Fragment>
                                ))
                            }
                        </ScrollView>
                    </View>
                </View>
                <View className={(keyboard.keyboardShown || pressed || ai) ?  "bg-white h-[31.5%] w-full" : "bg-white h-[100%] w-full"}>
                    { filter == "Week" ?
                        <View className='bg-white'>
                            {calendarProfile[pb]}
                        </View>
                        :
                        <View className='bg-white'>
                            {ncalendarProfile[pb]}
                        </View>
                        }
                </View>
            </View>
            {(ai && !keyboard.keyboardShown) ? < AI /> : (pressed && !keyboard.keyboardShown) ? < LastMess props={contact} call={close} /> :  null}
            <DraftMess contact={contact} call={call} />
            </View>
    );
};

export default Calendar;