import React, { Component } from 'react'

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

//change name of All stack screens

function Fav1StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name='Fav 1 Stack' component={Favourites1Screen} />
    </Stack.Navigator>
  )
}

function Fav2StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name='Fav 2 Stack' component={Favourites2Screen} />
    </Stack.Navigator>
  )
}

function AddStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name='Add Stack' component={AddScreen} />
    </Stack.Navigator>
  )
}

function SharedStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name='Shared Stack' component={SharedScreen} />
    </Stack.Navigator>
  )
}

function AccountStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name='Account Stack' component={AccountScreen} />
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
                  color = focused ? '#5e5c5a' : '#9e9b98';
                } else if (route.name === "Fav 2") {
                  iconName = focused ? 'bookmarks' : 'bookmarks-outline';
                  color = focused ? '#5e5c5a' : '#9e9b98';

                } else if (route.name === "Add") {
                  iconName = focused ? 'add-circle' : 'add-circle-outline';
                  color = focused ? '#5e5c5a' : '#9e9b98';
                  size = 45;
                }
                else if (route.name === "Shared") {
                  iconName = focused ? 'share-social' : 'share-social-outline';
                  color = focused ? '#5e5c5a' : '#9e9b98';
                }
                else if (route.name === "Account") {
                  iconName = focused ? 'key' : 'key-outline';
                  color = focused ? '#5e5c5a' : '#9e9b98';
                }
                size = focused ? size + 10 : size;
                return <Ionicons name={iconName} color={color} size={size} />;
              },
              tabBarShowLabel: false,

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
            <Tab.Screen name='Fav 1' component={Fav1StackScreen} />
            <Tab.Screen name='Fav 2' component={Fav2StackScreen} />
            <Tab.Screen name='Add' component={AddStackScreen} />
            <Tab.Screen name='Shared' component={SharedStackScreen} />
            <Tab.Screen name='Account' component={AccountStackScreen} />
          </Tab.Navigator>

    )
  }
};