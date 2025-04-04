import Back from '@/components/back-button'
import { Colors } from '@/constants/Colors'
import { Entypo } from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'
import MapView from 'react-native-maps'

export default function Map() {
  return (
    <View style={styles.container}>
      <Back icon={<Entypo name='cross' size={18} color={Colors.white} />} />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.8566,
          longitude: 2.3522,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />
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
