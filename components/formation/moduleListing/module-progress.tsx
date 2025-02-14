import { useEffect } from 'react'
import { Animated, View } from 'react-native'
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import Svg, { Circle } from 'react-native-svg'

// Créer un composant Circle animé
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

interface ModuleProgressProps {
  progress: number // progress en pourcentage (0-100)
  size?: number // taille du cercle
  strokeWidth?: number // épaisseur du trait
  progressColor?: string // couleur de la progression
  backgroundColor?: string // couleur de fond
}

export default function ModuleProgress({
  progress,
  size = 40,
  strokeWidth = 4,
  progressColor = '#0DA453',
  backgroundColor = '#E5E5E5',
}: ModuleProgressProps) {
  const progressValue = useSharedValue(0)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI

  useEffect(() => {
    progressValue.value = withSpring(progress, {
      damping: 15,
      stiffness: 90,
    })
  }, [progress])

  const animatedStyle = useAnimatedStyle(() => {
    const strokeDashoffset =
      circumference - (circumference * progressValue.value) / 100
    return {
      strokeDashoffset,
    }
  })

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {/* Cercle de fond */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill='none'
        />
        {/* Cercle de progression */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill='none'
          strokeDasharray={`${circumference} ${circumference}`}
          style={animatedStyle}
          strokeLinecap='round'
        />
      </Svg>
    </View>
  )
}
