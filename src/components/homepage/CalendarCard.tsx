import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from "react";
import { getDocs, collection, getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";

const today = new Date();
const dayow = today.getDay();
const db = getFirestore();

const getInfo = async () => {
    const infoList = [];
    const querySnapshot = await getDocs(collection(db, "Users", getAuth().currentUser.uid, "Contacts"));
    querySnapshot.forEach((doc) => {
        infoList.push(doc.data());
    });
    return infoList;
};

const retrieveInfo = async () => {
    try {
        const info = await getInfo();
        return info;

    } catch (error) {
        console.error('Error retrieving contacts:', error);
        return []; 
    }
};


function isMultipleOfIter(oldDate, today, counter) {
    const timeDiff = today.getTime() - oldDate.getTime();
    const daysDiff = Math.round(timeDiff / (24 * 60 * 60 * 1000));
    
    return daysDiff % counter === 0;
}

const buildCalendarCards = async(handlePress) => {
    try {
        const info = await retrieveInfo();
        var calendarcards = new Array();
        var calendarviews = new Array();


        for (let i = 0; i < 7; i++) {
            var counter = 0;
            var images = [];
            var reminderViews = new Array();
            var dayname;

            var dayContacts = info.filter(contact => {
                const contactDate = new Date(contact.startdate);
                const targetDate = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
                return isMultipleOfIter(contactDate, targetDate, parseInt(contact.iterative))  && contact.updated == "y";
            });

            var sugContacts = info.filter(contact => {
                const contactDate = new Date(contact.startdate);
                const targetDate = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
                return !isMultipleOfIter(contactDate, targetDate, parseInt(contact.iterative))  && contact.updated == "y";
            });

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

            for (let j = 0; j < info.length; j++) {
                
                if (isMultipleOfIter(new Date(info[j].startdate), new Date(today.getTime() + (i * 24 * 60 * 60 * 1000)), parseInt(info[j].iterative))) {
                    counter++
                    images.push(info[j].imagepath);
                    if (counter <= 4) {
                        reminderViews.push(<Image className=" h-full w-full mb-2 border" key={"reminder: " + j + ":" + i} source={{ uri: info[j].imagepath }} style={{ width: 20, height: 20, borderRadius: 10}}></Image>);
                    }
                }
            }

            if (dayContacts.length > 0) {
                calendarviews.push(
                    <View
                        className=" bg-white mt-3"
                        key = {dayname + i}
                    >
                        <View className="pl-4" key = {dayname + i}>
                            <Text className="text-2xl font-semibold">
                            {i==0 ? "Today's Tasks: " + dayContacts.length : i == 1? "Tomorrow's Tasks" : dayname +
                                    String(new Date(today.getTime() + i * 24 * 60 * 60 * 1000)).substring(4, 10)}
                            </Text>
                        </View>
                        
                            <ScrollView className='space-y-2 h-[78%] mb-5' key={i}>
                                {dayContacts.map(contact => (
                                    <TouchableOpacity key={contact.id} className={"pb-3 mx-4 mt-3"} onPress={() => { handlePress(contact) }}>
                                        <View className='flex-row'>
                                            <View>
                                                <Image className="h-full w-full border-2 mb-2" source={{ uri: contact.imagepath }} style={{ width: 85, height: 85, borderRadius: 42.5 }}></Image>
                                            </View>
                                            <View className='flex-row w-[70%]'>
                                                <View className='flex-col ml-5 items-start'>
                                                    <View className='flex-row'>
                                                        <Text className="text-2xl text-center">{(contact.first.length + contact.last.length + 1 < 17) ? contact.first + " " + contact.last : contact.first + " " + contact.last.substring(0,1)}</Text>
                                                        <Text className='pt-4 pl-2 text-md'>{contact.freqspec}</Text>
                                                    </View>
                                                    <Text className='text-lg text-gray-500'>{contact.metdate.substring(4, 7) != "May" ? "Met: " + contact.metdate.substring(4, 7) + ". " + contact.metdate.substring(11, contact.metdate.length) : "Met: " + contact.metdate.substring(4, 7) + " " + contact.metdate.substring(11, contact.metdate.length)}</Text>
                                                    <View className='flex-row'>
                                                        <Text className='text-lg text-gray-500 w-28'>{contact.relation}</Text>
                                                        <View className='flex-row'>
                                                            <View className='mt-2 ml-7 bg-yellow-500 h-3 w-3 border-radius-1.5 rounded-lg'></View>
                                                            <Text className='mt-2 pl-1'>Not completed</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                                {sugContacts.length != 0 ? <Text className="text-xl mt-1 mb-3 ml-4 font-semibold">
                                    {"Suggested Contacts"}
                                </Text> : null}
                                {sugContacts.map(contact => (
                                    <TouchableOpacity key={contact.id} className={"pb-4 mx-4"} onPress={() => { handlePress(contact) }}>
                                        <View className='flex-row'>
                                            <View>
                                                <Image className="h-full w-full border-2 mb-2" source={{ uri: contact.imagepath }} style={{ width: 55, height: 55, borderRadius: 27.5 }}></Image>
                                            </View>
                                            <View className='flex-row'>
                                                <View className='flex-col ml-5 items-start'>
                                                    <View className='flex-row'>
                                                        <Text className="text-2xl w-48 text-start">{(contact.first.length + contact.last.length + 1 < 17) ? contact.first + " " + contact.last : contact.first + " " + contact.last.substring(0,1)}</Text>
                                                        <Text className='text-md text-gray-500 pt-3 pl-3'>{contact.metdate.substring(4, 7) != "May" ? contact.metdate.substring(4, 7) + ". " + contact.metdate.substring(11, contact.metdate.length) : contact.metdate.substring(4, 7) + " " + contact.metdate.substring(11, contact.metdate.length)}</Text>
                                                    </View>
                                                    <View className='flex-row'>
                                                        <Text className='text-lg text-gray-500 w-24'>{contact.relation}</Text>
                                                        <View className='flex-row'>
                                                            <View className='mt-2 ml-14 bg-green-500 h-3 w-3 border-radius-1.5 rounded-lg'></View>
                                                            <Text className='mt-2 pl-1'>Reach out now!</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                    </View>
                );
            } else {
                calendarviews.push(
                    <View
                        className=" bg-white mt-4 w-full h-[85%]"
                        key={new Date(today.getTime() + i * 24 * 60 * 60 * 1000).getDate()}
                    >
                        <View className="pl-4">
                            <Text className="text-2xl font-semibold">
                            {i==0 ? "No Tasks Today" : i == 1? "Tomorrow's Tasks" : dayname +
                                    String(new Date(today.getTime() + i * 24 * 60 * 60 * 1000)).substring(4, 10)}
                            </Text>
                        </View>
                        <ScrollView className="mx-4 pt-1 mb-8" showsVerticalScrollIndicator={false}>
                            <Text className="text-2xl text-center mb-5 mt-5">
                                {"You have nothing scheduled."}
                            </Text>
                            <Text className="text-xl mb-3 font-semibold">
                                {"Suggested Contacts"}
                            </Text>
                        
                            {sugContacts.map(contact => (
                                <TouchableOpacity key={contact.id} className="pb-4" onPress={() => { handlePress(contact) }}>
                                <View className='flex-row'>
                                    <View>
                                        <Image className="h-full w-full border-2 mb-2" source={{ uri: contact.imagepath }} style={{ width: 55, height: 55, borderRadius: 27.5 }}></Image>
                                    </View>
                                    <View className='flex-row'>
                                        <View className='flex-col ml-5 items-start'>
                                            <View className='flex-row'>
                                                <Text className="text-2xl w-48 text-start">{(contact.first.length + contact.last.length + 1 < 17) ? contact.first + " " + contact.last : contact.first + " " + contact.last.substring(0,1)}</Text>
                                                <Text className='text-md text-gray-500 pt-3 pl-3'>{contact.metdate.substring(4, 7) != "May" ? contact.metdate.substring(4, 7) + ". " + contact.metdate.substring(11, contact.metdate.length) : contact.metdate.substring(4, 7) + " " + contact.metdate.substring(11, contact.metdate.length)}</Text>
                                            </View>
                                            <View className='flex-row'>
                                                <Text className='text-lg text-gray-500 w-24'>{contact.relation}</Text>
                                                <View className='flex-row'>
                                                    <View className='mt-2 ml-14 bg-green-500 h-3 w-3 border-radius-1.5 rounded-lg'></View>
                                                    <Text className='mt-2 pl-1'>Reach out now!</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            ))}
                </ScrollView>
                    </View>
                );
            }

            

                calendarcards.push(
                    <View className={ i == 0 ? 'h-28 w-20 bg-gray-200 rounded-xl border-2' : 'h-28 w-20 bg-gray-200 rounded-xl border-2'} key={i}>
                        <View className='h-20'>
                            <View className='flex-row h-7 bg-white rounded-t-xl w-full border-b-2'>
                                <View className=' border-r-2'>
                                    <Text className={new Date(today.getTime() + (i * 24 * 60 * 60 * 1000)).getDate() > 9? ' pl-0.5 pr-0.5 text-lg' : ' pl-2 pr-2 text-lg'}>
                                            {new Date(today.getTime() + (i * 24 * 60 * 60 * 1000)).getDate()}
                                    </Text>
                                </View> 
                                <View className=''>
                                    {sdow == "Thur" ? <Text className='pl-1 pt-0.5 text-lg'>{sdow}</Text> : sdow == "Tues" ? <Text className='pl-1 pt-0.5 text-lg'>{sdow}</Text> : sdow == "Sat" ? <Text className='pl-3 pt-0.5 text-lg'>{sdow}</Text> : sdow == "Sun" ? <Text className='pl-2 pt-0.5 text-lg'>{sdow}</Text> : sdow == "Fri" ? <Text className='pl-3 pt-0.5 text-lg'>{sdow}</Text> : <Text className='pl-2 pt-0.5 text-lg'>{sdow}</Text>}
                                </View>
                            </View>
                            <View className='flex-row pt-12 pl-1'>
                                {reminderViews.length < 3 ? <View className='flex-row pt-2 space-x-1'>{reminderViews}</View>
                                    : <View className='flex-row'><View className='flex-row space-x-1 pt-2'>
                                        {reminderViews[0]}
                                        {reminderViews[1]}      
                                    </View>
                                    <Text className='text-xl pl-1 pt-1'>...</Text></View>
                                    }
                            </View>
                        </View>
                    </View>);
        }
            return [calendarcards, calendarviews];
        } catch (error) {
            console.error('Error building calendar cards:', error);
            return [];
        }
}

export default buildCalendarCards;


/**/