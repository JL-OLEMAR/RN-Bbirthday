import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'

import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)

  const changeForm = () => {
    setIsLogin(!isLogin)
  }

  return (
    <View style={styles.containerAuth}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

      {isLogin
        ? (<LoginForm changeForm={changeForm} />)
        : (<RegisterForm changeForm={changeForm} />)}
    </View>
  )
}

const styles = StyleSheet.create({
  containerAuth: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    height: 240,
    marginBottom: 50,
    marginTop: 50,
    width: '80%'
  }
})
