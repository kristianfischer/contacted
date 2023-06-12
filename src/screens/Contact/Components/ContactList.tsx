import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native'; 
import React, { useState } from "react";
import { Octicons} from '@expo/vector-icons'; 



const ContactList = ({ contacts: contactList, onCardPress }) => {

    const [expandedContactId, setExpandedContactId] = useState(null);

    return (
            <FlatList
                className='w-full h-full space-y-2'
                data={contactList}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.first + " " + item.last}
                renderItem={({ item: contact }) => {
                const isExpanded = (contact.first + " " + contact.last) === expandedContactId;
                    return (
                        <TouchableOpacity
                            activeOpacity={.9}
                            onPress={() => {
                                setExpandedContactId(isExpanded ? null : contact.first + " " + contact.last);
                            } }
                            key={contact.first + " " + contact.last}
                            className={isExpanded? 'h-32 bg-white space-x-3 border-b border-gray-200' : 'h-14 bg-white space-x-3 border-b border-gray-200'}>
                            <View className='flex-row'>
                                <Image className="h-full w-full mt-1 ml-1" source={{ uri: contact.imagepath }} style={{ width: 47, height: 47, borderRadius: 23.5 }}></Image>
                                <View className='flex-col'>
                                    <Text className='text-lg font-semibold pt-5 w-52 pl-2'>
                                        {contact.first + " " + contact.last}
                                    </Text>
                                </View>
                                {contact.updated == "y" ?
                                <View className='items-end w-[30%]'>
                                    <View className='pt-1'>
                                        <Text className=''>{contact.freqspec}</Text>
                                    </View>
                                    <View className='pt-3 pl-2'>
                                        <Text className='text-custom font-semibold'>
                                            {contact.relation}
                                        </Text>
                                    </View>
                                </View> : 
                                <View className='items-end w-[30%]'>
                                    {!isExpanded ? <View className='flex-row pt-8'>
                                        <View className='rounded-xl h-4 w-4 bg-yellow-400'><Text className='ml-1.5'>!</Text></View>
                                        <Text className='pl-1'>
                                            Update Contact
                                        </Text>
                                    </View> : null}
                                </View>}
                            </View>
                            {isExpanded ?
                                <View className=''>
                                    <View className='flex-row'>
                                        <Text className='text-gray-500 pl-12 pt-0.5 w-[66%]'>Number: {contact.number.substring(0, 3).concat("-", contact.number.substring(3, 6), "-", contact.number.substring(6, 10))}</Text>
                                        <Text className='text-gray-500 pl-12 pt-0.5'>{(contact.metdate.substring(4, 7) != "May" && contact.metdate != "") ? contact.metdate.substring(4, 7) + ". " + contact.metdate.substring(11, contact.metdate.length) : contact.metdate.substring(4, 7) + " " + contact.metdate.substring(11, contact.metdate.length)}</Text>
                                    </View>
                                    <Text className='text-gray-500 pl-12 pt-0.5 w-[90%]'>Birthday: {contact.birthday}</Text>
                                    <View className='flex-row'>
                                    <Text className='text-gray-500 pl-12 pt-0.5 w-[90%]'>Next Contact: {contact.nextcon.substring(4, 15)}</Text>
                                        <TouchableOpacity className='pt-2.5'
                                            onPress={() => { onCardPress(contact) }}>
                                            <Octicons
                                                name="eye"
                                                size={22}
                                                color={"black"}
                                            ></Octicons>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                : null}
                        </TouchableOpacity>
                            )
                        }}
                    />

            );
};

export default ContactList;