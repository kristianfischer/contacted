import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import buildCalendarCard from './CalendarCard';
import buildNextCCards from './NextCCard';
import { Octicons } from '@expo/vector-icons'; 
import React, { useState, useEffect } from "react";



const Calendar = ({ }) => {
    const [calendarCards, setCalendarCards] = useState([]);
    const [ncalendarCards, setNCalendarCards] = useState([]);
    const [calendarProfile, setCalendarProfile] = useState([]);
    const [ncalendarProfile, nsetCalendarProfile] = useState([]);
    const [pb, setPB] = useState(0);
    const [keylist, setKeylist] = useState([]);
    const [filter, setFilter] = useState("Week");

    useEffect(() => {
        const fetchCalendarCards = async () => {
        try {
            const cards = await buildCalendarCard();
            setCalendarCards(cards[0]);
            setCalendarProfile(cards[1]);
            const ncards = await buildNextCCards();
            setNCalendarCards(ncards[0]);
            nsetCalendarProfile(ncards[1]);
        } catch (error) {
            console.error('Error fetching contact cards:', error);
        }
        };

        fetchCalendarCards();
    }, []);

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
                onPress={() => { setPB(i) }}>
                {calendarCards[i]}
            </TouchableOpacity>
        )
    } 

    return (
        <View className='w-full h-[45%] bg-white'>
            <View className='bg-white h-[47%] space-y-1 w-full mb-3'>
                <View className='flex-row'>
                    <View>
                        <Text className = "pl-4 pt-2 text-2xl">
                            {"Kristian's Planner"}
                        </Text>
                    </View>
                    <View className='pl-2'>
                        <TouchableOpacity
                            className='pt-4'>
                            <Octicons
                                name="info"
                                size={20}
                                color = "black">
                            </Octicons>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity className={filter == "Week" ? 'h-7 w-16 ml-6 rounded-l-md mt-3 border-2' : 'h-7 w-16 ml-6 rounded-l-md mt-3 border-b-2 border-l-2 border-t-2 border-gray-400'}
                        onPress={() => {
                            setFilter("Week")
                            setPB(0)}}>
                        <Text className='text-center mt-1'>
                            Weekly
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className={filter == "Next" ? 'h-7 w-16 rounded-r-md mt-3 border-2' : 'h-7 w-16 rounded-r-md mt-3 border-b-2 border-r-2 border-t-2 border-gray-400'}
                        onPress={() => {
                            setFilter("Next")
                            setPB(0)}}>
                    <Text className='text-center mt-1'>
                            Focused
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
            <View className = "bg-white h-[28%] w-full">
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
    );
};

export default Calendar;