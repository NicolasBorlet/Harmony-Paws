import { i18n } from '@/app/_layout'
import { StandardCheckbox } from '@/components/checkbox/standardCheckbox'
import { Purple } from '@/constants/Colors'
import Foundation from '@expo/vector-icons/build/Foundation'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

export default function SexCheckbox() {
  const [maleChecked, setMaleChecked] = useState(false)
  const [femaleChecked, setFemaleChecked] = useState(false)

  const handleSexCheckbox = (isMale: boolean) => {
    if (isMale) {
      setMaleChecked(true)
      setFemaleChecked(false)
      storage.set('dog', JSON.stringify({ sex: isMale ? 'male' : 'female' }))
    } else {
      setMaleChecked(false)
      setFemaleChecked(true)
      storage.set('dog', JSON.stringify({ sex: isMale ? 'male' : 'female' }))
    }
  }

  return (
    <View style={styles.listContainer}>
      <StandardCheckbox
        label={i18n.t('male')}
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
        label={i18n.t('female')}
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
