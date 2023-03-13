import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'

import { auth } from '../firebase'

import { getStringData} from '../common';
import { getURL } from '../common';

import RNFetchBlob from 'rn-fetch-blob'
import DocumentPicker from 'react-native-document-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import getPath from '@flyerhq/react-native-android-uri-path'


var user = auth.currentUser;
console.log(user)

const EditProfile = () => {


  
    const [name, setName ] = useState(null)
    const [image, setImage] = useState(null)

    const uploadImage = async (fileName, path) => {

        console.log("Inside upload Image function")
    
        const reference = storage().ref(`${await getStringData("userID")}/${await getStringData("userID")}.metadata/${fileName}`) //image will be uploaded here.
        const pathToFile = getPath(path);
        reference.putFile(pathToFile);
    
        const task = reference.putFile(pathToFile);
        task.on('state_changed', taskSnapshot => {
          console.log(`${taskSnapshot.bytesTransferred / 1000000}MB transferred out of ${taskSnapshot.totalBytes / 1000000}MB`);
        });
    
        task.then(() => {
          console.log('Image uploaded to the bucket!');
        });
      }

      const chooseDocument = async () => {
        try {
          const file = await DocumentPicker.pickSingle({
            type: [DocumentPicker.types.images]
          });
          console.log(file)
          uploadImage("userImage", file.uri)
        } catch (error) {
          if (DocumentPicker.isCancel(error))
            console.log("User cancelled Document picker", error)
          else
            console.log(error)
        }
      };

    async function updateProfile() {
        urlToBeSaved = await getStringData("userID") + ".metadata/userImage"
        console.log(urlToBeSaved)
        const update = {
            displayName: name,
            photoURL: await getURL(urlToBeSaved)
        };
    
        await auth.currentUser.updateProfile(update);
    
        console.log("Updated User Credentials")
        console.log(auth)
    }

    return (
        <View>

            <Text style={styles.guidingText}>Enter your Name</Text>

            <TextInput
                placeholder= ""
                value={name}
                onChangeText={text => setName(text)}
                style={styles.input}
            />
            <TouchableOpacity onPress={chooseDocument}>
                <Text>
                    Select your image
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={updateProfile}>
                <Text>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({})