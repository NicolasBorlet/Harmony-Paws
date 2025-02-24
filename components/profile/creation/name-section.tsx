import { i18n } from '@/app/_layout'
import { Body } from '@/components/ui/text'
import { storage } from '@/lib/utils/storage'
import { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

export default function ProfileNameSection() {
  const [name, setName] = useState('')

  const handleNameChange = (text: string) => {
    setName(text)
    const existingData = storage.getString('user')
    const userData = existingData ? JSON.parse(existingData) : {}

    storage.set(
      'user',
      JSON.stringify({
        ...userData,
        name: text,
      }),
    )
  }

  return (
    <View style={styles.container}>
      <Body color='black'>{i18n.t('WhatIsYourName')}</Body>
      <TextInput
        placeholder={i18n.t('addName')}
        placeholderTextColor='#696969'
        style={styles.input}
        value={name}
        onChangeText={handleNameChange}
        autoCorrect={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingHorizontal: 16,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F5F5F5',
    color: '#696969',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Montserrat-Regular',
  },
})
