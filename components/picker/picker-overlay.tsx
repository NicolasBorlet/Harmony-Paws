// PickerOverlay.tsx
import React, { useEffect } from 'react'
import { Modal, TouchableWithoutFeedback, View } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import styles from './styles'

interface PickerOverlayProps {
  isVisible: boolean
  onClose: () => void
  children: React.ReactNode
  overlayStyle?: object
}

const PickerOverlay: React.FC<PickerOverlayProps> = ({
  isVisible,
  onClose,
  children,
  overlayStyle,
}) => {
  const animatedValue = useSharedValue(0)

  useEffect(() => {
    animatedValue.value = withTiming(isVisible ? 1 : 0, { duration: 300 })
  }, [isVisible])

  const overlayAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedValue.value,
    }
  })

  const contentAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      animatedValue.value,
      [0, 1],
      [300, 0],
      Extrapolate.CLAMP,
    )

    return {
      transform: [{ translateY }],
    }
  })

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType='none'
      statusBarTranslucent
    >
      <Animated.View
        style={[styles.overlay, overlayAnimatedStyle, overlayStyle]}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={{ flex: 1 }} />
        </TouchableWithoutFeedback>

        <Animated.View style={contentAnimatedStyle}>{children}</Animated.View>
      </Animated.View>
    </Modal>
  )
}

export default PickerOverlay
