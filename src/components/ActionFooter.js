import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import auth from '@react-native-firebase/auth'

export const ActionFooter = ({ showList, setShowList }) => {
  const logout = () => auth().signOut()
  const isShowList = () => setShowList(!showList)

  return (
    <View style={styles.footer}>

      <View style={styles.containerLogout}>
        <TouchableOpacity onPress={logout} activeOpacity={0.8}>
          <Text style={styles.txtStyle}>Cerrar sessión</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerAddFecha}>
        <TouchableOpacity onPress={isShowList} activeOpacity={0.8}>
          <Text style={styles.txtStyle}>
            {showList ? 'Nueva fecha' : 'Cancelar fecha'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    bottom: 0,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 30,
    position: 'absolute',
    width: '100%'
  },
  containerLogout: {
    backgroundColor: '#820000',
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  containerAddFecha: {
    backgroundColor: '#1ea1f2',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  txtStyle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  }
})
