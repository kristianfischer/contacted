import { View } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import React, { useState } from "react";
import AccBanner from "../components/homepage/AccBanner";
import Calendar from "../components/homepage/Calendar";
import Contact from "../components/homepage/Contact";
import DraftMess from "../components/homepage/DraftMess";

const Home = ({ }) => {

    const [message, setMessage] = useState("");

    const today = new Date();
    const dayow = today.getDay();
    var sdow = "";
    if (dayow == 1)
        sdow = "Mon"
    else if (dayow == 2)
        sdow = "Tues"
    else if (dayow == 3)
        sdow = "Wed"
    else if (dayow == 4)
        sdow = "Thurs"
    else if (dayow == 5)
        sdow = "Fri"
    else if (dayow == 6)
        sdow = "Sat"
    else if (dayow == 7)
        sdow = "Sun"

    const SignOut = async () => {
        const auth = getAuth();
        signOut(auth)
    }

    return (
        <View className="flex flex-1 items-end justify-start bg-black">
            < AccBanner />
            < Calendar />
            < Contact />
            < DraftMess />
        </View>
    );
};
export default Home;

/*<View className='flex-row bg-white h-28 w-full items-center space-x-52 pl-6 pt-7 border-b-2'>
                <Text className='items-center pt-8 text-2xl'>
                        Contacted
                </Text>
                <TouchableOpacity
                    className='pt-8'
                    onPress={SignOut}>
                    <Octicons
                        name={"sign-out"}
                        size={25} 
                        color={"black"}
                        />
                </TouchableOpacity>
            </View>
            
            
            <View className=' bg-white h-[25%] space-y-1  w-full'>
                <View>
                    <Text className = "pl-4 pt-2 text-2xl">
                        {"Kristian's Planner"}
                    </Text>
                </View> 
                <View className='items-center'>
                    <ScrollView
                        className='w-full pt-6'
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity
                            //onPress={CalendarView}  
                            className='px-6 space-y-2'>
                            <View className='h-24 w-16 bg-white rounded-xl border-2'>
                                <View>
                                <Text className='pt-1 pl-2 text-lg'>
                                    {today.getDate()}
                                    </Text>
                                </View>
                                <View>
                                    {sdow == "Thurs" ? <Text className='pl-5 pt-7 text-lg'>{sdow}</Text> : sdow == "Tues" ? <Text className='pl-5 pt-7 text-lg'>{sdow}</Text> : <Text className='pl-8 pt-7 text-lg'>{sdow}</Text>}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>      
            </View>
            
            
            <View className='px-3 w-full h-[22%] bg-white '>
                <Text className=' pt-2 text-2xl'>
                    Contacts
                </Text>
                <TouchableOpacity
                    className='rounded-3xl h-8 w-[80%] bg-gray-200'>
                    <Text className='pt-2 pl-3'>
                        Search
                    </Text>
                </TouchableOpacity>
                <ScrollView
                    className='w-full h-full pt-4 px-3'
                    showsVerticalScrollIndicator={false}>
                    <TouchableOpacity
                        //onPress={ContactView}
                        className='rounded-md h-14 bg-blue-200 space-x-3 border-2'>
                        <View className='flex-row space-x-52'>
                            <Text className='pl-3 pt-1'>
                                Name
                            </Text>
                            <Text className='pt-1'>
                                Number
                                </Text>
                        </View>
                        <View className='flex-row space-x-36'>
                            <Text className='pt-1 text-gray-400'>
                                Relationship
                            </Text>
                            <Text className='pt-1 text-gray-400'>
                                Frequency
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View> 
            
            <View className='px-3 w-full h-[40%] bg-white pt-3'>
                <View className='flex-row space-x-52'>
                    <Text className=' text-2xl'>
                        Messages
                    </Text>
                    <TouchableOpacity
                        className='pl-26 pt-1'>
                        <Octicons
                            name="paper-airplane"
                            size={25}
                            color="black">
                        </Octicons>
                </TouchableOpacity>
                </View>
                <View className='items-center pt-3'>
                    <TouchableOpacity
                    className='rounded-3xl h-8 w-[80%] bg-gray-200'>
                        <Text className='pt-2 pl-3'>
                            To:
                        </Text>
                    </TouchableOpacity>
                    <TextInput
                        id="message"
                        placeholder="Need inspiration? Visit reccomendations!"
                        onChangeText={setMessage}
                        value={message}
                        className=" m-3 border-2 pl-2 pb-24 rounded-xl h-[65%] w-[90%] bg-gray-100"
                        />   
                </View>
            </View>*/