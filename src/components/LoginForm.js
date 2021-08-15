import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import firebase from '../utils/firebase'
import { validateEmail } from '../utils/validations'

export const LoginForm = ({ changeForm }) => {
  const [forData, setForData] = useState({ email: '', password: '' })
  const [forError, setForError] = useState({})

  const login = () => {
    const errors = {}
    if (!forData.email || !forData.password) {
      if (!forData.email) errors.email = true
      if (!forData.password) errors.password = true
    } else if (!validateEmail(forData.email)) {
      errors.email = true
    } else {
      firebase.auth()
        .signInWithEmailAndPassword(forData.email, forData.password)
        .then((response) => { setForData(response) })
        .catch(() => {
          setForError({
            email: true,
            password: true
          })
        })
    }
    setForError(errors)
  }

  const onChange = (e, type) => {
    setForData({ ...forData, [type]: e.nativeEvent.text })
  }

  return (
    <>
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        keyboardType='email-address'
        placeholder='Correo electronico'
        placeholderTextColor='#969696'
        style={[styles.txtInput, forError.email && styles.errorInput]}
        onChange={(e) => onChange(e, 'email')}
      />

      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        textContentType='password'
        placeholder='Contraseña'
        placeholderTextColor='#969696'
        secureTextEntry
        style={[styles.txtInput, forError.email && styles.errorInput]}
        onChange={(e) => onChange(e, 'password')}
      />

      <TouchableOpacity onPress={login} activeOpacity={0.8}>
        <Text style={styles.btnTxtLogin}>Iniciar sesión</Text>
      </TouchableOpacity>

      <View style={styles.btnRegister}>
        <TouchableOpacity
          onPress={changeForm}
          activeOpacity={0.8}
        >
          <Text style={styles.btnTxtLogin}>Registrate</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  txtInput: {
    backgroundColor: '#1e3040',
    borderColor: '#1e3040',
    borderRadius: 50,
    borderWidth: 1,
    color: '#fff',
    fontSize: 18,
    height: 50,
    marginBottom: 25,
    paddingHorizontal: 20,
    width: '80%'
  },
  btnTxtLogin: {
    color: '#fff',
    fontSize: 18
  },
  btnRegister: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 15
  },
  errorInput: {
    borderColor: '#940c0c'
  }
})
