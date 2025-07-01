import { i18n } from '@/lib/i18n'
import ParallaxScrollViewOnboarding from '@/components/scrollview/parallax-scrollview-onboarding'
import { StandardButton } from '@/components/ui/button'
import { Body, ParagraphMedium, SpecialTitle } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { MMKV } from 'react-native-mmkv'

export default function RideOnboarding() {
  const storage = new MMKV()

  return (
    <ParallaxScrollViewOnboarding
      backgroundColor={Colors.purple[500]}
      headerImage={require('@/assets/images/onboarding-dog-1.png')}
      children={
        <View style={styles.container}>
          <View style={styles.content}>
            <SpecialTitle style={{ textAlign: 'center' }}>
              {i18n.t('global.rides')}
            </SpecialTitle>
            <ParagraphMedium style={{ textAlign: 'center' }}>
              {i18n.t('onboarding.onboardingRide')}
            </ParagraphMedium>
          </View>
          <View style={styles.buttonContainer}>
            <StandardButton
              onPress={() => router.push('/onboarding/formation-onboarding')}
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
