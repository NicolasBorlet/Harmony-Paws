import { i18n } from '@/app/_layout'
import { Body } from '@/components/ui/text'
import { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

export default function DogBreedSection() {
  const [dogBreed, setDogBreed] = useState('')

  return (
    <View style={styles.container}>
      <Body color='black'>{i18n.t('dogBreedQuestion')}</Body>
      <TextInput
        placeholder={i18n.t('addDogName')}
        placeholderTextColor='#696969'
        style={styles.input}
        value={dogBreed}
        onChangeText={setDogBreed}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
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
