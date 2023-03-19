import { StyleSheet, Text, View, TouchableOpacity, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DocumentPicker from 'react-native-document-picker'
import RNFetchBlob from 'rn-fetch-blob'
import RNEncryptionModule from "@dhairyasharma/react-native-encryption";
import getPath from '@flyerhq/react-native-android-uri-path'
import { delay } from '../common'
import storage from '@react-native-firebase/storage';
import { getStringData } from '../common'

var RNFS = require("react-native-fs");
const SharedScreen = () => {





  return (
    <View>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.square}></View>
          <Text style={styles.itemText}>Hello</Text>
        </View>
        <View style={styles.circular}></View>
      </View>
      <TouchableOpacity style={{ alignSelf: 'center' }}
        onPress={()=> {}}>
        <Ionicons name='cloud-upload' color='red' size={40} />
      </TouchableOpacity>
    </View>
  )
}
export default SharedScreen
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },

})