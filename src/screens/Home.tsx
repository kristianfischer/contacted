import React, { useState } from "react";
import AccBanner from "../components/homepage/AccBanner";
import Calendar from "../components/homepage/Calendar";
import DraftMess from '../components/homepage/DraftMess';
import { ScrollView, View, TextInput, TouchableOpacity } from 'react-native';
import { Octicons } from '@expo/vector-icons'; 
import AI from "../components/homepage/AI";

const Home = ({ }) => {

    const [button, setButton] = useState("Draft");

    return (
        <View className="flex flex-1 items-end justify-start bg-white">
            < AccBanner />
            < Calendar />
        </View>
    );
};
export default Home;

