import React from 'react';
import Login from "./src/Login";
import { useEffect, useState } from 'react';
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import "./firebaseConfig"
import { UserContextProvider } from './src/providers/UserProvider';
import TabNavigator from './src/navigation/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import storage from "@react-native-async-storage/async-storage";
import { Platform } from 'react-native';


type UserState = User | undefined;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

export default function App() {

  useEffect(() => {

    const getPermission = async () => {
      if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Enable push notifications to use the app!');
            await storage.setItem('expopushtoken', "");
            return;
          }
          const token = (await Notifications.getExpoPushTokenAsync()).data;
          await storage.setItem('expopushtoken', token);
      } else {
        alert('Must use physical device for Push Notifications');
      }

        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
    }

    getPermission();

  }, []);



  const [user, setUser] = useState<UserState>(undefined);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthChecked(true);
    });
  
    return () => {
      unsubscribe();
    };
  }, []);
  
  if (!authChecked) return null;
  if (user === null) return <Login setUser={setUser} />

  return (
    <NavigationContainer>
      <UserContextProvider user={user}>
        <TabNavigator/>
      </UserContextProvider>
    </NavigationContainer>
  );
}
