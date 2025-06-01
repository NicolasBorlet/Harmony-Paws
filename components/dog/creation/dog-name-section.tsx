import { i18n } from '@/app/_layout'
import { Body } from '@/components/ui/text'
import { storage } from '@/lib/utils/storage'
import { useEffect, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

interface Props {
  initialName?: string
  onNameChange?: (name: string) => void
  isModifying?: boolean
}

export default function DogNameSection({
  initialName = '',
  onNameChange,
  isModifying = false,
}: Props) {
  const [dogName, setDogName] = useState(initialName)

  useEffect(() => {
    setDogName(initialName)
  }, [initialName])

  const handleNameChange = (text: string) => {
    setDogName(text)

    if (!isModifying) {
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

    onNameChange?.(text)
  }

  return (
    <View style={[styles.container, isModifying && { paddingHorizontal: 0 }]}>
      <View style={{ paddingLeft: isModifying ? 0 : 16 }}>
        <Body color='black'>{i18n.t('dogCreation.whatIsYourDogName')}</Body>
      </View>
      <View style={{ paddingHorizontal: isModifying ? 0 : 16 }}>
        <TextInput
          placeholder={i18n.t('dogCreation.addDogName')}
          placeholderTextColor='#696969'
          style={styles.input}
          value={dogName}
          onChangeText={handleNameChange}
          autoCorrect={false}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    width: '100%',
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
