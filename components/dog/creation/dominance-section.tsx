import { i18n } from '@/app/_layout'
import CustomPicker from '@/components/picker'
import { storage } from '@/lib/utils/storage'
import React, { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Body } from '../../ui/text'

export default function DominanceSection() {
  const [isPickerVisible, setIsPickerVisible] = useState(false)

  const handleDominanceSelect = (selectedValues: any[]) => {
    const dominance = selectedValues[0]
    const currentDog = JSON.parse(storage.getString('dog') || '{}')
    storage.set(
      'dog',
      JSON.stringify({
        ...currentDog,
        dominance,
      }),
    )
  }

  const getCurrentDominance = () => {
    try {
      const currentDog = JSON.parse(storage.getString('dog') || '{}')
      return currentDog.dominance
    } catch {
      return null
    }
  }

  const currentDominance = getCurrentDominance()

  return (
    <View style={styles.container}>
      <Body color='black'>{i18n.t('dogCreation.dominance')}</Body>
      <CustomPicker
        isVisible={isPickerVisible}
        onClose={() => setIsPickerVisible(false)}
        onConfirm={handleDominanceSelect}
        type='custom'
        initialValue={currentDominance?.label || ''}
        confirmText='OK'
        cancelText='Annuler'
        columns={[
          {
            items: [
              { label: 'Dominant', value: 'dominant' },
              { label: 'Dominé', value: 'dominated' },
            ],
          },
        ]}
      />
      <Pressable style={styles.input} onPress={() => setIsPickerVisible(true)}>
        <Body color='#696969'>
          {currentDominance?.label || i18n.t('dogCreation.addDogBreed')}
        </Body>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingHorizontal: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 8,
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
