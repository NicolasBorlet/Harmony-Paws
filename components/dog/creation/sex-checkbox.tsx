import { i18n } from '@/lib/i18n'
import { StandardCheckbox } from '@/components/checkbox/standardCheckbox'
import { Purple } from '@/constants/Colors'
import { storage } from '@/lib/utils/storage'
import Foundation from '@expo/vector-icons/build/Foundation'
import { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

interface Props {
  initialSex?: 'male' | 'female'
  onSexChange?: (sex: 'male' | 'female') => void
  isModifying?: boolean
}

export default function SexCheckbox({
  initialSex,
  onSexChange,
  isModifying = false,
}: Props) {
  const [maleChecked, setMaleChecked] = useState(initialSex === 'male')
  const [femaleChecked, setFemaleChecked] = useState(initialSex === 'female')

  useEffect(() => {
    setMaleChecked(initialSex === 'male')
    setFemaleChecked(initialSex === 'female')
  }, [initialSex])

  const handleSexCheckbox = useCallback(
    (isMale: boolean) => {
      if (isMale) {
        setMaleChecked(true)
        setFemaleChecked(false)
      } else {
        setMaleChecked(false)
        setFemaleChecked(true)
      }

      if (!isModifying) {
        const existingData = storage.getString('dog')
        const dogData = existingData ? JSON.parse(existingData) : {}
        storage.set(
          'dog',
          JSON.stringify({
            ...dogData,
            sex: isMale ? 'male' : 'female',
          }),
        )
      }

      onSexChange?.(isMale ? 'male' : 'female')
    },
    [isModifying, onSexChange],
  )

  return (
    <View style={styles.listContainer}>
      <StandardCheckbox
        label={i18n.t('global.male')}
        checked={maleChecked}
        onPress={() => handleSexCheckbox(true)}
        inactiveColor='#979898'
        activeColor={Purple}
        opacity={1}
        icon={
          <Foundation
            name='male-symbol'
            size={20}
            color={maleChecked ? '#FFFFFF' : '#979898'}
          />
        }
      />
      <StandardCheckbox
        label={i18n.t('global.female')}
        checked={femaleChecked}
        onPress={() => handleSexCheckbox(false)}
        inactiveColor='#979898'
        activeColor={Purple}
        opacity={1}
        icon={
          <Foundation
            name='female-symbol'
            size={20}
            color={femaleChecked ? '#FFFFFF' : '#979898'}
          />
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    paddingRight: 16,
  },
})
