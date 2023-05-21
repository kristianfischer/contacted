import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Octicons } from '@expo/vector-icons'; 
import buildContactCards from "./ContactCard";
import React, { useState, useEffect } from "react";




const Contact = ({ }) => {

    const [contactCards, setContactCards] = useState([]);

    useEffect(() => {
        const fetchContactCards = async () => {
        try {
            const cards = await buildContactCards();
            setContactCards(cards);
        } catch (error) {
            console.error('Error fetching contact cards:', error);
        }
        };

        fetchContactCards();
    }, []);

    return (
        <View className='px-3 w-full h-[27%] bg-white '>
                <Text className=' text-2xl'>
                    Contacts
                </Text>
                <View className = 'flex-row space-x-9'>
                    <TouchableOpacity
                        className='rounded-3xl h-8 w-[80%] bg-gray-200 mb-3'>
                        <Text className='pt-2 pl-3'>
                            Search
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className='pt-1'>
                        <Octicons
                            name= "info"
                            size={25}
                            color = "black"
                        ></Octicons>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    className='w-full h-full pt-2 px-3 space-y-2'
                    showsVerticalScrollIndicator={false}>
                        {contactCards.map((card, index) => (
                            <React.Fragment key={index}>
                                <View className='mb-2'>{card}</View>
                            </React.Fragment>
                        ))}
                <View className='bg-white w-full h-.5'>
                </View>
                </ScrollView>
            </View> 
    );
};

export default Contact;