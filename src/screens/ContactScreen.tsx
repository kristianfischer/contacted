import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Octicons } from '@expo/vector-icons'; 
import buildContactCards from "../components/addpage/ContactCard";
import React, { useState, useEffect } from "react";
import AddContact from './AddContact';
import ContactView from '../components/popups/ContactView'


const ContactScreen = () => {

    const [showAddContactScreen, setShowAddContactScreen] = useState(false);
    const [contactCards, setContactCards] = useState([]);
    const [conview, setConView] = useState(false);
    const [contact, setContact] = useState();
    var counter;

    useEffect(() => {
        const fetchContactCards = async () => {
            try {
                const cards = await buildContactCards(handleCardPress);
                setContactCards(cards);
            } catch (error) {
                console.error('Error fetching contact cards:', error);
            }
        };

        fetchContactCards();
    }, []);

    const handleCardPress = (contact) => {
        setConView(true);
        setContact(contact);
    }

    return (
        <View className='px-3 w-full h-full bg-white '>
            <View className={(showAddContactScreen) ? 'flex-row space-x-36 ml-3 mr-3' : 'flex-row space-x-52 ml-1.5'}>
                {(showAddContactScreen || conview) ?
                    <TouchableOpacity
                        className='mt-12 ml-2 mb-2'
                        onPress={() => {
                            showAddContactScreen == true ?
                                setShowAddContactScreen(!showAddContactScreen)
                            : conview == true ?
                                    setConView(!conview) : 
                            counter++
                            }}>
                        <Octicons
                            name="reply"
                            size={25}
                            color="black"
                        ></Octicons>
                    </TouchableOpacity>
                    :
                    <View className='flex-row space-x-52'>
                        <Text className='mt-20 text-3xl'>
                            Contacts
                        </Text>
                        <TouchableOpacity
                            className='mt-12'
                            onPress={() => { setShowAddContactScreen(!showAddContactScreen) }}>
                            <Octicons
                                name="plus"
                                size={30}
                                color="black"
                            ></Octicons>
                        </TouchableOpacity>
                    </View>}
            </View>
            {showAddContactScreen ? (
                <AddContact />
            ) : conview == true ? < ContactView contact={contact} /> : (
            <>
            <View className = 'flex-row space-x-4'>
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
            </ScrollView>
                </>
            )}
        </View>
    );
};

export default ContactScreen;