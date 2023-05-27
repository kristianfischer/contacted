import { Text, TouchableOpacity, View } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { getAuth, signOut } from "firebase/auth"; 
import React, { useState, useEffect } from "react";
import Messages from '../../screens/Messages';


const AccBanner = ({ }) => {
    const [showAddContactScreen, setShowAddContactScreen] = useState(false);

    const SignOut = async () => {
        const auth = getAuth();
        signOut(auth)
    }

    return (
        <View className={(showAddContactScreen) ? 'bg-white h-full w-full pt-7' : 'bg-white w-full pt-7 border-b-2'}>
            <View className= 'ml-3 mr-3'>
                {(showAddContactScreen) ?
                    <TouchableOpacity
                        className='mt-10 ml-2 mb-2'
                        onPress={() => { setShowAddContactScreen(!showAddContactScreen) }}>
                        <Octicons
                            name="reply"
                            size={25}
                            color="black"
                        ></Octicons>
                    </TouchableOpacity>
                    :
                    <View></View>}
            </View>
            {showAddContactScreen ? (
                < Messages />
            ) : (
                <>
                    <View className='flex-row w-full'>
                        <View className='items-start w-[50%] ml-5 mt-4'>
                            <TouchableOpacity
                                onPress={SignOut}>
                                <Octicons
                                    name="sign-out"
                                    size={25}
                                    color="black">
                                </Octicons>
                            </TouchableOpacity>
                        </View>
                        <View className='mt-4 w-[50%] items-end pr-10'>
                            <TouchableOpacity
                                    onPress={() => { setShowAddContactScreen(true) }}
                            >
                                <Octicons
                                    name="paper-airplane"
                                    size={25}
                                    color="black">
                                </Octicons>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text className='text-3xl text-center font-semibold'>
                        Contacted
                    </Text>
                </>
            )}
            </View>
    );
};

export default AccBanner;