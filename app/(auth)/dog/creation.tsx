import { i18n } from '@/app/_layout'
import Back from '@/components/back-button'
import { StandardCheckbox } from '@/components/checkbox/standardCheckbox'
import ParallaxScrollViewText from '@/components/parallax-scrollview-text'
import { ParagraphMedium, SpecialTitle_3 } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import Foundation from '@expo/vector-icons/build/Foundation'
import { useNavigation } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function FirstStep() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  const canGoBack = navigation.canGoBack()

  const [maleChecked, setMaleChecked] = useState(false)
  const [femaleChecked, setFemaleChecked] = useState(false)

  const handleSexCheckbox = (isMale: boolean) => {
    if (isMale) {
      setMaleChecked(true)
      setFemaleChecked(false)
    } else {
      setMaleChecked(false)
      setFemaleChecked(true)
    }
  }

  return (
    <>
      <ParallaxScrollViewText
        headerTextContainer={
          <View
            style={{
              paddingTop: insets.top,
              padding: 16,
            }}
          >
            <View style={{ flexDirection: 'column', gap: 20 }}>
              {canGoBack && (
                <Back
                  position='relative'
                  left='0'
                  backgroundColor='white'
                  color='black'
                />
              )}
              <ParagraphMedium color='white'>
                {i18n.t('step')} 1/2
              </ParagraphMedium>
              <SpecialTitle_3 color='white'>
                {i18n.t('wouldLikeKnowPet')}
              </SpecialTitle_3>
            </View>
          </View>
        }
        backgroundColor={Colors.light.primary}
      >
        <View>
          {/** Sex container */}
          <View style={styles.listContainer}>
            <StandardCheckbox
              label={i18n.t('male')}
              checked={maleChecked}
              onPress={() => handleSexCheckbox(true)}
              inactiveColor='#979898'
              opacity={1}
              icon={
                <Foundation
                  name='male-symbol'
                  size={20}
                  color={maleChecked ? 'white' : '#979898'}
                />
              }
            />
            <StandardCheckbox
              label={i18n.t('female')}
              checked={femaleChecked}
              onPress={() => handleSexCheckbox(false)}
              inactiveColor='#979898'
              opacity={1}
              icon={
                <Foundation
                  name='female-symbol'
                  size={20}
                  color={femaleChecked ? 'white' : '#979898'}
                />
              }
            />
          </View>
        </View>
      </ParallaxScrollViewText>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  titleContainer: {
    gap: 16,
  },
  content: {
    paddingHorizontal: 20,
    gap: 20,
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    gap: 20,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 24,
    paddingRight: 16,
  },
})
