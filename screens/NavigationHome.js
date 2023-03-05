import React, { Component, useState } from 'react'
import { Button, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Ionicons from 'react-native-vector-icons/Ionicons'

import Favourites1Screen from './Favourites1Screen'
import Favourites2Screen from './Favourites2Screen'
import AddScreen from './AddScreen'
import SharedScreen from './SharedScreen'
import AccountScreen from './AccountScreen'

import { Dimensions } from 'react-native'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const fullScreenWidth = Dimensions.get('window').width;


function Fav1StackScreen(props) {


  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favourites"
        component={Favourites1Screen}
        options={{
          headerShown: false, 

          //not required
          headerRight: () => (
            <TouchableOpacity
            
            >
              <Ionicons name='reload-outline' color={'black'} size={25} />
            </TouchableOpacity>
          ),
          headerSearchBarOptions: true,
          // can remove code up until here

        }}
      />
    </Stack.Navigator>
  );
}

function Fav2StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Favourites 2' component={Favourites2Screen} />
    </Stack.Navigator>
  )
}

function AddStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Add Button' options={{ headerShown: false }} component={AddScreen} />
    </Stack.Navigator>
  )
}

function SharedStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Shared with you' component={SharedScreen} />
    </Stack.Navigator>
  )
}

function AccountStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Settings' component={AccountScreen} />
    </Stack.Navigator>
  )
}


export default class NavigationHome extends Component {

  render() {
    return (

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === "Fav 1") {
              iconName = focused ? 'bookmark' : 'bookmark-outline';
              color = focused ? '#5968ab' : '#9e9b98';
            } else if (route.name === "Fav 2") {
              iconName = focused ? 'bookmarks' : 'bookmarks-outline';
              color = focused ? '#5968ab' : '#9e9b98';

            } else if (route.name === "Add") {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
              color = focused ? '#5968ab' : '#9e9b98';
              size = 45;
            }
            else if (route.name === "Shared") {
              iconName = focused ? 'share-social' : 'share-social-outline';
              color = focused ? '#5968ab' : '#9e9b98';
            }
            else if (route.name === "Account") {
              iconName = focused ? 'key' : 'key-outline';
              color = focused ? '#5968ab' : '#9e9b98';
            }
            size = focused ? size + 10 : size;
            return <Ionicons name={iconName} color={color} size={size} />;
          },
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,

          // tabBarInactiveBackgroundColor: '#ebe7dd',
          // tabBarActiveBackgroundColor: "#dbd7ca",
          // tabBarInactiveTintColor: 'brown',

          tabBarStyle: {
            width: fullScreenWidth,
            //backgroundColor: '#ffc125',
            height: 60,
          },

        })}
      >
        <Tab.Screen name='Fav 1' options={{ headerShown: false }} component={Fav1StackScreen} />
        <Tab.Screen name='Fav 2' options={{ headerShown: false }} component={Fav2StackScreen} />
        <Tab.Screen name='Add' options={{ headerShown: false }} component={AddStackScreen} />
        <Tab.Screen name='Shared' options={{ headerShown: false }} component={SharedStackScreen} />
        <Tab.Screen name='Account' options={{ headerShown: false }} component={AccountStackScreen} />
      </Tab.Navigator>

    )
  }
};