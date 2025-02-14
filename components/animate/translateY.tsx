import { PropsWithChildren } from 'react'
import Animated, { SlideInDown } from 'react-native-reanimated'

export default function TranslateY({
  children,
  delay,
}: PropsWithChildren & { delay?: number }) {
  return (
    <Animated.View
      entering={SlideInDown.springify()
        .delay(delay ?? 0)
        .damping(20)
        .mass(0.6)
        .stiffness(100)
        .withInitialValues({ translateY: 5 })}
    >
      {children}
    </Animated.View>
  )
}
