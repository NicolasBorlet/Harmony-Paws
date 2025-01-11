import Back from '@/components/back-button'
import { StyleSheet, View } from 'react-native'
import MapView from 'react-native-maps'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Map() {
  const insets = useSafeAreaInsets()

  return (
    <View style={styles.container}>
      <Back />
      <MapView style={styles.map} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
})
