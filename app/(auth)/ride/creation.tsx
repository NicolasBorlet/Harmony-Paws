import { Body } from '@/components/ui/text'
import { StyleSheet, View } from 'react-native'

export default function RideCreation() {
  return (
    <View style={styles.container}>
      <Body>Ride Creation</Body>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
