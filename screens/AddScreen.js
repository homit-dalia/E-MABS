import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DocumentPicker from 'react-native-document-picker'
import storage from '@react-native-firebase/storage';
import getPath from '@flyerhq/react-native-android-uri-path'

const AddScreen = () => {

  const chooseDocument = async () => {

    try {
      const file = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });

      console.log(file);
      uploadImage(file)
      
    } catch (error) {
      if(DocumentPicker.isCancel(error))
          console.log("User cancelled Document picker", error)
      else
          console.log(error)
    }
  };

  const uploadImage = async (file) => {

    console.log("Inside upload Image function")
    const reference = storage().ref(file.name)
    const newPath = getPath(file.uri)
    const pathToFile = newPath;
    reference.putFile(pathToFile);

    const task = reference.putFile(pathToFile);
    task.on('state_changed', taskSnapshot => {
      console.log(`${taskSnapshot.bytesTransferred/1000000}MB transferred out of ${taskSnapshot.totalBytes/1000000}MB`);
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


    </View>
  )
}

export default AddScreen

const styles = StyleSheet.create({})