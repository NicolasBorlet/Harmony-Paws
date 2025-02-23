import { i18n } from '@/app/_layout'
import { StandardCheckbox } from '@/components/checkbox/standardCheckbox'
import { Purple } from '@/constants/Colors'
import { storage } from '@/lib/utils/storage'
import Foundation from '@expo/vector-icons/build/Foundation'
import { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'

export default function SexCheckbox() {
  const [maleChecked, setMaleChecked] = useState(false)
  const [femaleChecked, setFemaleChecked] = useState(false)
  const [otherChecked, setOtherChecked] = useState(false)

  const handleSexCheckbox = (
    isMale: boolean,
    isFemale: boolean,
    isOther: boolean,
  ) => {
    const existingData = storage.getString('user')
    const userData = existingData ? JSON.parse(existingData) : {}

    if (isMale) {
      setMaleChecked(true)
      setFemaleChecked(false)
      setOtherChecked(false)
      storage.set(
        'user',
        JSON.stringify({
          ...userData,
          sex: 'man',
        }),
      )
    } else if (isFemale) {
      setMaleChecked(false)
      setFemaleChecked(true)
      setOtherChecked(false)
      storage.set(
        'user',
        JSON.stringify({
          ...userData,
          sex: 'woman',
        }),
      )
    } else if (isOther) {
      setMaleChecked(false)
      setFemaleChecked(false)
      setOtherChecked(true)
      storage.set(
        'user',
        JSON.stringify({
          ...userData,
          sex: 'other',
        }),
      )
    }
  }

  return (
    <ScrollView
      style={styles.listContainer}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 14, paddingLeft: 16 }}
    >
      <StandardCheckbox
        label={i18n.t('man')}
        checked={maleChecked}
        onPress={() => handleSexCheckbox(true, false, false)}
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
        label={i18n.t('woman')}
        checked={femaleChecked}
        onPress={() => handleSexCheckbox(false, true, false)}
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
      <StandardCheckbox
        label={i18n.t('other')}
        checked={otherChecked}
        onPress={() => handleSexCheckbox(false, false, true)}
        inactiveColor='#979898'
        activeColor={Purple}
        opacity={1}
        hasIcon={false}
      />
    </ScrollView>
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
