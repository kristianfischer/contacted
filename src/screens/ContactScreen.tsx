import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native'; 
import buildContactCards from "../components/addpage/ContactCard";
import React, { useState, useEffect } from "react";
import AddContact from '../components/addpage/AddContact';
import ContactView from '../components/addpage/ContactView'
import { Octicons } from '@expo/vector-icons'; 
import ImportScreen from '../components/addpage/ImportScreen';


const ContactScreen = () => {

    const [showAddContactScreen, setShowAddContactScreen] = useState(false);
    const [contactCards, setContactCards] = useState([]);
    const [filtercards, setFilterCards] = useState([]);
    const [filterb, setFilterB] = useState(false);
    const [conview, setConView] = useState(false);
    const [imview, setImView] = useState(false);
    const [contact, setContact] = useState();
    const [search, setSearch] = useState("");
    const [filterbcards, setFilterBCards] = useState([]);

    useEffect(() => {
        const fetchContactCards = async () => {
            try {
                const cards = await buildContactCards(handleCardPress);
                setContactCards(cards[0]);
                setFilterBCards(cards[1]);
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

    function twoCalls(name){
        setSearch(name);
        setFilterCards(filterSearch(name));
        setFilterB(false);
    }

    const filterSearch = (search) => {
        var lfiltercards = new Array();
        for (let i = 0; i < contactCards.length; i++) {
            if ((search.toLowerCase() == contactCards[i].key.substring(0, search.length).toLowerCase()) && !lfiltercards.includes(contactCards[i])) {
                lfiltercards.push(contactCards[i]);
            }
        }
        return lfiltercards
    }

    return (
        <View className=' w-full h-full'>
            <View className={(showAddContactScreen) ? 'flex-row space-x-36 bg-white' : 'flex-row space-x-52 pl-1.5 bg-white'}>
                {(showAddContactScreen || conview || imview) ?
                    <TouchableOpacity
                        className='mt-12 ml-6 mb-2'
                        onPress={() => {
                            showAddContactScreen == true ?
                                setShowAddContactScreen(!showAddContactScreen)
                                : conview == true ?
                                    setConView(!conview) : imview == true ? setImView(!imview) :
                                        null
                        }}>
                        <Octicons
                            name="reply"
                            size={25}
                            color="black"
                        ></Octicons>
                    </TouchableOpacity>
                    :
                    <View className='flex-row pl-3'>
                        <Text className='mt-20 text-3xl'>
                            Contacts
                        </Text>
                        <TouchableOpacity
                            className='mt-16 pt-6 ml-4'
                            onPress={() => { setImView(true) }}>
                            <Octicons
                                name="upload"
                                size={23}
                                color="black"
                            ></Octicons>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className='mt-12 mb-10 ml-40 pl-3.5'
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
            ) : conview == true ? < ContactView contact={contact} /> : imview == true ? < ImportScreen /> : (
            <>
            <View className = 'flex-row space-x-4 pl-3 bg-white'>
                <TouchableOpacity
                    disabled = {true}
                    className='rounded-3xl h-8 w-[80%] bg-gray-200 mb-3'>
                    <TextInput className='pt-2 pl-3'
                        onChangeText={twoCalls}          
                        placeholder="Search"
                        value={search}
                        placeholderTextColor={"black"}
                        >
                    </TextInput>
                </TouchableOpacity>
                <TouchableOpacity
                    className='pt-1 pl-2'
                    onPress={() => { setFilterB(!filterb) }}>
                    <Octicons
                        name= "filter"
                        size={25}
                        color = "black"
                    ></Octicons>
                </TouchableOpacity>
            </View>
            <ScrollView
                className='w-full h-full space-y-2'
                showsVerticalScrollIndicator={false}>
                    {filterb ?
                        filterbcards.map((card, index) => (
                            <React.Fragment key={index}>
                                <View className ={index == 0 ? 'border-t' : null}>{card}</View>
                            </React.Fragment>))
                                : search != "" ?
                        filtercards.map((card, index) => (
                            <React.Fragment key={index}>
                                <View className ={index == 0 ? 'border-t' : null}>{card}</View>
                            </React.Fragment>))
                                : 
                        contactCards.map((card, index) => (
                            <React.Fragment key={index}>
                                <View className ={index == 0 ? 'border-t' : null}>{card}</View>
                            </React.Fragment>
                        ))
                            } 
                        </ScrollView>   
                        {contactCards.length == 0 ? <Text className='text-center text-gray-400 mb-3'>Dont see anything? Add connections to get started!</Text> : null}        
                </>
            )}
        </View>
    );
};

export default ContactScreen;