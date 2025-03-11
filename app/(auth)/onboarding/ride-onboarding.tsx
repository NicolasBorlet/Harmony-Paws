import ParallaxScrollViewOnboarding from '@/components/scrollview/parallax-scrollview-onboarding'
import { StandardButton } from '@/components/ui/button'
import { Body, ParagraphMedium, SpecialTitle } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { StyleSheet, View } from 'react-native'

export default function RideOnboarding() {
  return (
    <ParallaxScrollViewOnboarding
      backgroundColor={Colors.purple[500]}
      headerImage={require('@/assets/images/onboarding-dog-1.png')}
      children={
        <View style={styles.container}>
          <View style={styles.content}>
            <SpecialTitle>Ride with us</SpecialTitle>
            <ParagraphMedium>Skip and continue to the app</ParagraphMedium>
          </View>
          <View style={styles.buttonContainer}>
            <StandardButton>
              <Body>Skip</Body>
            </StandardButton>
            <StandardButton>
              <Body>Skip</Body>
            </StandardButton>
          </View>
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
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
  },
})
