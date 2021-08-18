import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'
import 'moment/locale/es'

export const AddBirthday = ({ user, setShowList, setReloadData }) => {
  const [formData, setFormData] = useState({})
  const [formError, setFormError] = useState({})

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
  const hideDatePicker = () => setIsDatePickerVisible(false)
  const showDatePicker = () => setIsDatePickerVisible(true)

  const handleConfig = (date) => {
    const dateBirth = date
    dateBirth.setHours(0)
    dateBirth.setMinutes(0)
    dateBirth.setSeconds(0)

    setFormData({ ...formData, dateBirth })
    hideDatePicker()
  }

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text })
  }

  const onSubmit = () => {
    const errors = {}
    if (!formData.name || !formData.lastname || !formData.dateBirth) {
      if (!formData.name) errors.name = true
      if (!formData.lastname) errors.lastname = true
      if (!formData.dateBirth) errors.dateBirth = true
    } else {
      const data = formData
      data.dateBirth.setYear(0)
      firestore().collection(user.uid)
        .add(data)
        .then(() => {
          setReloadData(true)
          setShowList(true)
        })
        .catch(() => {
          setFormError({
            name: true,
            lastname: true,
            dateBirth: true
          })
        })
    }
    setFormError(errors)
  }

  return (
    <>
      <View style={styles.addBirthday}>
        <TextInput
          style={[styles.nameUser, formError.name && styles.errorInput]}
          placeholder='Nombre'
          placeholderTextColor='#969696'
          onChange={(e) => onChange(e, 'name')}
        />

        <TextInput
          style={[styles.nameUser, formError.lastname && styles.errorInput]}
          placeholder='Apellidos'
          placeholderTextColor='#969696'
          onChange={(e) => onChange(e, 'lastname')}
        />

        <View style={[
          styles.nameUser,
          styles.datePicker,
          formError.dateBirth && styles.errorInput]}
        >
          <TouchableOpacity onPress={showDatePicker} activeOpacity={0.8}>
            <Text style={{
              color: formData.dateBirth ? '#fff' : '#969696',
              fontSize: 18
            }}
            >
              {// Texto de la fecha
              formData.dateBirth
                ? moment(formData.dateBirth).format('LL')
                : 'Fecha de nacimiento'
              }
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onSubmit} activeOpacity={0.8}>
          <Text style={styles.btnAddDate}>Crear cumpleaños</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='date'
        onConfirm={handleConfig}
        onCancel={hideDatePicker}
      />
    </>
  )
}

const styles = StyleSheet.create({
  addBirthday: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  },
  nameUser: {
    height: 50,
    color: '#fff',
    width: '80%',
    marginBottom: 25,
    backgroundColor: '#1e3040',
    paddingHorizontal: 20,
    borderRadius: 50,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#1e3040'
  },
  datePicker: {
    justifyContent: 'center'
  },
  btnAddDate: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)'
  },
  errorInput: {
    borderColor: '#940c0c'
  }
})
