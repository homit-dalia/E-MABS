import 'react-native-gesture-handler'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { auth } from './firebase'

import NavigationHome from './screens/NavigationHome';
import NavigationLogin from './screens/NavigationLogin';


Stack = createNativeStackNavigator()

function App() {

  console.log(auth)
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="LoginScreenStack" component={NavigationLogin} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="HomeScreenStack" component={NavigationHome} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})