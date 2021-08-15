import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export const LoginForm = ({ changeForm }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={changeForm}
        activeOpacity={0.8}
      >
        <Text style={styles.btnTxtLogin}>Registrate</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  btnTxtLogin: {
    color: '#fff',
    fontSize: 18
  }
})
