import React from 'react'
import { StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native'

export const RegisterForm = ({ changeForm }) => {
  const register = () => {
    console.log('Registrando...')
  }

  return (
    <>
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        keyboardType='email-address'
        placeholder='Correo electronico'
        placeholderTextColor='#969696'
        style={styles.txtInput}
      />

      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        textContentType='password'
        placeholder='Contraseña'
        placeholderTextColor='#969696'
        secureTextEntry
        style={styles.txtInput}
      />

      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        textContentType='password'
        placeholder='Repetir contraseña'
        placeholderTextColor='#969696'
        secureTextEntry
        style={styles.txtInput}
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
  }
})
