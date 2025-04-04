import { i18n } from '@/app/_layout'
import { Body } from '@/components/ui/text'
import { storage } from '@/lib/utils/storage'
import { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

export default function DogNameSection() {
  const [dogName, setDogName] = useState('')

  const handleNameChange = (text: string) => {
    setDogName(text)
    const existingData = storage.getString('dog')
    const dogData = existingData ? JSON.parse(existingData) : {}

    storage.set(
      'dog',
      JSON.stringify({
        ...dogData,
        name: text,
      }),
    )
  }

  return (
    <View style={styles.container}>
      <Body color='black'>{i18n.t('dogCreation.dogNameQuestion')}</Body>
      <TextInput
        placeholder={i18n.t('dogCreation.addDogName')}
        placeholderTextColor='#696969'
        style={styles.input}
        value={dogName}
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
