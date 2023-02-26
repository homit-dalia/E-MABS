import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'



const AccountScreen = () => {

  const navigation = useNavigation()
  const signOutUser = () => {
    console.log("In sign out function inside account.js")
    auth
      .signOut()
      .then(() => {
        console.log("Signed out")
      })
      .catch(error => alert(error.message))
  }

  return (
    <View>
      <Text>AccountScreen</Text>
      <TouchableOpacity
        onPress={signOutUser}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AccountScreen

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '68%',
    padding: 15,
    marginTop: 15,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center'
  },
})