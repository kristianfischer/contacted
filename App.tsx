import { Text, View } from 'react-native';
import Login from "./src/Login";
import Home from "./src/screens/Home";
import { useEffect, useState } from 'react';
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import "./firebaseConfig"
import { UserContextProvider } from './src/providers/UserProvider';
import TabNavigator from './src/navigation/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';



type UserState = User | undefined;

export default function App() {



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
