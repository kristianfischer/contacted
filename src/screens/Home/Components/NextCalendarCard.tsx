import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React from "react";
import ReminderViews from './ReminderViews';
import person from "../../../../assets/person.png";


const today = new Date();
const dayow = today.getDay();

const NextCalendarCard = ({ contacts: contactList, onCardPress, next, num }) => {

    var contacts = []
    var dates = []

    function isMultipleOfIter(oldDate, today, counter) {
        const timeDiff = today.getTime() - oldDate.getTime();
        const daysDiff = Math.round(timeDiff / (24 * 60 * 60 * 1000));
        
        return daysDiff % counter === 0;
    }

    function getDay(i) {
        var dayname;
        var sdow = "";
        if ((dayow + i) % 7 == 1) {
            sdow = "Mon"
            dayname = "Monday, "
        }
        else if ((dayow + i) % 7 == 2) {
            sdow = "Tues"
            dayname = "Tuesday, "
        }
        else if ((dayow + i) % 7 == 3) {
            sdow = "Wed"
            dayname = "Wednesday, "
        }
        else if ((dayow + i) % 7 == 4) {
            sdow = "Thur"
            dayname = "Thursday, "
        }
        else if ((dayow + i) % 7 == 5) {
            sdow = "Fri"
            dayname = "Friday, "
        }
        else if ((dayow + i) % 7 == 6) {
            sdow = "Sat"
            dayname = "Saturday, "
        }
        else if ((dayow + i) % 7 == 0) {
            sdow = "Sun"
            dayname = "Sunday, "
        }
        return sdow;
    }

    for (let i = 0; i < num; i++) {
        var reminderViews = new Array();

        for (let j = 0; j < contactList.length; j++) {
            if (isMultipleOfIter(new Date(contactList[j].startdate), new Date(today.getTime() + (i * 24 * 60 * 60 * 1000)), parseInt(contactList[j].iterative))) {
                reminderViews.push(contactList[j]);
            }
        }

        if (reminderViews.length > 0 || i == 0 || !next) {
            contacts.push(reminderViews);
            dates.push(i);
        }
    }

    return (
            <FlatList
                className='w-full pt-3'
                horizontal
                showsHorizontalScrollIndicator={false}
                data={contacts}
                showsVerticalScrollIndicator={false}
                renderItem={({item: contact, index}) => {
                    return (
                        <TouchableOpacity
                            className='px-4'
                            onPress={() => {onCardPress(new Date(today.getTime() + (dates[index] * 24 * 60 * 60 * 1000)))}}>
                            <View className={'h-28 w-20 rounded-xl bg-gray-200'} key={index}>
                                <View className='h-20'>
                                    <View className='flex-row h-7 bg-gray-100 rounded-t-xl w-full border-b'>
                                        <View className=' border-r'>
                                            <Text className={new Date(today.getTime() + (dates[index] * 24 * 60 * 60 * 1000)).getDate() > 9 ? ' pl-0.5 pr-0.5 text-lg' : ' pl-2 pr-2 text-lg'}>
                                                {new Date(today.getTime() + (dates[index] * 24 * 60 * 60 * 1000)).getDate()}
                                            </Text>
                                        </View>
                                        <View className=''>
                                            {getDay(dates[index]) == "Thur" ? <Text className='pl-1.5 text-lg'>{getDay(dates[index])}</Text> : getDay(dates[index]) == "Tues" ? <Text className='pl-1.5 text-lg'>{getDay(dates[index])}</Text> : getDay(dates[index]) == "Sat" ? <Text className='pl-3 text-lg'>{getDay(dates[index])}</Text> : getDay(dates[index]) == "Sun" ? <Text className='pl-3 text-lg'>{getDay(dates[index])}</Text> : getDay(dates[index]) == "Fri" ? <Text className='pl-3.5 text-lg'>{getDay(dates[index])}</Text> : getDay(dates[index]) == "Wed" ? <Text className='pl-2 text-lg'>{getDay(dates[index])}</Text> : <Text className='pl-2.5 text-lg'>{getDay(dates[index])}</Text>}
                                        </View>
                                    </View>
                                    <ReminderViews contacts={contacts[index]} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />

    );
};

export default NextCalendarCard;