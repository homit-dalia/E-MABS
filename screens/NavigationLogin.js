import 'react-native-gesture-handler'
import React, {Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'


Stack = createNativeStackNavigator()

export default class NavigationLogin extends Component {

  render() {
    return (

      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>

    )
  }
};