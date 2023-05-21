import { Text, View, TouchableOpacity } from 'react-native';
import React from "react";

const today = new Date();
const dayow = today.getDay();

        
var calendarcards = new Array();
for (let i = 0; i < 7; i++) {

    var sdow = "";
    if ((dayow + i) % 7 == 1)
        sdow = "Mon"
    else if ((dayow + i) % 7 == 2)
        sdow = "Tues"
    else if ((dayow + i) % 7 == 3)
        sdow = "Wed"
    else if ((dayow + i) % 7 == 4)
        sdow = "Thur"
    else if ((dayow + i) % 7 == 5)
        sdow = "Fri"
    else if ((dayow + i) % 7 == 6)
        sdow = "Sat"
    else if ((dayow + i) % 7 == 0)
        sdow = "Sun"

    
    calendarcards[i] = i == 0 ?
        <TouchableOpacity
        key={"calendar: " + i+1}
            className='px-6 space-y-2'>
            <View className='h-24 w-16 bg-white rounded-xl border-2'>
                <View>
                    <Text className='pt-1 pl-2 text-lg'>
                        {today.getDate()}
                    </Text>
                </View>
                <View>
                    {sdow == "Thur" ? <Text className='pl-4 pt-7 text-lg'>{sdow}</Text> : sdow == "Tues" ? <Text className='pl-4 pt-7 text-lg'>{sdow}</Text> :  sdow == "Sat" ? <Text className='pl-7 pt-7 text-lg'>{sdow}</Text>:sdow == "Sun" ? <Text className='pl-6 pt-7 text-lg'>{sdow}</Text> :<Text className='pl-8 pt-7 text-lg'>{sdow}</Text>}
                </View>
            </View>
        </TouchableOpacity> :
        <TouchableOpacity
            key={"calendar: " + i+1}
            className='px-6 space-y-2'>
            <View className='h-24 w-16 bg-white rounded-xl border-2 border-gray-400'>
                <View>
                    <Text className='pt-1 pl-2 text-lg'>
                        {today.getDate() + i}
                    </Text>
                </View>
                <View>
                    {sdow == "Thur" ? <Text className='pl-4 pt-7 text-lg'>{sdow}</Text> : sdow == "Tues" ? <Text className='pl-4 pt-7 text-lg'>{sdow}</Text> :  sdow == "Sat" ? <Text className='pl-7 pt-7 text-lg'>{sdow}</Text>:sdow == "Sun" ? <Text className='pl-6 pt-7 text-lg'>{sdow}</Text> :<Text className='pl-5 pt-7 text-lg'>{sdow}</Text>}
                </View>
            </View>       
        </TouchableOpacity>;
}

export default calendarcards;


