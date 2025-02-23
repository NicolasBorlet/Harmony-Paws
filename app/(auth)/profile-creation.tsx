import Back from '@/components/back-button'
import DogAgeSection from '@/components/dog/creation/age-section'
import DogNameSection from '@/components/dog/creation/dog-name-section'
import ImageSelector from '@/components/dog/creation/image-selector'
import SexSection from '@/components/dog/creation/sex-section'
import ParallaxScrollViewText from '@/components/parallax-scrollview-text'
import { StandardButton } from '@/components/ui/button'
import {
  BodyMedium,
  ParagraphMedium,
  SpecialTitle_3,
} from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { useNavigation } from 'expo-router'
import { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { i18n } from '../_layout'

export default function ProfileCreation() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const canGoBack = navigation.canGoBack()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  const handleCreateDog = () => {
    console.log('handleCreateDog')
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
                {i18n.t('step')} 2/2
              </ParagraphMedium>

              <SpecialTitle_3 color='white'>
                {i18n.t('wouldLikeKnowYou')}
              </SpecialTitle_3>
            </View>
          </View>
        }
        backgroundColor={Colors.light.secondary}
        paddingHorizontal={0}
      >
        <View style={styles.dogInformationContainer}>
          {/** Image selector */}
          <ImageSelector />
          {/** Sex container */}
          <SexSection />
          {/** Dog name container */}
          <DogNameSection />
          {/** Dog age container */}
          <DogAgeSection />
          {/** Dog breed container */}
        </View>
      </ParallaxScrollViewText>
      <View
        style={[
          styles.buttonContainer,
          {
            bottom: insets.bottom,
          },
        ]}
      >
        <StandardButton
          onPress={handleCreateDog}
          disabled={isSubmitting}
          style={[
            styles.button,
            (!isFormValid || isSubmitting) && styles.buttonDisabled,
          ]}
        >
          <BodyMedium color='#fff'>{i18n.t('continue')}</BodyMedium>
        </StandardButton>
      </View>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  dogInformationContainer: {
    gap: 32,
    paddingBottom: 72,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 16,
  },
  button: {
    opacity: 1,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
})
