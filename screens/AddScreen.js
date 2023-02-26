import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DocumentPicker from 'react-native-document-picker'
import storage from '@react-native-firebase/storage';
import getPath from '@flyerhq/react-native-android-uri-path'
import RNEncryptionModule from "@dhairyasharma/react-native-encryption"

const plainText = "Hello World"
const password = "1234"

async function encryptFile(file) {

  const newPath = getPath(file.uri)

  //create a new file path to store a temp file to be uploaded.
  //Use AsyncStorage or LocalStorage

  newFilePath = newPath + 'e' //this doesn't work
  console.log(`Old Path = ${newPath}, New Path (encrpted) = ${newFilePath}`)

  RNEncryptionModule.encryptFile(
    newPath,
    outputEncryptedFilePath,
    password
  ).then((res) => {
    if (res.status == "success") {
      console.log("success", res)
      uploadImage(file, outputEncryptedFilePath)
    } else {
      console.log("error", res);
    }
  }).catch((err) => {
    console.log(err);
  });

}

async function decryptFile(file) {

  RNEncryptionModule.decryptText(
    file.encryptedText,
    password,
    file.iv,
    file.salt).then((res) => {
      if (res.status == "success") {
        console.log("Successfully decrpted the file")
        console.log(res.decryptedText)
      } else {
        Alert.alert("Error", res);
      }
    }).catch((err) => {
      console.log(err);
    });
}


const AddScreen = () => {

  const chooseDocument = async () => {

    try {
      const file = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });

      console.log(file);
      encryptFile(file)


    } catch (error) {
      if (DocumentPicker.isCancel(error))
        console.log("User cancelled Document picker", error)
      else
        console.log(error)
    }
  };

  const uploadImage = async (file, outputEncryptedFilePath) => {

    console.log("Inside upload Image function")
    const reference = storage().ref(file.name)
    const newPath = getPath(outputEncryptedFilePath)
    const pathToFile = newPath;
    reference.putFile(pathToFile);

    const task = reference.putFile(pathToFile);
    task.on('state_changed', taskSnapshot => {
      console.log(`${taskSnapshot.bytesTransferred / 1000000}MB transferred out of ${taskSnapshot.totalBytes / 1000000}MB`);
    });

    task.then(() => {
      console.log('Image uploaded to the bucket!');
    });

  }

  return (
    <View >
      <Text>AddScreen</Text>
      <TouchableOpacity style={styles.uploadIcon}
        onPress={chooseDocument}>
        <Ionicons name='cloud-upload' color='#088821' size={40} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.uploadIcon}
        onPress={encryptFile}>
        <Ionicons name='hardware-chip-outline' color='#696969' size={80} />
      </TouchableOpacity>
    </View>
  )
}

export default AddScreen

const styles = StyleSheet.create({})