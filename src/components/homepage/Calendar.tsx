import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import calendarcards from './CalendarCard';
import { Octicons } from '@expo/vector-icons'; 


const Calendar = ({ }) => {
    return (
        <View className=' bg-white h-[22%] space-y-1  w-full'>
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
            </View> 
            <View className='items-center'>
                <ScrollView
                    className='w-full pt-3'
                    horizontal
                    showsHorizontalScrollIndicator={false}>
                    {calendarcards}
                </ScrollView>
            </View>      
        </View>
    );
};

export default Calendar;