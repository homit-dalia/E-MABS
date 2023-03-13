import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

const SharedScreen = () => {

  const [inputFilePath, setInputFilePath] = useState("");
  const [encryptFilePath, setEncryptFilePath] = useState("");
  const [encryptFilePassword, setEncryptFilePassword] = useState("");
  const [encryptInputFilePath, setEncryptInputFilePath] = useState("");
  const [decryptFilePath, setDecryptFilePath] = useState("");
  const [decryptFilePassword, setDecryptFilePassword] = useState("");
  const [fileIv, setFileIv] = useState("");
  const [fileSalt, setFileSalt] = useState("");



  //implement code here










  return (
    <View>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.square}></View>
          <Text style={styles.itemText}>Hello</Text>
        </View>
        <View style={styles.circular}></View>
      </View>
      <TouchableOpacity style={{alignSelf: 'center'}}
        onPress={()=>{}}>
        <Ionicons name='cloud-upload' color='red' size={40} />
      </TouchableOpacity>
    </View>
)}
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