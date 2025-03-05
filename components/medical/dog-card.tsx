import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { StyleSheet } from 'react-native'
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { Small, SpecialTitle_3 } from '../ui/text'

const CARD_WIDTH = 280 // Largeur de la carte

export default function DogCard({
  dog,
  active,
}: {
  dog: any
  active: boolean
}) {
  const containerStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          scale: withSpring(active ? 1.1 : 1, {
            damping: 15,
            stiffness: 100,
          }),
        },
      ],
      backgroundColor: 'white',
      borderRadius: 20,
      overflow: 'hidden',
      width: '100%',
      height: '100%',
    }),
    [active],
  )

  const overlayStyle = useAnimatedStyle(
    () => ({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: Colors.pink[500],
      opacity: withTiming(active ? 0 : 0.6, {
        duration: 300,
      }),
    }),
    [active],
  )

  return (
    <Animated.View style={styles.wrapper}>
      <Animated.View
        style={[
          containerStyle,
          {
            boxShadow: '0px 0px 3px 0px rgba(0, 0, 0, 0.15)',
          },
        ]}
      >
        <Image source={dog.image} style={styles.image} />
        <Animated.View style={styles.contentContainer}>
          <SpecialTitle_3 color={Colors.pink[500]}>{dog.name}</SpecialTitle_3>
          <Animated.View style={styles.infoContainer}>
            <Ionicons
              name={dog.gender === 'male' ? 'male' : 'female'}
              size={20}
              color={Colors.black}
            />
            <Small color={Colors.black}>{dog.age} ans</Small>
          </Animated.View>
        </Animated.View>
        <Animated.View style={overlayStyle} />
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: CARD_WIDTH,
    height: 280, // Ajustez cette valeur selon la hauteur de votre carte
    padding: 16, // Espace pour l'animation de scale
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 210,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
})
