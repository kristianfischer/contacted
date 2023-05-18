import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Home";
import { MyTabBar } from "./TabBar";
import Recommendations from "../screens/Recommendations";
import AddContact from "../screens/AddContact";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen name = "Contacts" component={Home} options={{
        tabBarLabel: 'Contacts',
        }} />
      <Tab.Screen name="Add Contact" component={AddContact} options={{
        tabBarLabel: 'Add Contact',
        }} />
      <Tab.Screen name="Reccomendations" component={Recommendations} options={{
        tabBarLabel: 'Reccomendations',
        }} />
    </Tab.Navigator>
  );
}

export default TabNavigator