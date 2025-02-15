import { i18n } from '@/app/_layout'
import Back from '@/components/back-button'
import DogAgeSection from '@/components/dog/creation/age-section'
import DogBreedSection from '@/components/dog/creation/breed-section'
import DogNameSection from '@/components/dog/creation/dog-name-section'
import SexSection from '@/components/dog/creation/sex-section'
import ParallaxScrollViewText from '@/components/parallax-scrollview-text'
import { ParagraphMedium, SpecialTitle_3 } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { useNavigation } from 'expo-router'
import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
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
    <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
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
        <View style={styles.dogInformationContainer}>
          {/** Sex container */}
          <SexSection />
          {/** Dog name container */}
          <DogNameSection />
          {/** Dog age container */}
          <DogAgeSection />
          {/** Dog breed container */}
          <DogBreedSection />
        </View>
      </ParallaxScrollViewText>
    </KeyboardAvoidingView>
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
  dogInformationContainer: {
    gap: 32,
  },
})
