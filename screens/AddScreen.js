import { StyleSheet, Text, View, TouchableOpacity, Image, PermissionsAndroid, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DocumentPicker from 'react-native-document-picker'
import storage from '@react-native-firebase/storage';
import getPath from '@flyerhq/react-native-android-uri-path'
import RNEncryptionModule from "@dhairyasharma/react-native-encryption"
import { delay } from '../common';
import { getStringData } from '../common';
import firebase from 'firebase';
import userID from '../common'

fileName = ""
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
var RNFS = require("react-native-fs");

const AddScreen = () => {

  const [inputFilePath, setInputFilePath] = useState("");
  const [encryptFilePath, setEncryptFilePath] = useState("");
  const [encryptFilePassword, setEncryptFilePassword] = useState("");
  const [encryptInputFilePath, setEncryptInputFilePath] = useState("");
  const [decryptFilePath, setDecryptFilePath] = useState("");
  const [decryptFilePassword, setDecryptFilePassword] = useState("");
  const [fileIv, setFileIv] = useState("");
  const [fileSalt, setFileSalt] = useState("");


  useEffect(() => {
    if (encryptFilePath != "") {
      encryptFile()
    }
  }, [encryptFilePath]);

  useEffect(() => {
    if (encryptFilePath != "") {
      uploadImage()
    }
  }, [fileSalt])


  async function uploadMetadata(fileName) {
    //updating file metadata. To Do : Add location data
    var myCustomMetadata = {
      customMetadata: {
        'fileIv': fileIv,
        'fileSalt': fileSalt
      }
    }

    const reference = storage().ref(await getStringData("userID") + "/" + fileName);
    reference.updateMetadata(myCustomMetadata).then(() => {
      console.log("Added File Metadata")
    })
  }

  async function encryptFile() {
    console.log("Input File Path is - ", inputFilePath)
    RNEncryptionModule.encryptFile(inputFilePath, encryptFilePath, "1234").then((res) => {
      if (res.status == "success") {
        console.log(res)
        setEncryptInputFilePath(encryptFilePath);
        setDecryptFilePassword(encryptFilePassword);
        setFileIv(res.iv);
        setFileSalt(res.salt);

      } else {
        console.log("Error in encryption function - ", res.error);
      }
    });
  }

  async function selectDocument() {
    try {
      DocumentPicker
        .pickSingle({ type: [DocumentPicker.types.allFiles] })
        .then((file) => {
          console.log(file)
          fileName = file.name
          setInputFilePath("file:///" + getPath(file.uri))
          setEncryptFilePath("file:///" + RNFS.TemporaryDirectoryPath + "/Encrypted_" + file.name)
          console.log("\n", inputFilePath, "\n", encryptFilePath)
        })
    } catch (error) {
      if (DocumentPicker.isCancel(error))
        console.log("User cancelled Document picker")
      else
        console.log(error)
    }
  }

  const uploadImage = async () => {
    //console.log("Inside upload Image function")
    const reference = storage().ref(`${await getStringData("userID")}/${fileName}`)

    const pathToFile = encryptFilePath;
    reference.putFile(pathToFile);

    const task = reference.putFile(pathToFile);
    task.on('state_changed', taskSnapshot => {
      console.log(`${taskSnapshot.bytesTransferred / 1000000}MB transferred out of ${taskSnapshot.totalBytes / 1000000}MB`);
    });

    task.then(() => {
      console.log('Image uploaded to the bucket!');
      uploadMetadata(fileName)
      setEncryptFilePath("")
      setFileSalt("")
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
        onPress={updateTempMetadata}>
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