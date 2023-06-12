import { Text, View, TouchableOpacity, TextInput } from 'react-native'; 
import ContactList from "./Components/ContactList";
import React, { useState, useEffect } from "react";
import AddContact from './Components/AddContact';
import ContactView from './Components/ContactView'
import { Octicons } from '@expo/vector-icons'; 
import ImportScreen from './Components/ImportScreen';
import { query, collection, getFirestore, onSnapshot } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";


const db = getFirestore();

const ContactScreen = () => {

    const [showAddContactScreen, setShowAddContactScreen] = useState(false);
    const [contactCards, setContactCards] = useState([]);
    const [filtercards, setFilterCards] = useState([]);
    const [filterb, setFilterB] = useState(false);
    const [conview, setConView] = useState(false);
    const [imview, setImView] = useState(false);
    const [contact, setContact] = useState();
    const [search, setSearch] = useState("");

    function sortContactsByUpdated(contacts) {
        const updatedContacts = contacts.filter(contact => contact.updated === "n");
        const otherContacts = contacts.filter(contact => contact.updated !== "n");
        const sortedContacts = updatedContacts.concat(otherContacts);
        return sortedContacts;
    }

    useEffect(() => {
        const q = query(collection(db, "Users", getAuth().currentUser.uid, "Contacts"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const contacts = [];
        querySnapshot.forEach((doc) => {
            contacts.push(doc.data());
        });
            setContactCards(sortContactsByUpdated(contacts))
        });

        return () => {
            unsubscribe()
        }

    }, []);


    const turnoffConview = () => {
        setConView(false)
    }

    const handleCardPress = (contact) => {
        setConView(true);
        setContact(contact);
    }

    function twoCalls(name) {
        setSearch(name);
        setFilterCards(filterSearch(name));
        setFilterB(false);
    }

    const filterSearch = (search) => {
        var lfiltercards = new Array();
        for (let i = 0; i < contactCards.length; i++) {
            if ((search.toLowerCase() == (contactCards[i].first + " " + contactCards[i].last).substring(0, search.length).toLowerCase()) && !lfiltercards.includes(contactCards[i])) {
                lfiltercards.push(contactCards[i]);
            }
        }
        return lfiltercards
    }

    const filterCards = (contacts) => {
        const profarr = [];
        const friendarr = [];
        const famarr = [];
        const filteredContactCards = []

        for (let i = 0; i < contacts.length; i++) {
            if (contacts[i].relation == "Professional")
                profarr.push(contacts[i]);
            else if (contacts[i].relation == "Friend")
                friendarr.push(contacts[i]);
            else if (contacts[i].relation == "Family")
                famarr.push(contacts[i]);
        }
    
        for (let k = 0; k < famarr.length; k++)
            filteredContactCards.push(famarr[k]);
        for (let k = 0; k < profarr.length; k++)
            filteredContactCards.push(profarr[k]);
        for (let k = 0; k < friendarr.length; k++)
            filteredContactCards.push(friendarr[k]);
        
        return filteredContactCards;
    }

    
    return (
        <View className='bg-custom w-full h-full'>
            <View className={(showAddContactScreen) ? 'flex-row space-x-36 bg-white' : 'flex-row space-x-52 pl-1.5 bg-white'}>
                {(showAddContactScreen || conview || imview) ?
                    <TouchableOpacity
                        className={!imview ? 'mt-12 ml-4 mb-2' : 'mt-12 ml-3 mb-2'}
                        onPress={() => {
                            showAddContactScreen == true ?
                                setShowAddContactScreen(false)
                                : conview == true ?
                                    setConView(false) : imview == true ? setImView(false):null
                        }}>
                        <Octicons
                            name="reply"
                            size={30}
                            color="black"
                        ></Octicons>
                    </TouchableOpacity>
                    :
                    <View className='flex-row pl-3'>
                        <Text className='mt-20 mb-1 text-3xl'>
                            Contacts
                        </Text>
                        <TouchableOpacity
                            className='mt-14 pt-0.5 pl-40 ml-1.5'
                            onPress={() => { setImView(true) }}>
                            <Octicons
                                name="upload"
                                size={26}
                                color="black"
                            ></Octicons>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className='mt-14 ml-2 pl-3.5'
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
                <AddContact onCardPress={setShowAddContactScreen}/>
            ) : conview == true ? < ContactView contact={contact} onCardPress={setConView} /> : imview == true ? < ImportScreen onCardPress={setImView} /> : (
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
            <ContactList contacts={filterb ? filterCards(contactCards) : search != "" ? filtercards : contactCards} onCardPress={handleCardPress} />
            {contactCards.length == 0 ? <Text className='text-center text-white mb-3'>Dont see anything? Add contacts to get started!</Text> : null}        
                </>
            )}
        </View>
    );
};

export default ContactScreen;