import { StandardButton } from "@/components/ui/button";
import { BodyMedium, SpecialTitle } from "@/components/ui/text";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { i18n } from "../_layout";

export default function AccountCreated() {
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

  return (
    <SafeAreaView style={styles.container}>
      <SpecialTitle>Ton compte est cree !</SpecialTitle>
      <Animated.View style={[styles.buttonContainer, animatedStyles]}>
        <StandardButton onPress={() => { }}>
          <BodyMedium color='#fff'>{i18n.t('createDogProfile')}</BodyMedium>
        </StandardButton>
        <StandardButton outlined onPress={() => { }}>
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
    gap: 20
  },
});
