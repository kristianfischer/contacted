import { Text, View, Image } from 'react-native';
import React from "react";

const ReminderViews = ({ contacts: contactList }) => {

    return (
        <View className='flex-row pl-1 pt-12 space-x-1' >
            {contactList.map((contact, index) => (
                (index < 2 && contactList.length > 0) ?
                    <Image className=" h-full w-full mb-2 mt-3" source={{ uri: contact.imagepath }} style={{ width: 20, height: 20, borderRadius: 10 }} key={contact.first}></Image>
                : null
            ))}
            {contactList.length > 2 ? <Text className='text-xl pl-0.5 pt-2'>...</Text> : null}
        </View>
    );
}

export default ReminderViews;