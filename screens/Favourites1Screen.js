import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getStringData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
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

export async function listFiles()  {
  const reference = storage().ref(await getStringData("userID"));
  listFilesAndDirectories(reference).then(() => {
    console.log('Finished listing');
  });

}

function listFilesAndDirectories(reference, pageToken) {
  return reference.list({ pageToken }).then(result => {
    // Loop over each item
    result.items.forEach(ref => {
      console.log(ref.fullPath);
    });
    if (result.nextPageToken) {
      return listFilesAndDirectories(reference, result.nextPageToken);
    }

    return Promise.resolve();
  });
}



const Favourites1Screen = () => {
  return (
    <View>
      <Text>Fav 1 Screen</Text>
      <Ionicons name='bookmarks-outline' color={'coral'} size={40} />
      <TouchableOpacity onPress={listFiles}>
        <Text>Press Me</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Favourites1Screen;

const styles = StyleSheet.create({})