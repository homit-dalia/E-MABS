import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginScreen from './LoginScreen'
import { TouchableOpacity } from 'react-native-gesture-handler'
import handleSignOut from './FolderScreen'

const AccountScreen = () => {
  return (
    <View>
      <Text>AccountScreen</Text>
      <TouchableOpacity
      onPress={handleSignOut}
      >
        
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AccountScreen

const styles = StyleSheet.create({})