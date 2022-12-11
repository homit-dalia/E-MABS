//import 'react-native-gesture-handler'
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
        {/* <Stack.Screen name='Navigation' component={Navigation}/> */}
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="Folder" component={FolderScreen}/>
        <Stack.Screen name="Home" component={HomeScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>

    
  )
}


export default App