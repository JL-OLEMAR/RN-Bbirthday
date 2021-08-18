import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import firestore from '@react-native-firebase/firestore'

import { AddBirthday } from './AddBirthday'
import { ActionFooter } from './ActionFooter'

export const ListBirthday = ({ user }) => {
  const [showList, setShowList] = useState(true)
  const [birthday, setBirthday] = useState([])

  console.log({ birthday })

  useEffect(() => {
    setBirthday([])
    firestore().collection(user.uid)
      .orderBy('dateBirth', 'asc')
      .get()
      .then((response) => {
        const itemsArray = []
        response.forEach((doc) => {
          const data = doc.data()
          data.id = doc.id
          itemsArray.push(data)
        })
        setBirthday(itemsArray)
      })
  }, [])

  return (
    <View style={styles.container}>
      {showList
        ? (
          <>
            <Text>List</Text>
            <Text>List</Text>
            <Text>List</Text>
            <Text>List</Text>
            <Text>List</Text>
            <Text>List</Text>
          </>
          )
        : (<AddBirthday user={user} setShowList={setShowList} />)}

      <ActionFooter showList={showList} setShowList={setShowList} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%'
  }
})
