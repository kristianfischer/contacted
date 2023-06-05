import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native'; 
import buildImportCards from "./ImportCard";
import React, { useState, useEffect } from "react";
import AddContact from './AddContact';
import ContactView from './ContactView'
import { Octicons, Feather } from '@expo/vector-icons'; 
import * as Contacts from 'expo-contacts';


const ImportScreen = () => {
    const [importCards, setImportCards] = useState([]);
    const [search, setSearch] = useState("");
    const [filtercards, setFilterCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContactCards = async () => {
            try {
                const cards = await buildImportCards();
                setImportCards(cards);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching contact cards:', error);
                setLoading(false);
            }
        };

        fetchContactCards();
    }, []);

    function twoCalls(name){
        setSearch(name);
        setFilterCards(filterSearch(name));
    }

    const filterSearch = (search) => {
        var lfiltercards = new Array();
        for (let i = 0; i < importCards.length; i++) {
            if ((search.toLowerCase() == importCards[i].key.substring(0, search.length).toLowerCase()) && !lfiltercards.includes(importCards[i])) {
                lfiltercards.push(importCards[i]);
            }
        }
        return lfiltercards
    }    


    return (
        <View className='w-full h-[89.5%]'>
            <View className={'flex-row space-x-52 pl-1.5 bg-white'}>
                <View className='flex-row pl-3'>
                    <Text className='mt-3 text-3xl'>
                        Import Contacts
                    </Text>
                </View>
            </View>
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
            </View>
            {loading ? <View className='items-center pt-10'>
                <Feather
                    name="loader"
                    size={50}
                    color={"black"}>
                </Feather>
                <Text className='pt-2'>Please wait one moment</Text>
            </View> : null}
            <ScrollView
                className='w-full h-full space-y-2'
                showsVerticalScrollIndicator={false}>
                        {search != "" ?
                        filtercards.map((card, index) => (
                            <React.Fragment key={index}>
                                <View className ={index == 0 ? 'border-t' : null}>{card}</View>
                            </React.Fragment>))
                                : 
                        importCards.map((card, index) => (
                            <React.Fragment key={index}>
                                <View className ={index == 0 ? 'border-t' : null}>{card}</View>
                            </React.Fragment>
                        ))
                            } 
            </ScrollView> 
        </View>
    );
};

export default ImportScreen;