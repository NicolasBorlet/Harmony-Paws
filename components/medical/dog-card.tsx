import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { StyleSheet, View } from 'react-native'
import { Small, SpecialTitle_3 } from '../ui/text'

export default function DogCard({
  dog,
  active,
}: {
  dog: any
  active: boolean
}) {
  return (
    <View style={[styles.container]}>
      <Image source={dog.image} style={styles.image} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingVertical: 12,
        }}
      >
        <SpecialTitle_3 color={Colors.pink[500]}>{dog.name}</SpecialTitle_3>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
          <Ionicons
            name={dog.gender === 'male' ? 'male' : 'female'}
            size={20}
            color={Colors.black}
          />
          <Small color={Colors.black}>{dog.age} ans</Small>
        </View>
      </View>
      {!active && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: Colors.pink[500],
            opacity: 0.6,
          }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    boxShadow: '0px 3px 6.3px 0px rgba(0, 0, 0, 0.15)',
  },
  image: {
    width: '100%',
    height: 210,
  },
})
