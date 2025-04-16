import { Colors } from '@/constants/Colors'
import { MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StandardButton } from './ui/button'
import { Body, SpecialTitle } from './ui/text'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

interface ActivityStatusViewProps {
  isAnimatingOut?: boolean
}

export const ActivityStatusView = ({
  isAnimatingOut = false,
}: ActivityStatusViewProps) => {
  const insets = useSafeAreaInsets()
  const waveAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(-100)).current
  const [isVisible, setIsVisible] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const heightAnim = useRef(new Animated.Value(0)).current
  const waveAnimation = useRef<Animated.CompositeAnimation | null>(null)

  // use memo for calculate the hour when the activity will end, based on the current hour and the duration of the activity
  const endHour = useMemo(() => {
    const now = new Date()
    const endTime = new Date(now.getTime() + 2 * 60 * 60 * 1000) // Add 2 hours
    return endTime.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }, [])

  const startWaveAnimation = () => {
    if (waveAnimation.current) {
      waveAnimation.current.stop()
    }
    waveAnimation.current = Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    )
    waveAnimation.current.start()
  }

  useEffect(() => {
    if (isAnimatingOut) {
      // Animation de sortie
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start()
    } else {
      // Animation d'entrée
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start()
      startWaveAnimation()
    }
  }, [isAnimatingOut])

  useEffect(() => {
    return () => {
      if (waveAnimation.current) {
        waveAnimation.current.stop()
      }
    }
  }, [])

  const handlePress = () => {
    if (isExpanded) {
      // Animation de réduction
      Animated.spring(heightAnim, {
        toValue: 0,
        useNativeDriver: false,
        tension: 50,
        friction: 7,
      }).start(() => {
        // Redémarrer l'animation de vague une fois l'animation de réduction terminée
        startWaveAnimation()
      })
    } else {
      // Animation d'expansion
      Animated.spring(heightAnim, {
        toValue: SCREEN_HEIGHT,
        useNativeDriver: false,
        tension: 50,
        friction: 7,
      }).start()
      // Arrêter l'animation de vague
      if (waveAnimation.current) {
        waveAnimation.current.stop()
      }
    }
    setIsExpanded(!isExpanded)
  }

  const translateX = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  })

  if (!isVisible) return null

  return (
    <Animated.View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.touchable}
        activeOpacity={0.8}
        onPress={handlePress}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <MaterialIcons
              name='directions-walk'
              size={24}
              color={Colors.white}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Activité en cours</Text>
            <Text style={styles.subtitle}>Bonne promenade !</Text>
          </View>
          <MaterialIcons
            name={isExpanded ? 'expand-less' : 'expand-more'}
            size={24}
            color={Colors.white}
          />
        </View>
        <Animated.View
          style={[
            styles.waveOverlay,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          <LinearGradient
            colors={[
              'rgba(255, 255, 255, 0)',
              'rgba(255, 255, 255, 0.1)',
              'rgba(255, 255, 255, 0.2)',
              'rgba(255, 255, 255, 0.1)',
              'rgba(255, 255, 255, 0)',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.expandableContent,
          {
            height: heightAnim,
            opacity: heightAnim.interpolate({
              inputRange: [0, SCREEN_HEIGHT],
              outputRange: [0, 1],
            }),
          },
        ]}
      >
        <SpecialTitle color={Colors.white}>Balade en cours</SpecialTitle>
        <SpecialTitle color={Colors.orange[500]} fontSize={48}>
          {endHour}
        </SpecialTitle>

        <View style={styles.stopView}>
          <View>
            <Pressable style={styles.pauseButton}>
              <MaterialIcons name='pause' size={24} color={Colors.white} />
            </Pressable>
          </View>
          <View>
            <StandardButton width='140'>
              <Body color={Colors.white}>Arrêter</Body>
            </StandardButton>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.purple[500],
    borderBottomWidth: 1,
    borderBottomColor: Colors.purple[600],
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    overflow: 'hidden',
  },
  touchable: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  expandableContent: {
    backgroundColor: Colors.purple[500],
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandedContent: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.orange[500],
  },
  iconContainer: {
    padding: 8,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.white,
    marginTop: 2,
    opacity: 0.8,
  },
  waveOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '200%',
  },
  gradient: {
    flex: 1,
    width: '100%',
  },
  stopView: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    gap: 32,
  },
  pauseButton: {
    backgroundColor: Colors.pink[500],
    padding: 12,
    borderRadius: 999,
  },
})
