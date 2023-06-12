import React, { useState } from "react";
import AccBanner from "./Components/AccBanner";
import Calendar from "./Components/Calendar";
import { View } from 'react-native';

const Home = ({ }) => {


    return (
        <View className="flex flex-1 items-end justify-start bg-white">
            < AccBanner />
            < Calendar />
        </View>
    );
};
export default Home;

