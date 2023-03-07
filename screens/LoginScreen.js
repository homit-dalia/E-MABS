import 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import React, { useState, createContext } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

//import {auth} from '@react-native-firebase/auth'

import { auth } from '../firebase'



const LoginScreen = () => {




  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')

  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

  const navigation = useNavigation()
  console.log(navigation)



  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    try {
      const confirmation = await auth.signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.log("Error => ", error)
    }

  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }



  const handleLogin = () => {

    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        setUser(user)
      })
      .catch(error => alert(error.message))
  }

  const handleRegister = () => {
    navigation.navigate('Register')
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >

      <View style={styles.inputContainer}>
        {/* <Image style={styles.iconLogo}
         source={require("../images/emabs_icon.png")}/> */}
        <Text style={styles.text}>Welcome to E-MABS</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={
            text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => signInWithPhoneNumber('+91 7600776754')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login with Phone</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={handleRegister}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>

        <Text style={styles.textBottom}>One solution for all your storage needs</Text>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7b87ba',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    color: 'black',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    //margin: 3,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 10,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  text: {
    textAlign: 'center',
    marginBottom: 50,
    fontWeight: 'bold',
    fontSize: 30,
    color: '#063970',
  },
  textBottom: {
    marginTop: 50,
    fontSize: 12,
    color: 'white',
  },
  iconLogo: {
    width: 100,
    height: 100,

  }
})
