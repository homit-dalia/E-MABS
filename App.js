import { View, Text } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {NavigationContainer} from '@react-navigation/native'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Favourites1Screen from './screens/Favourites1Screen'
import Favourites2Screen from './screens/Favourites2Screen'
import AddScreen from './screens/AddScreen'
import SharedScreen from './screens/SharedScreen'
import AccountScreen from './screens/AccountScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import FolderScreen from './screens/FolderScreen'
import HomeScreen from './screens/HomeScreen'


const App = () => {
  
  const Stack = createNativeStackNavigator();
  return (
  <NavigationContainer>
      <Stack.Navigator> 
      {/* // initialRouteName="HomeTab"
      // >
      //<Stack.Screen name="HomeTab" getComponent={HomeTab}/> */}
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="Folder" component={FolderScreen}/>
        <Stack.Screen name="Home" component={HomeScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>

    
  )
}

const HomeTab = () => {

  const Tab = createBottomTabNavigator();


   <NavigationContainer>
    <Tab.Navigator 
    screenOptions={({route})=> ({
      tabBarIcon: ({focused, size, colour}) => {
        let iconName;
        if(route.name === "Fav 1"){
          iconName = focused ? 'bookmark' : 'bookmark-outline'; 
        }else if( route.name === "Fav 2")
          iconName = focused ? 'bookmarks' : 'bookmarks-outline';
        else if( route.name === "Add"){
          iconName = focused ? 'add-circle' : 'add-circle-outline'; 
          colour = 'coral'; 
          size = 35;
        }
        else if( route.name === "Shared")
         { iconName = focused ? 'share-social':'share-social-outline'; }
        else if( route.name === "Account")
          iconName = focused ? 'key' :'key-outline'; 
        size = focused ? size+10 :size;
        return <Ionicons name={iconName} colour={colour} size={size} />;
      },
  })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'grey',
        showLabel: false,
        style: {
          backgroundColor: '#ffc125',
          height: 60,
        },
      }}>
      <Tab.Screen name='Fav 1' component={Favourites1Screen}/>
      <Tab.Screen name='Fav 2' component={Favourites2Screen}/>
      <Tab.Screen name='Add' component={AddScreen}/>
      <Tab.Screen name='Shared' component={SharedScreen}/>
      <Tab.Screen name='Account' component={AccountScreen}/>
    </Tab.Navigator>
   </NavigationContainer>

}

export default App