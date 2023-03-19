import { StyleSheet, Text, View, TouchableOpacity, Image, PermissionsAndroid, Alert } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DocumentPicker from 'react-native-document-picker'
import storage from '@react-native-firebase/storage';
import getPath from '@flyerhq/react-native-android-uri-path'
import RNEncryptionModule from "@dhairyasharma/react-native-encryption"
import { delay } from '../common';
import { getStringData } from '../common';


const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'E-MABS Storage Permission',
        message:
          'E-MABS needs access to your storage ' +
          'so you can encrypt and upload your awesome documents.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

      console.log('You can use the storage');
    } else {
      console.log('Storage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const AddScreen = () => {

  const [inputFilePath, setInputFilePath] = useState("");
  const [encryptFilePath, setEncryptFilePath] = useState("");
  const [encryptFilePassword, setEncryptFilePassword] = useState("");
  const [encryptInputFilePath, setEncryptInputFilePath] = useState("");
  const [decryptFilePath, setDecryptFilePath] = useState("");
  const [decryptFilePassword, setDecryptFilePassword] = useState("");
  const [fileIv, setFileIv] = useState("");
  const [fileSalt, setFileSalt] = useState("");


  async function selectDocument() {
    try {
      const file = await DocumentPicker.pickSingle({type: [DocumentPicker.types.allFiles]});
      console.log(file)

      const inpPath = getPath(file.uri)
      const extPath = getPath(file.uri)
      setInputFilePath("file:///" + inpPath)
      setEncryptFilePath("file:///" + extPath)
      console.log(inputFilePath, decryptFilePath)

      console.log("Before Delay")
      await delay(1000)
      console.log("After Delay")

      encryptFile()
      uploadImage(file.name)

    } catch (error) {
      if (DocumentPicker.isCancel(error))
        console.log("User cancelled Document picker")
      else
        console.log(error)
    }
  }

  async function encryptFile() {
    RNEncryptionModule.encryptFile(inputFilePath,encryptFilePath,"1234").then(
      (res) => {
      if (res.status == "success") {
        console.log(res)
        setEncryptInputFilePath(encryptFilePath);
        setDecryptFilePassword(encryptFilePassword);
        setFileIv(res.iv);
        setFileSalt(res.salt);


      } else {
        Alert.alert("Error", res.error);
      }
    });
  }

  const uploadImage = async (fileName) => {
    console.log("Inside upload Image function")
    const reference = storage().ref(`${await getStringData("userID")}/${fileName}`)

    const pathToFile = encryptFilePath;
    reference.putFile(pathToFile);

    const task = reference.putFile(pathToFile);
    task.on('state_changed', taskSnapshot => {
      console.log(`${taskSnapshot.bytesTransferred / 1000000}MB transferred out of ${taskSnapshot.totalBytes / 1000000}MB`);
    });

    task.then(() => {
      console.log('Image uploaded to the bucket!');
    });

  }

  function temp() {
  }
  return (
    <View >
      <View>
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerText}>Add Screen</Text>
          </View>
          <View style={styles.headerButtons}>
          </View>
        </View>
      </View>

      <Text>AddScreen</Text>
      <TouchableOpacity style={styles.uploadIcon}
        onPress={selectDocument}>
        <Ionicons name='cloud-upload' color='#088821' size={40} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.uploadIcon}
        onPress={encryptFile}>
        <Ionicons name='hardware-chip-outline' color='#696969' size={80} />
      </TouchableOpacity>
      <Text>launch Image Library Button </Text>
      {/* <TouchableOpacity style={styles.uploadIcon}
        onPress={launchImagePicker}>
        <Ionicons name='cloud-upload' color='grey' size={40} />
      </TouchableOpacity> */}
    </View>
  )
}


export default AddScreen

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    height: 55,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 15,
    marginLeft: 19,
    color: 'black'
  },
  headerButtons: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 10,
  },
})