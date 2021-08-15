import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native'

import { validateEmail } from '../utils/validations'

const defaultValue = () => {
  return {
    email: '',
    password: '',
    repeatPassword: ''
  }
}

export const RegisterForm = ({ changeForm }) => {
  const [forData, setForData] = useState(defaultValue)
  const [forError, setForError] = useState({})

  const register = () => {
    const errors = {}
    if (!forData.email || !forData.password || !forData.repeatPassword) {
      if (!forData.email) errors.email = true
      if (!forData.password) errors.password = true
      if (!forData.repeatPassword) errors.repeatPassword = true
    } else if (!validateEmail(forData.email)) {
      errors.email = true
    } else if ((forData.password !== forData.repeatPassword) && (forData.password.length < 6)) {
      errors.password = true
      errors.repeatPassword = true
    } else {
      console.log('Formulario correcto')
    }
    setForError(errors)
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
        onChange={e => setForData({ ...forData, email: e.nativeEvent.text })}
      />

      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        textContentType='password'
        placeholder='Contraseña'
        placeholderTextColor='#969696'
        secureTextEntry
        style={[styles.txtInput, forError.password && styles.errorInput]}
        onChange={e => setForData({ ...forData, password: e.nativeEvent.text })}
      />

      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        textContentType='password'
        placeholder='Repetir contraseña'
        placeholderTextColor='#969696'
        secureTextEntry
        style={[styles.txtInput, forError.repeatPassword && styles.errorInput]}
        onChange={e => setForData({ ...forData, repeatPassword: e.nativeEvent.text })}
      />

      <TouchableOpacity onPress={register} activeOpacity={0.8}>
        <Text style={styles.btnTxtLogin}>Registrarte</Text>
      </TouchableOpacity>

      <View style={styles.btnLogin}>
        <TouchableOpacity onPress={changeForm} activeOpacity={0.8}>
          <Text style={styles.btnTxtLogin}>Iniciar sesión</Text>
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
  btnLogin: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 15
  },
  errorInput: {
    borderColor: '#940c0c'
  }
})
