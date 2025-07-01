import { i18n } from '@/lib/i18n'
import CustomPicker from '@/components/picker'
import { storage } from '@/lib/utils/storage'
import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Body } from '../../ui/text'

interface Props {
  initialDominance?: string
  onDominanceChange?: (dominance: string) => void
  isModifying?: boolean
}

export default function DominanceSection({
  initialDominance,
  onDominanceChange,
  isModifying = false,
}: Props) {
  const [isPickerVisible, setIsPickerVisible] = useState(false)
  const [currentDominance, setCurrentDominance] = useState<string | null>(
    initialDominance || null,
  )

  useEffect(() => {
    setCurrentDominance(initialDominance || null)
  }, [initialDominance])

  const handleDominanceSelect = (selectedValues: any[]) => {
    const dominance = selectedValues[0]
    setCurrentDominance(dominance)

    if (!isModifying) {
      const currentDog = JSON.parse(storage.getString('dog') || '{}')
      storage.set(
        'dog',
        JSON.stringify({
          ...currentDog,
          dominance,
        }),
      )
    }

    onDominanceChange?.(dominance)
    setIsPickerVisible(false)
  }

  return (
    <View style={[styles.container, isModifying && { paddingHorizontal: 0 }]}>
      <Body color='black'>{i18n.t('dogCreation.dominanceQuestion')}</Body>
      <CustomPicker
        isVisible={isPickerVisible}
        onClose={() => setIsPickerVisible(false)}
        onConfirm={handleDominanceSelect}
        type='custom'
        initialValue={currentDominance}
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
          {currentDominance || i18n.t('dogCreation.addDominance')}
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
