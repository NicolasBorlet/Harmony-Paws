import Back from '@/components/back-button'
import ImageSelector from '@/components/dog/creation/image-selector'
import ParallaxScrollViewText from '@/components/parallax-scrollview-text'
import ProfileBirthSection from '@/components/profile/creation/birth-section'
import ProfileNameSection from '@/components/profile/creation/name-section'
import ProfileSexSection from '@/components/profile/creation/sex-section'
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
          {/** Profile name container */}
          <ProfileNameSection />
          {/** Sex container */}
          <ProfileSexSection />
          {/** Birth date container */}
          <ProfileBirthSection />
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
