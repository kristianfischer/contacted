import { View, Text, TouchableOpacity } from 'react-native';
import { Octicons } from '@expo/vector-icons'; 


export function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View className="flex-row pt-5">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        
        
        const icon = options.tabBarIcon;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            className='flex space-x-14 mb-3'
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
            key={route.name}
          >
            <View className='flex-col items-center'>
            <Octicons  
              name={route.name == "Contacts" ? "checklist" : route.name == "Add Contact" ? "people" : "light-bulb"}
              size={25} 
              color={isFocused? "#008080" : "black"}
              />
            <Octicons
              name= "dash"
              size={25} 
              color= {"white"} 
              />
              </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}