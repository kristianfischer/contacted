import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from "react";
import { getDocs, collection, getFirestore } from "firebase/firestore"; 

const today = new Date();
const dayow = today.getDay();
const db = getFirestore();
var counter = 0;


    const getInfo = async () => {
        const infoList = [];
        const querySnapshot = await getDocs(collection(db, "Contacts"));
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

const buildNextCCards = async () => {

    try {
        const info = await retrieveInfo();

        var calendarcards = new Array();
        var calendarviews = new Array();

        for (let i = 0; i < 31; i++) {
            var reminderViews = new Array();
            var redViews = new Array();
            var blueViews = new Array();
            var greenViews = new Array();
            var dayname;

            var dayContacts = info.filter(contact => {
                const contactDate = new Date(contact.startdate);
                const targetDate = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
                return isMultipleOfIter(contactDate, targetDate, parseInt(contact.iterative));
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
                    if (j < 6) {
                        if (info[j].freqgen == "Weekly")
                            greenViews.push(<View className="bg-green-400 h-3 border-b-2" key={"reminder: " + j + ":" + i} ></View>);
                        else if (info[j].freqgen == "Monthly")
                            blueViews.push(<View className="bg-blue-400 h-3 border-b-2" key={"reminder: " + j + ":" + i} ></View>);
                        else if (info[j].freqgen == "Yearly")
                            redViews.push(<View className="bg-red-400 h-3 border-b-2" key={"reminder: " + j + ":" + i} ></View>);
                    }
                }
            }


            if (dayContacts.length > 0) {
                calendarviews.push(
                    <View
                        className=" bg-white mt-4"
                    >
                        <View className="pl-4">
                            <Text className="text-2xl">
                                {i== 0 ? "Today," : dayname +
                                    String(new Date(today.getTime() + i * 24 * 60 * 60 * 1000)).substring(4, 15)}
                            </Text>
                        </View>
                        {dayContacts.length > 1 ? (
                            <ScrollView className='space-y-3'>
                            {dayContacts.map(contact => (
                                <View key={contact.id} className="items-center pt-1 pb-3 rounded-md border-2 border-dotted bg-gray-100 mx-4 h-[28%] mt-4">
                                    <Text className="text-2xl text-center">{contact.first + " " + contact.last}</Text>
                                    <Text className="text-2xl text-center">
                                        {contact.freqgen}
                                    </Text>
                                    <Text className="text-xl text-center">{contact.freqspec}</Text>
                                </View>
                            ))}
                        </ScrollView>
                        ) : (
                            <View key={dayContacts[0].id} className="items-center pt-1 pb-3 rounded-md border-2 border-dotted bg-gray-100 mx-4 mt-4">
                                <Text className="text-2xl">{dayContacts[0].first + " " + dayContacts[0].last}</Text>
                                <Text className="text-2xl">
                                    {dayContacts[0].freqgen}
                                </Text>
                                <Text className="text-xl">{dayContacts[0].freqspec}</Text>
                            </View>
                        )}
                    </View>
                );
            } else if (i==0) {
                calendarviews.push(
                    <View
                        className=" bg-white mt-4"
                        key={new Date(today.getTime() + i * 24 * 60 * 60 * 1000).getDate()}
                    >
                        <View className="pl-4 mb-4">
                            <Text className="text-2xl">
                                {dayname +
                                    String(new Date(today.getTime() + i * 24 * 60 * 60 * 1000)).substring(4, 15)}
                            </Text>
                        </View>
                        <View className="items-center pt-1 rounded-md border-2 border-dotted bg-gray-100 mx-4">
                            <Text className="text-xl">
                                {"Looks like there's no one to contact today."}
                            </Text>
                            <Text className="text-xl mt-1 mb-4">
                                {"Add contacts to keep in touch!"}
                            </Text>
                        </View>
                    </View>
                );
            }

            for (let k = 0; k < redViews.length; k++)
                reminderViews.push(redViews[k]);
            for (let k = 0; k < blueViews.length; k++)
                reminderViews.push(blueViews[k]);
            for (let k = 0; k < greenViews.length; k++)
                reminderViews.push(greenViews[k]);

            
            {
                (i == 0 || reminderViews.length != 0) ?
                calendarcards.push(
                    <View className={'h-28 w-20 bg-gray-200 rounded-xl border-2'}>
                            <View className='h-20'>
                                <View className='flex-row h-7 bg-white rounded-t-xl w-full border-b-2'>
                                    <View className=' border-r-2'>
                                        <Text className={new Date(today.getTime() + (i * 24 * 60 * 60 * 1000)).getDate() > 9 ? ' pl-0.5 pr-0.5 text-lg' : ' pl-2 pr-2 text-lg'}>
                                            {new Date(today.getTime() + (i * 24 * 60 * 60 * 1000)).getDate()}
                                        </Text>
                                    </View>
                                    <View className=''>
                                        {sdow == "Thur" ? <Text className='pl-1 pt-0.5 text-lg'>{sdow}</Text> : sdow == "Tues" ? <Text className='pl-1 pt-0.5 text-lg'>{sdow}</Text> : sdow == "Sat" ? <Text className='pl-4 pt-0.5 text-lg'>{sdow}</Text> : sdow == "Sun" ? <Text className='pl-2 pt-0.5 text-lg'>{sdow}</Text> : sdow == "Fri" ? <Text className='pl-3 pt-0.5 text-lg'>{sdow}</Text> : <Text className='pl-2 pt-0.5 text-lg'>{sdow}</Text>}
                                    </View>
                                </View>
                                <View>
                                    {reminderViews.length != 0 ? reminderViews : <View className='bg-black'></View>}
                                </View>
                            </View>
                        </View>) :
                    counter++
            }
        }
            return [calendarcards, calendarviews];
        } catch (error) {
            console.error('Error building calendar cards:', error);
            return [];
        }
}

export default buildNextCCards;


