import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  SafeAreaView, Right, Header, Container, Body, Title, FlatList, KeyboardAvoidingView,
  ListViewBase, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import Ionicons from 'react-native-vector-icons/Ionicons'

import RNFetchBlob from 'rn-fetch-blob'
import { fb } from '../firebase'
import { getStorage } from "firebase/storage";



const Folders = (props) => {
  //fix this line
  const navigation = useNavigation()
  async function chooseFile() {
    try {
      const file = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(
        file.uri,
        file.type,
        file.name,
        file.size,
      );
      const path = await normalizePath(file.uri)
      const result = await RNFetchBlob.fs.readFile(path, 'base64')
      //initialize firebase
      console.log('firebase app : ', fb)
      //upload file
      uploadFileToFirebaseStorage(fb, result, file);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {

      } else {
        throw err;
      }

    }
  }

  async function normalizePath(path) {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      const filePrefix = 'file://';
      if (path.startsWith(filePrefix)) {
        path = path.substring(filePrefix.length);
        try {
          path = decodeURI(path);
        } catch (e) { }
      }
    }
    return path;
  }

  async function uploadFileToFirebaseStorage(fb, result, file) {
    let uploadTask;
    try {
      const storage = getStorage(fb)
      console.log('uploadFileToFirebaseStorage : storage', storage)
      // uploadTask = storage
      //   .ref(`allFiles/${file.name}`)
      //   .putString(result, undefined, {contentType: file.type});
    } catch (error) {
      console.error('uploadFileToFirebaseStorage', error)
    }
    // uploadTask.on('state_changed',
    //   (snapshot) => {
    //     // Observe state change events such as progress, pause, and resume
    //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log('Upload is ' + progress + '% done');
    //     switch (snapshot.state) {
    //       case 'paused':
    //         console.log('Upload is paused');
    //         break;
    //       case 'running':
    //         console.log('Upload is running');
    //         break;
    //     }
    //   },
    //   (error) => {
    //     // Handle unsuccessful uploads
    //     console.error(error);
    //   },
    //   () => {
    //     // Handle successful uploads on complete
    //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       console.log('File available at', downloadURL);
    //     });
    //   }
    // );

  }

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login")
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
    <SafeAreaView>

      <Text style={styles.headerContainer}>
        <Text style={styles.pathName}>
          Folders
        </Text>


        <TouchableOpacity style={styles.uploadIcon}
          onPress={chooseFile}>
          <Ionicons name='cloud-upload' color='#0E86D4' size={40} />
        </TouchableOpacity>


      </Text>


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

    </SafeAreaView>
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
    backgroundColor: 'grey'
  },
  pathName: {
    // direction: 'rtl',
    // flexDirection: 'row',
    // flex: 1,
    backgroundColor: 'white',
    fontStyle: 'bold',
    width: '100%',
    color: 'black',
    fontSize: 30,
    fontWeight: '700',
    paddingHorizontal: 5,
    alignSelf: 'center'
  },
  uploadIcon: {
    flex: 2,
    //paddingHorizontal: 200,
  },
  headerContainer: {

  }
})