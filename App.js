import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, StatusBar, LogBox } from 'react-native'
import { decode, encode } from 'base-64'
import auth from '@react-native-firebase/auth'

import { Auth } from './src/components/Auth'
import { ListBirthday } from './src/components/ListBirthday'

// Para ignorar los warnings'
LogBox.ignoreAllLogs()

if (!global.btoa) global.btoa = encode
if (!global.atob) global.atob = decode

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()

  const onAuthStateChanged = (user) => {
    setUser(user)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  if (initializing) return null

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
