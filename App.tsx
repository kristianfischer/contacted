import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Login from "./src/Login";



export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Login />
    </View>
  );
}