import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, LogBox, StyleSheet, StatusBar } from 'react-native'
import 'firebase/auth'

import firebase from './src/utils/firebase'
import { Auth } from './src/components/Auth'

// Para ignorar los warnings del 'AsyncStorage'
LogBox.ignoreLogs(['AsyncStorage has been extracted'])

const App = () => {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response)
    })
  }, [])

  if (user === undefined) return null

  return (
    <>
      <StatusBar barStyle='light-content' />
      <SafeAreaView style={styles.background}>
        {user ? <Text>Estas logeado</Text> : <Auth />}
      </SafeAreaView>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#15212b',
    flex: 1
  }
})
