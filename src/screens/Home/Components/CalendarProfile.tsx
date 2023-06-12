import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


const CalendarProfile = ({ contacts: contactList, onCardPress, date }) => {

    const [task, setTask] = useState(null);

    const today = date;
    const dayow = today.getDay();

    const getStoredValue = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem('contactTasks');
            const storedValue = storedTasks ? JSON.parse(storedTasks) : {};
        if (storedValue !== null) {
            setTask(storedValue);
        } else {
            console.log('No stored value found');
        }
        } catch (error) {
        console.log('Error retrieving stored value:', error);
        }
    };

    const checkFirstOpenToday = async () => {
        const currentDate = new Date().toISOString().split('T')[0];
        try {
            const storedDate = await AsyncStorage.getItem('lastOpenDate');          
            if (storedDate === null || storedDate !== currentDate) {
                await AsyncStorage.removeItem('contactTasks');
                await AsyncStorage.setItem('lastOpenDate', currentDate);
            }
        } catch (error) {
            console.log('Error retrieving/storing date:', error);
        }
    };

    useEffect(() => {
        getStoredValue();
        checkFirstOpenToday();
    }, []);

    const storeValue = async (value, contactId) => {
        try {
            const storedTasks = await AsyncStorage.getItem('contactTasks');
            const tasks = storedTasks ? JSON.parse(storedTasks) : {};
            tasks[contactId] = value;
            await AsyncStorage.setItem('contactTasks', JSON.stringify(tasks));   
            setTask(tasks)
        } catch (error) {
            console.log('Error storing value:', error);
        }
    };


    var dayContacts = contactList.filter(contact => {
        const contactDate = new Date(contact.startdate);
        const targetDate = date;
        return isMultipleOfIter(contactDate, targetDate, parseInt(contact.iterative)) && contact.updated == "y";
    });

    var sugContacts = contactList.filter(contact => {
        const contactDate = new Date(contact.startdate);
        const targetDate = date;
        return !isMultipleOfIter(contactDate, targetDate, parseInt(contact.iterative))  && contact.updated == "y";
    });

    function sort(list) {
        list.sort((a, b) => {
            if (a.lastdate === " " && b.lastdate !== " ")
                return -1;
            else if (a.lastdate !== " " && b.lastdate === " ")
                return 1;
            else if (a.lastdate === " " && b.lastdate === " ")
                return a.last.localeCompare(b.last);
            else {
                var dateA = new Date(a.lastdate).getTime();
                var dateB = new Date(b.lastdate).getTime();
                return dateB - dateA;
            }
        });
    }

    sort(sugContacts);
    sort(dayContacts);

    function isMultipleOfIter(oldDate, today, counter) {
        const timeDiff = today.getTime() - oldDate.getTime();
        const daysDiff = Math.round(timeDiff / (24 * 60 * 60 * 1000));
        
        return daysDiff % counter === 0;
    }

    function getDay() {
        var dayname;
        var sdow = "";
        if ((dayow) % 7 == 1) {
            sdow = "Mon"
            dayname = "Monday, "
        }
        else if ((dayow) % 7 == 2) {
            sdow = "Tues"
            dayname = "Tuesday, "
        }
        else if ((dayow) % 7 == 3) {
            sdow = "Wed"
            dayname = "Wednesday, "
        }
        else if ((dayow) % 7 == 4) {
            sdow = "Thur"
            dayname = "Thursday, "
        }
        else if ((dayow) % 7 == 5) {
            sdow = "Fri"
            dayname = "Friday, "
        }
        else if ((dayow) % 7 == 6) {
            sdow = "Sat"
            dayname = "Saturday, "
        }
        else if ((dayow) % 7 == 0) {
            sdow = "Sun"
            dayname = "Sunday, "
        }
        return dayname;
    }
        

    return (
        (dayContacts.length != 0) ?
                <View
                    className=" bg-white mt-3"
                    key={date}
                >
                    <View className="pl-4">
                        <Text className="text-2xl font-semibold">
                            {(date.getDate() == new Date().getDate() && date.getMonth() == new Date().getMonth()) ? "Today's Tasks: " + dayContacts.length : (date.getDate() == new Date().getDate() + 1 && date.getMonth() == new Date().getMonth()) ? "Tomorrow's Tasks" : getDay() +
                                String(date).substring(4, 10)}
                        </Text>
                    </View>
                    <ScrollView className= 'space-y-1 h-[77%] mb-6' key={date}>
                    {dayContacts.map((contact, index) => (
                            <View>
                            <TouchableOpacity key={String(contact.first+contact.last+date)} className={"pb-2 mx-4 mt-3"} onPress={() => { onCardPress(contact), (date.getDate() == new Date().getDate() && date.getMonth() ==  new Date().getMonth() && task[contact.first+contact.last+String(date).substring(0,15)] != "Completed") ? storeValue("In Progress", contact.first+contact.last+String(date).substring(0,15)) : null }}>
                                <View className='flex-row'>
                                    <View>
                                        <Image className="h-full w-full mb-2" source={{ uri: contact.imagepath }} style={{ width: 85, height: 85, borderRadius: 42.5 }}></Image>
                                    </View>
                                    <View className='flex-row w-[70%]'>
                                        <View className='flex-col ml-5 items-start'>
                                            <View className='flex-row'>
                                                <Text className="text-2xl text-center">{(contact.first.length + contact.last.length + 1 < 17) ? contact.first + " " + contact.last : contact.first + " " + contact.last.substring(0,1)}</Text>
                                                <Text className='pt-4 pl-2 text-md'>{contact.freqspec}</Text>
                                            </View>
                                            <Text className='text-lg text-gray-500'>{contact.metdate.substring(4, 7) != "May" ? "Met: " + contact.metdate.substring(4, 7) + ". " + contact.metdate.substring(11, contact.metdate.length) : "Met: " + contact.metdate.substring(4, 7) + " " + contact.metdate.substring(11, contact.metdate.length)}</Text>
                                            <View className='flex-row'>
                                                <Text className='text-lg text-custom w-28'>{contact.relation}</Text>
                                                {task[contact.first+contact.last+String(date).substring(0,15)] == "Completed" && (date.getDate() == new Date().getDate() && date.getMonth() ==  new Date().getMonth())  ?
                                                <View className='flex-row'>
                                                    <View className='mt-2 ml-7 bg-green-500 h-3 w-3 border-radius-1.5 rounded-lg'></View>
                                                    <Text className='mt-2 pl-1'>Completed</Text>
                                                </View>
                                                    : task[contact.first+contact.last+String(date).substring(0,15)] == "In Progress" && (date.getDate() == new Date().getDate() && date.getMonth() ==  new Date().getMonth()) ?
                                                <View className='flex-row'>
                                                    <View className='mt-2 ml-7 bg-yellow-500 h-3 w-3 border-radius-1.5 rounded-lg'></View>
                                                    <Text className='mt-2 pl-1'>In Progress</Text>
                                                </View>
                                                    : (date.getDate() == new Date().getDate() && date.getMonth() ==  new Date().getMonth())  ?
                                                <View className='flex-row'>
                                                    <View className='mt-2 ml-7 bg-red-500 h-3 w-3 border-radius-1.5 rounded-lg'></View>
                                                    <Text className='mt-2 pl-1'>Not Started</Text>
                                                </View>
                                                    :
                                                <View className='flex-row'>
                                                    <View className='mt-2 ml-7 bg-custom h-3 w-3 border-radius-1.5 rounded-lg'></View>
                                                    <Text className='mt-1.5 text-gray-500 pl-1'>{(date.getDate() - new Date().getDate()) > 0 ? String((date.getDate() - new Date().getDate())) + " days" : "1 month"}</Text>
                                                </View>
                                                }
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {dayContacts.length > 1 && index != dayContacts.length-1 ? <View className='h-[0.5px] bg-gray-200 mx-3'></View> : null}
                            </View>
                        ))}
                        {sugContacts.length != 0 ? <Text className="text-xl mt-1 mb-2 ml-4 font-semibold">
                            {"Suggested Contacts"}
                        </Text> : null}
                    {sugContacts.length != 0 ? sugContacts.map((contact, index) => (
                            <View>
                            <TouchableOpacity key={contact.last + contact.first} className={"pb-2 pt-2.5 mx-4"} onPress={() => { onCardPress(contact) }}>
                                <View className='flex-row'>
                                    <View>
                                        <Image className="h-full w-full mb-2" source={{ uri: contact.imagepath }} style={{ width: 55, height: 55, borderRadius: 27.5 }}></Image>
                                    </View>
                                    <View className='flex-row'>
                                        <View className='flex-col ml-5 items-start'>
                                            <View className='flex-row'>
                                                <Text className="text-2xl w-48 text-start">{(contact.first.length + contact.last.length + 1 < 17) ? contact.first + " " + contact.last : contact.first + " " + contact.last.substring(0, 1)}</Text>
                                                <Text className={contact.lastdate != " " ? 'text-md text-gray-500 pt-3 pl-1.5' : 'text-md text-gray-500 pt-3'}>
                                                    {contact.lastdate == " " ? "First Contact" : contact.lastdate.substring(4, 7) != "May" ? contact.lastdate.substring(4, 7) + ". " + contact.lastdate.substring(11, contact.lastdate.length) : contact.lastdate.substring(4, 7) + " " + contact.lastdate.substring(11, contact.lastdate.length)}
                                                </Text>
                                            </View>
                                            <View className='flex-row'>
                                                <Text className='text-lg text-custom w-28'>{contact.relation}</Text>
                                                <View className='flex-row'>
                                                    <View className='mt-2 ml-14 bg-green-500 h-3 w-3 border-radius-1.5 rounded-lg'></View>
                                                    <Text className='mt-2 pl-1'>Reach out now!</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {sugContacts.length > 1 && index != sugContacts.length-1 ? <View className='h-[0.5px] bg-gray-200 mx-3'></View> : null}
                            </View>
                        )) : null}
                    </ScrollView>
                </View>
            : 
            <View
                className=" bg-white mt-3 w-full h-[85%]"
                key={date}
            >
                <View className="pl-4">
                    <Text className="text-2xl font-semibold">
                    {(date.getDate() == new Date().getDate() && date.getMonth() == new Date().getMonth()) ? "No Tasks Today" : (date.getDate() == new Date().getDate() + 1 && date.getMonth() == new Date().getMonth()) ? "Tomorrow's Tasks" : getDay() +
                            String(date).substring(4, 10)}
                    </Text>
                </View>
                <ScrollView className="mx-4 pt-1 mb-8" showsVerticalScrollIndicator={false}>
                    <Text className="text-2xl text-center mb-5 mt-3.5">
                        {"You have nothing scheduled."}
                    </Text>
                    <Text className="text-xl mb-2 font-semibold">
                        {"Suggested Contacts"}
                    </Text>
                
                    {sugContacts.length != 0 ? sugContacts.map((contact, index) => (
                        <View>
                        <TouchableOpacity key={contact.last} className="pb-1 pt-3" onPress={() => { onCardPress(contact) }}>
                            <View className='flex-row'>
                                <View>
                                    <Image className="h-full w-full mb-2" source={{ uri: contact.imagepath }} style={{ width: 55, height: 55, borderRadius: 27.5 }}></Image>
                                </View>
                                <View className='flex-row'>
                                    <View className='flex-col ml-5 items-start'>
                                        <View className='flex-row'>
                                            <Text className="text-2xl w-48 text-start">{(contact.first.length + contact.last.length + 1 < 17) ? contact.first + " " + contact.last : contact.first + " " + contact.last.substring(0, 1)}</Text>
                                            <Text className={contact.lastdate != " " ? 'text-md text-gray-500 pt-3 pl-1.5' : 'text-md text-gray-500 pt-3'}>
                                                    {contact.lastdate == " " ? "First Contact" : contact.lastdate.substring(4, 7) != "May" ? contact.lastdate.substring(4, 7) + ". " + contact.lastdate.substring(11, contact.lastdate.length) : contact.lastdate.substring(4, 7) + " " + contact.lastdate.substring(11, contact.lastdate.length)}
                                            </Text>
                                        </View>
                                        <View className='flex-row'>
                                            <Text className='text-lg text-custom w-28'>{contact.relation}</Text>
                                            <View className='flex-row'>
                                                <View className='mt-2 ml-14 bg-green-500 h-3 w-3 border-radius-1.5 rounded-lg'></View>
                                                <Text className='mt-2 pl-1'>Reach out now!</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            </TouchableOpacity>
                            {sugContacts.length > 1 && index != sugContacts.length-1 ? <View className='h-[0.5px] bg-gray-200 mx-3'></View> : null}
                            </View>
                    )) : null}
                </ScrollView>
            </View>

    );
};

export default CalendarProfile;