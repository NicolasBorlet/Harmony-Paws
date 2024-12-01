import { Body } from '@/components/ui/text'
import { StyleSheet, View } from 'react-native'

export default function Screen() {
  return (
    <View style={styles.container}>
      <Body>Completion</Body>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})
