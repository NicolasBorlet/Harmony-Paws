import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { StyleSheet, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { Small, SpecialTitle_3 } from '../ui/text'

const SCALE_ACTIVE = 1.1
const SCALE_INACTIVE = 1

export default function DogCard({
  dog,
  active,
}: {
  dog: any
  active: boolean
}) {
  const overlayStyle = useAnimatedStyle(() => {
    return {
      ...styles.overlayStyle,
      opacity: withTiming(active ? 0 : 0.6, {
        duration: 300,
      }),
    }
  }, [active])

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(active ? SCALE_ACTIVE : SCALE_INACTIVE, {
            damping: 15,
            stiffness: 100,
          }),
        },
      ],
    }
  }, [active])

  return (
    <Animated.View style={[styles.container, cardStyle]}>
      <Image source={dog.image} style={styles.image} />
      <View style={styles.contentContainer}>
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
      <Animated.View style={overlayStyle} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    width: 240,
    height: 220,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.3,
    elevation: 4,
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: 140,
  },
  contentContainer: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    zIndex: 1,
  },
  overlayStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.pink[500],
    zIndex: 0,
  },
})
