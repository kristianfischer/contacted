import { Text, TouchableOpacity, View } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { getAuth, signOut } from "firebase/auth"; 
import { useKeyboard } from "@react-native-community/hooks"


const AccBanner = ({ }) => {

    const SignOut = async () => {
        const auth = getAuth();
        signOut(auth)
    }

    const keyboard = useKeyboard();

    return (
        <View className={'bg-white w-full pt-7 border-b-2'}>
            <View className='flex-row w-full'>
                <View className={'items-end w-[90%] ml-5 mt-4'}>
                    <TouchableOpacity
                        onPress={SignOut}>
                        <Octicons
                            name="sign-out"
                            size={25}
                            color="black">
                        </Octicons>
                    </TouchableOpacity>
                </View>
                        
                </View>
                <Text className='text-3xl text-center font-semibold'>
                    Contacted
                </Text>
                
            
            </View>
    );
};

export default AccBanner;