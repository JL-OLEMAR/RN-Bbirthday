import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, LogBox, StyleSheet, StatusBar, View, Button } from 'react-native'
import 'firebase/auth'

import firebase from './src/utils/firebase'
import { Auth } from './src/components/Auth'

// Para ignorar los warnings del 'AsyncStorage'
LogBox.ignoreLogs(['AsyncStorage has been extracted'])

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
        {user ? <Logout /> : <Auth />}
      </SafeAreaView>
    </>
  )
}

export default App

const Logout = () => {
  const logout = () => {
    firebase.auth().signOut()
  }

  return (
    <View>
      <Text>Estas logeado</Text>
      <Button title='Cerrar sesión' onPress={logout} />
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#15212b',
    flex: 1
  }
})
