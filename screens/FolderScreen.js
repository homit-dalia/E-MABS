import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { FlatList,KeyboardAvoidingView, ListViewBase, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase'

{/* <SafeAreaView style={styles.button}>
  <Text>Hello, Welcome to Home Screen</Text>
  <Image source={{uri: "https://picsum.photos/200" }}>
  
  </Image>
</SafeAreaView> */}

const Folders = () => {
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }
  const handleFileOpen = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Home")
      })
      .catch(error => alert(error.message))
  }
  
  return (
    <View>
      <Text style={styles.folderName}>  Folders</Text>
      <TouchableOpacity
          onPress={handleFileOpen}
          style={[]}
        > 
          <Text style={styles.fileNames}>
             Random.png
        </Text>
          

        </TouchableOpacity>
     
      <Text style={styles.fileNames}>
        Cat.png
      </Text>
      <Text style={styles.folderNames}>
        > Selection.zip
      </Text>
      <Text style={styles.folderNames}>
        > Student Docs.zip
      </Text>
      <Text style={styles.fileNames}>
        xlss.pdf
      </Text>
      <Text style={styles.fileNames}>
        study.pdf
      </Text>
      <Text style={styles.folderNames}>
        > assests_uncrompressed
      </Text>

        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Create new folder +</Text>
          

        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
        >
         <Text style={styles.buttonOutlineText}>Delete Files -</Text>
          

        </TouchableOpacity>

        <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
        
    </View>
  )
}

export default Folders

const styles = StyleSheet.create({

  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    marginTop: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'black',
    marginTop: 10,
    borderColor: '#0782F9',
    borderWidth: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 18,
  },
  folderName: {
    backgroundColor: 'grey',
    fontStyle: 'bold',
    width: '100%',
    color: 'black',
    fontSize: 30,
    fontWeight: '700'
 
  },
  listView: {
  
    padding: 15,
    margin: 5,
  },
  item: {
    padding: 15,
    color: 'brown',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  fileNames: {
    marginTop: 4,
    marginLeft: 30,
    fontSize: 23,
    padding: 10,
    color: 'black',
   
  },
  folderNames: {
    
    marginTop: 4,
    marginLeft: 30,
    fontSize: 23,
    padding: 10,
    color: 'black',
    backgroundColor: 'grey',
  
  },
})