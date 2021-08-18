import React, { useEffect, useState } from 'react'
import { SafeAreaView, LogBox, StyleSheet, StatusBar } from 'react-native'
import { decode, encode } from 'base-64'
import firebase from './src/utils/firebase'
import 'firebase/auth'

import { Auth } from './src/components/Auth'
import { ListBirthday } from './src/components/ListBirthday'

// Para ignorar los warnings'
LogBox.ignoreLogs([
  'AsyncStorage has been extracted',
  'Setting a timer for a long period of time',
  '@firebase/firestore: Firestore (8.8.1)'
])

if (!global.btoa) global.btoa = encode
if (!global.atob) global.atob = decode

const App = () => {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => { setUser(response) })
  }, [])

  if (user === undefined) return null

  return (
    <>
      <StatusBar barStyle='light-content' />
      <SafeAreaView style={styles.background}>
        {user ? <ListBirthday user={user} /> : <Auth />}
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
