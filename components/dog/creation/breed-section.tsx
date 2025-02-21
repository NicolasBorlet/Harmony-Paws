import { i18n } from '@/app/_layout'
import Dropdown from '@/components/dropdown/animated-dropdown'
import { Body } from '@/components/ui/text'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

export default function DogBreedSection() {
  const [dogBreed, setDogBreed] = useState('')

  return (
    <View style={styles.container}>
      <Body color='black'>{i18n.t('dogBreedQuestion')}</Body>
      <Dropdown
        options={[
          {
            id: '1',
            label: 'Labrador',
            value: 'labrador',
          },
          {
            id: '2',
            label: 'Terrier',
            value: 'terrier',
          },
          {
            id: '3',
            label: 'Poodle',
            value: 'poodle',
          },
          {
            id: '4',
            label: 'Border Collie',
            value: 'border-collie',
          },
          {
            id: '5',
            label: 'Pitbull',
            value: 'pitbull',
          },
          {
            id: '6',
            label: 'Beagle',
            value: 'beagle',
          },
          {
            id: '7',
            label: 'Berger Australien',
            value: 'berger-australien',
          },
        ]}
        placeholder={i18n.t('addDogBreed')}
        onSelect={() => {}}
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
