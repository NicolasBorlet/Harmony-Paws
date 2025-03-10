import ParallaxScrollViewOnboarding from '@/components/scrollview/parallax-scrollview-onboarding'
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
          <Body>Ride Onboarding</Body>
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
