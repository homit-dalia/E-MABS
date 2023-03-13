import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useContext, createContext, useState } from 'react'
import { auth } from '../firebase'
import { downloadImage } from '../common'
import RNFetchBlob from 'rn-fetch-blob'

const AccountScreen = ({ route }) => {

  var user = auth.currentUser;


  const signOutUser = () => {

    RNFetchBlob.session('deleteOnSignOut').dispose().then(() => {

      console.log("Deleted all cached files")
      auth
        .signOut()
        .then(() => {
          console.log("Signed out")
        })
        .catch(error => alert(error.message))
    })


  }


  if (user.photoURL != null) {
    const userImageLocation = "file:///" + downloadImage(user.photoURL)
  }

  return (
    <View>
      <View >

        <View style={styles.userInfoContainerImageName}>
          <View style={styles.userImageContainer}>
            {user.photoURL != null ? (<Image style={styles.userImage} source={{ uri: user.photoURL }} />) : <Image style={styles.userImage} source={require('../sourceImages/human_icon.png')} />}
          </View>
          <View style={styles.userFullNameContainer}>
            {user.displayName != null ? <Text style={styles.userFullNameText}>{user.displayName} </Text> : null}
          </View>


        </View>
        <View>
          <Text style={styles.userMetadata}>
            Account created on : {user.metadata.creationTime}
          </Text>
          <Text style={styles.userMetadata}>
            Last sign in : {user.metadata.lastSignInTime}
          </Text>
        </View>
      </View>



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

  userInfoContainer: {
    backgroundColor: '#c6d9ec',
  },

  userInfoContainerImageName: {
    flexDirection: 'row',
    backgroundColor: '#c6d9ec',

  },
  userImageContainer: {
    margin: 20,

  },
  userImage: {
    width: 80,
    height: 80,

    borderRadius: 200,
  },
  userFullNameContainer: {
    //backgroundColor: 'black',
    alignSelf: 'center',
  },
  userFullNameText: {
    color: 'black',
    fontSize: 25,
    fontWeight: '500',
  },
  userMetadata: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 13,
    maxWidth: '100%',
  },
})