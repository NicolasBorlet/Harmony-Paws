import { ReactElement } from 'react'
import { View } from 'react-native'
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated'
import { Body, SpecialTitle } from '../ui/text'

export default function AnimatedHeader({
  scrollY,
  icons,
  title,
  subtitle,
  dogName,
  distance = 32,
}: {
  scrollY: SharedValue<number>
  icons: ReactElement
  title: string
  subtitle?: string
  dogName?: string
  distance?: number
}) {
  const headerOpacity = useDerivedValue(() => {
    return interpolate(scrollY.value, [0, 50], [0, 1], 'clamp')
  })

  const titleOpacity = useDerivedValue(() => {
    return interpolate(scrollY.value, [0, 50], [1, 0], 'clamp')
  })

  const titleOpacityY = useDerivedValue(() => {
    return interpolate(scrollY.value, [0, 50], [0, -75], 'clamp')
  })

  const titleY = useDerivedValue(() => {
    return interpolate(scrollY.value, [0, 50], [75, 0], 'clamp')
  })

  const animatedHeaderHeight = useDerivedValue(() => {
    return interpolate(scrollY.value, [0, 70], [130, 50], 'clamp')
  })

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: animatedHeaderHeight.value,
    }
  })

  const headerOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
      transform: [
        {
          translateY: withSpring(titleY.value, {
            damping: 15,
            stiffness: 100,
          }),
        },
      ],
    }
  })

  const titleOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: titleOpacity.value,
      transform: [
        {
          translateY: withSpring(titleOpacityY.value, {
            damping: 15,
            stiffness: 100,
          }),
        },
      ],
    }
  })

  return (
    <>
      <Animated.View
        style={[
          animatedStyles,
          {
            // backgroundColor: 'red',
          },
        ]}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 32,
          }}
        >
          <Animated.View style={headerOpacityStyle}>
            <SpecialTitle>
              {title} {dogName}
            </SpecialTitle>
            {subtitle && <Body>{subtitle}</Body>}
          </Animated.View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 12,
            }}
          >
            {icons}
          </View>
        </View>
        <Animated.View style={[titleOpacityStyle, { paddingBottom: 32 }]}>
          <SpecialTitle>
            {title} {dogName}
          </SpecialTitle>
          {subtitle && <Body>{subtitle}</Body>}
        </Animated.View>
      </Animated.View>
    </>
  )
}
