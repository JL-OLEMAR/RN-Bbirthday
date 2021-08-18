import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export const Birthday = ({ birthday, deleteBirthday }) => {
  const pasat = birthday.days > 0

  const infoDay = () => {
    if (birthday.days === 0) {
      return <Text style={{ color: '#fff' }}>Es tu cumpleaños</Text>
    } else {
      const days = -birthday.days
      return (
        <View style={styles.textCurrent}>
          <Text>{days}</Text>
          <Text>{days === 1 ? 'Dia' : 'Dias'}</Text>
        </View>
      )
    }
  }

  return (
    <TouchableOpacity
      style={[
        styles.card,
        pasat
          ? styles.pasat
          : birthday.days === 0
            ? styles.actual
            : styles.current
      ]}
      onPress={() => deleteBirthday(birthday)}
    >
      <Text style={styles.userName}>
        {birthday.name} {birthday.lastname}
      </Text>
      {pasat
        ? <Text style={{ color: '#fff' }}>Pasado</Text>
        : infoDay()}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 15,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    margin: 10,
    paddingHorizontal: 10
  },
  actual: {
    backgroundColor: '#559204'
  },
  current: {
    backgroundColor: '#1ae1f2'
  },
  pasat: {
    backgroundColor: '#820000'
  },
  userName: {
    color: '#fff',
    fontSize: 16
  },
  textCurrent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
