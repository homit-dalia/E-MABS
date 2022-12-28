import 'react-native-gesture-handler'
import React, { useEffect, Component } from 'react'

import {NavigationContainer} from '@react-navigation/native'

// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import FolderScreen from './FolderScreen'
import HomeScreen from './HomeScreen'
import { Button, View } from 'react-native';
import App from '../App';


// import SplashScreen from 'react-native-splash-screen'
Stack = createNativeStackNavigator()



export default class NavigationLogin extends Component {
  
//   useEffect(()=>{
//     SplashScreen.hide();
//   }, []);

  render(){
    return (  
      <NavigationContainer>
          <Stack.Navigator> 
            
            <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen}/>
         
            {/* have to remove these two screens as they are now in Navi */}
            <Stack.Screen options={{ headerShown: false }} name="Folder" component={FolderScreen}/>
            <Stack.Screen name="Home" component={HomeScreen} />
            
          </Stack.Navigator>
        </NavigationContainer>
    )
  }
};


// export default createAppContainer(NavigationLogin)