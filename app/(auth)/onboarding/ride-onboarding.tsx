import ParallaxScrollViewOnboarding from '@/components/scrollview/parallax-scrollview-onboarding'
import { StandardButton } from '@/components/ui/button'
import { Body } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { StyleSheet, View } from 'react-native'

export default function RideOnboarding() {
  return (
    <ParallaxScrollViewOnboarding
      backgroundColor={Colors.purple[500]}
      headerImage={require('@/assets/images/onboarding-dog-1.png')}
      children={
        <View style={styles.container}>
          <View></View>
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
    backgroundColor: 'red',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    flex: 1,
  },
})
