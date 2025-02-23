import { StandardButton } from '@/components/ui/button'
import { BodyMedium, SpecialTitle } from '@/components/ui/text'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { useCallback, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { MMKV } from 'react-native-mmkv'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { i18n } from '../_layout'

const storage = new MMKV()

export default function AccountCreated() {
  const onboarding = storage.getBoolean('onBoarding')
  const insets = useSafeAreaInsets()

  const bottomPosition = useSharedValue(-100)
  const opacity = useSharedValue(0)

  useEffect(() => {
    buttonAnimation()
  }, [])

  const buttonAnimation = () => {
    // Animate the button to slide up
    bottomPosition.value = withSpring(insets.bottom + 16, {
      damping: 20,
      stiffness: 90,
    })

    // Animate the button opacity
    opacity.value = withSpring(1, {
      damping: 20,
      stiffness: 90,
    })
  }

  const animatedStyles = useAnimatedStyle(() => {
    return {
      bottom: bottomPosition.value,
      opacity: opacity.value,
    }
  })

  const handleSkip = useCallback(() => {
    storage.set('onBoarding', true)
    router.replace('/')
  }, [])

  const handleCreateDogProfile = useCallback(() => {
    router.replace('/dog/creation')
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemContainer}>
        <SpecialTitle>{i18n.t('accountCreated')}</SpecialTitle>
        <Image
          source={require('../../assets/images/onboarding-dog-2.png')}
          style={{ width: 250, height: 500 }}
          contentFit='contain'
        />
      </View>
      <Animated.View style={[styles.buttonContainer, animatedStyles]}>
        <StandardButton onPress={handleCreateDogProfile}>
          <BodyMedium color='#fff'>{i18n.t('createDogProfile')}</BodyMedium>
        </StandardButton>
        <StandardButton outlined onPress={handleSkip}>
          <BodyMedium color='#F7A400'>{i18n.t('skipStep')}</BodyMedium>
        </StandardButton>
      </Animated.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    gap: 20,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})
