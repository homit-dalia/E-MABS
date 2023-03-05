import { StyleSheet, Text, View, TouchableOpacity, Image, PermissionsAndroid, Alert } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DocumentPicker from 'react-native-document-picker'
import storage from '@react-native-firebase/storage';
import getPath from '@flyerhq/react-native-android-uri-path'
import RNEncryptionModule from "@dhairyasharma/react-native-encryption"
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNFetchBlob from 'rn-fetch-blob'
import { launchImageLibrary } from 'react-native-image-picker';
//import RNFetchBlob from "react-native-fetch-blob"

var RNFS = require("react-native-fs");

var password = "1234"

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
  const [fileSalt, setFileSalt] =useState("");

  function encryptFileImagePicker(response) {

    setEncryptFilePassword('1234')

    RNEncryptionModule.encryptFile(
      inputFilePath,
      encryptFilePath,
      encryptFilePassword
    ).then((res) => {
      if (res.status == "success") {
        setEncryptInputFilePath(encryptFilePath);
        setDecryptFilePassword(encryptFilePassword);
        setFileIv(res.iv);
        setFileSalt(res.salt);

        console.log(response)
        uploadImage(response.assets[0].fileName, encryptFilePath)

        
        Alert.alert("Successful");
      } else {
        Alert.alert("Error", res.error);
        console.log("In error encrypt image")
      }
    });
  }

  function launchImagePicker() {
    launchImageLibrary({
      mediaType: 'mixed',
    }).then(async (response) => {
      if (response.didCancel && response.assets == null) {
        console.log("Cancelled Image Picker")
      }
      else {
        if (
          Platform.OS == "android" &&
          response.assets[0].uri.startsWith("content://")
        ) {
          RNFetchBlob.fs
            .stat(response.assets[0].uri)
            .then((statResult) => {
              setInputFilePath(statResult.path);
            })
            .catch((err) => {
              console.log("Error ==>> ", err);
            });
        } else {
          setInputFilePath(response.assets[0].uri);
        }

        setEncryptFilePath(
          RNFS.DocumentDirectoryPath +
          "/Encrypted_" +
          response.assets[0].uri.split("/").pop()
        );

        encryptFileImagePicker(response)
        console.log(" encryptFileImagePicker Done")
      }
    })
  }

  const chooseDocument = async () => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(file)
      console.log(RNFS.DocumentDirectoryPath +
        "/Encrypted_" +
        file.uri.split("/").pop())
      setEncryptFilePath(
        RNFS.DocumentDirectoryPath +
        "/Encrypted_" +
        file.uri.split("/").pop()
      );
      encryptFile(file)
    } catch (error) {
      if (DocumentPicker.isCancel(error))
        console.log("User cancelled Document picker", error)
      else
        console.log(error)
    }
  };

  async function encryptFile(file) {

    const newPath = getPath(file.uri)
    console.log("Log New path", newPath)
    requestStoragePermission()

    RNFetchBlob.fs
      .stat(file.uri)
      .then((statResult) => {
        setInputFilePath(statResult.path);
      })
      .catch((err) => {
        console.log("Error ==>> ", err);
      });


    console.log("Input File Path just before encrypt function : ", inputFilePath)
    console.log("Output File Path just before encrypt function : ", encryptFilePath)


    RNEncryptionModule.encryptFile(
      inputFilePath,
      encryptFilePath,
      password
    ).then((res) => {
      if (res.status == "success") {
        console.log("success", res)
      } else {
        console.log("error", res);
      }
    }).catch((err) => {
      console.log(err);
    });

    console.log(file)
    uploadImage(file, encryptFilePath)
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

  const getStringData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      const userID = value
      console.log(`Fetched ${key} : ${value} from AsynStorage`)
      if (value !== null) {
        // value previously stored
        return value
      }
    } catch (e) {
      console.log(`Error Fetching AsyncStorage with key '${key}'`)
      // error reading value
    }
  }



  const uploadImage = async (fileName, outputEncryptedFilePath) => {

    console.log("Inside upload Image function")

    const reference = storage().ref(`${await getStringData("userID")}/${fileName}`)

    //const newPath = getPath(outputEncryptedFilePath)

    const pathToFile = outputEncryptedFilePath;
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
            <TouchableOpacity
              onPress={temp}
            >
              <Ionicons name='reload-outline' color={'black'} size={30} />
            </TouchableOpacity>
          </View>
        </View>

      </View>

      <Text>AddScreen</Text>
      <TouchableOpacity style={styles.uploadIcon}
        onPress={chooseDocument}>
        <Ionicons name='cloud-upload' color='#088821' size={40} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.uploadIcon}
        onPress={encryptFile}>
        <Ionicons name='hardware-chip-outline' color='#696969' size={80} />
      </TouchableOpacity>
      <Text>launch Image Library Button </Text>
      <TouchableOpacity style={styles.uploadIcon}
        onPress={launchImagePicker}>
        <Ionicons name='cloud-upload' color='grey' size={40} />
      </TouchableOpacity>
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