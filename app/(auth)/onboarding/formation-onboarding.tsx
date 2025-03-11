import { i18n } from '@/app/_layout'
import ParallaxScrollViewOnboarding from '@/components/scrollview/parallax-scrollview-onboarding'
import { StandardButton } from '@/components/ui/button'
import { Body, ParagraphMedium, SpecialTitle } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { MMKV } from 'react-native-mmkv'

export default function FormationOnboarding() {
  const router = useRouter()
  const storage = new MMKV()

  return (
    <ParallaxScrollViewOnboarding
      backgroundColor={Colors.purple[500]}
      headerImage={require('@/assets/images/onboarding-dog-3.png')}
      children={
        <View style={styles.container}>
          <View style={styles.content}>
            <SpecialTitle style={{ textAlign: 'center' }}>
              {i18n.t('global.formations')}
            </SpecialTitle>
            <ParagraphMedium style={{ textAlign: 'center' }}>
              {i18n.t('onboarding.onboardingFormation')}
            </ParagraphMedium>
          </View>
          <View style={styles.buttonContainer}>
            <StandardButton
              onPress={() => router.push('/onboarding/medical-onboarding')}
            >
              <Body color={Colors.white}>{i18n.t('global.continue')}</Body>
            </StandardButton>
            <StandardButton
              outlined
              onPress={() => {
                storage.set('onBoarding', true)
                router.replace('/(auth)/(tabs)/(home)')
              }}
            >
              <Body color={Colors.orange[500]}>{i18n.t('global.skip')}</Body>
            </StandardButton>
          </View>
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 48,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    gap: 8,
  },
  button: {
    flex: 1,
  },
  content: {
    gap: 20,
    alignItems: 'center',
  },
})
