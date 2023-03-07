import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Button } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebase'

const RegisterScreen = () => {

  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function updateCredentials() {
    const update = {
      displayName: name,
      photoURL: null,
    };

    await auth.currentUser.updateProfile(update);
  }
  
  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        updateCredentials()
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message))
  }


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <Text style={styles.guidingText}>Enter your Name :</Text>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
          style={styles.input}
        />
        <Text style={styles.guidingText}>Enter your Phone number :</Text>
        <TextInput
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          style={styles.input}
          keyboardType='numeric'
          maxLength={10}
        />
        <Text style={styles.guidingText}>Enter your email address :</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <Text style={styles.guidingText}>Enter your password (minimum 6 characters) :</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>

      </View>
      {/* <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('+91 7600776754')}
      />
       <TextInput 
       value={code} 
       onChangeText={text => setCode(text)} />
        <Button title="Confirm Code" onPress={() => confirmCode()} /> */}

    </KeyboardAvoidingView>

  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    color: 'blue',
    flex: 1,
    backgroundColor: '#7b87ba',
  },
  guidingText: {
    color: 'white',
    fontSize: 18,
    margin: 15,
  },
  input: {
    alignSelf: 'center',
    width: '90%',
    backgroundColor: 'white',
    borderColor: 'black',
    color: 'black',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#2094FA',
    width: '64%',
    padding: 14,
    borderRadius: 13,
    alignItems: 'center',
  },
  buttonOutline: {

    marginTop: 15,
    borderColor: '#2094FA',
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: '#2b061e',
    fontWeight: '700',
    fontSize: 20,
  },
  backToLoginButton: {
    alignSelf: 'center',
    backgroundColor: '#ebd3e2',
    width: '40%',
    padding: 4,
    borderRadius: 10,
    alignItems: 'center',
  },
})