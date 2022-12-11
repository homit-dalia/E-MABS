import React from 'react'

import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Favourites1Screen from '../screens/Favourites1Screen'
import Favourites2Screen from '../screens/Favourites2Screen'
import AddScreen from '../screens/AddScreen'
import SharedScreen from '../screens/SharedScreen'
import AccountScreen from '../screens/AccountScreen'
import { Dimensions } from 'react-native'


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const fullScreenWidth = Dimensions.get('window').width;

function Fav1StackScreen() {
    return(
        <Stack.Navigator>
            <Stack.Screen name='Fav 1' component={Favourites1Screen}/>
        </Stack.Navigator>
    )
}

function Fav2StackScreen() {
  return(
      <Stack.Navigator>
          <Stack.Screen name='Fav 1' component={Favourites2Screen}/>
      </Stack.Navigator>
  )
}

function AddStackScreen() {
  return(
      <Stack.Navigator>
          <Stack.Screen name='Fav 1' component={AddScreen}/>
      </Stack.Navigator>
  )
}

function SharedStackScreen() {
  return(
      <Stack.Navigator>
          <Stack.Screen name='Fav 1' component={SharedScreen}/>
      </Stack.Navigator>
  )
}

function AccountStackScreen() {
  return(
      <Stack.Navigator>
          <Stack.Screen name='Fav 1' component={AccountScreen}/>
      </Stack.Navigator>
  )
}




export default function Navigation() {
    return (
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
          activeTintColor: 'lightseagreen',
          inactiveTintColor: 'grey',
          showLabel: false,
          style: {
            width: fullScreenWidth,
            backgroundColor: '#ffc125',
            height: 60,
          },
        }}>
        <Tab.Screen name='Fav 1' component={Fav1StackScreen}/>
        <Tab.Screen name='Fav 2' component={Fav2StackScreen}/>
        <Tab.Screen name='Add' component={AddStackScreen}/>
        <Tab.Screen name='Shared' component={SharedStackScreen}/>
        <Tab.Screen name='Account' component={AccountStackScreen}/>
      </Tab.Navigator>
     </NavigationContainer>
    )
}