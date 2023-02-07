import React, {Component} from 'react'
import { View, Button, Text } from 'react-native';
import { createAppContainer } from "react-navigation";

import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Ionicons from 'react-native-vector-icons/Ionicons'

import Favourites1Screen from './Favourites1Screen'
import Favourites2Screen from './Favourites2Screen'
import AddScreen from './AddScreen'
import SharedScreen from './SharedScreen'
import AccountScreen from './AccountScreen'

import { Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const fullScreenWidth = Dimensions.get('window').width;

//change name of All stack screens

function Fav1StackScreen() {
    return(
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }}name='Fav 1 Stack' component={Favourites1Screen}/>
        </Stack.Navigator>
    )
}

function Fav2StackScreen() {
  return(
      <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }}name='Fav 2 Stack' component={Favourites2Screen}/>
      </Stack.Navigator>
  )
}

function AddStackScreen() {
  return(
      <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }}name='Add Stack' component={AddScreen}/>
      </Stack.Navigator>
  )
}

function SharedStackScreen() {
  return(
      <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }}name='Shared Stack' component={SharedScreen}/>
      </Stack.Navigator>
  )
}

function AccountStackScreen() {
  return(
      <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }}name='Account Stack' component={AccountScreen}/>
      </Stack.Navigator>
  )
}

export default class NavigationHome extends Component {

  render(){
    console.log("NavigationHome----");
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
};