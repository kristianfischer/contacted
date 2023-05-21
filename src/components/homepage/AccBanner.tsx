import { Text, TouchableOpacity, View } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { getAuth, signOut } from "firebase/auth"; 

const AccBanner = ({ }) => {

    const SignOut = async () => {
        const auth = getAuth();
        signOut(auth)
    }

    return (
        <View className='bg-white h-28 w-full pt-7 border-b-2'>
            <View className='items-end mr-5 mt-4'>
                <TouchableOpacity
                    onPress={SignOut}>
                    <Octicons
                        name="sign-out"
                        size={25}
                        color="black">
                    </Octicons>
                </TouchableOpacity>
            </View>
            <Text className=' text-3xl text-center'>
                    Contacted
            </Text>
            </View>
    );
};

export default AccBanner;