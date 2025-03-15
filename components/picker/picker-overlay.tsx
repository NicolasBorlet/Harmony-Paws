// PickerOverlay.tsx
import React, { useEffect, useState } from 'react'
import { Modal, TouchableWithoutFeedback, View } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
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
  const [modalVisible, setModalVisible] = useState(isVisible)

  useEffect(() => {
    if (isVisible) {
      setModalVisible(true)
      animatedValue.value = withTiming(1, { duration: 300 })
    } else {
      // Animation de sortie
      animatedValue.value = withTiming(0, { duration: 300 }, finished => {
        if (finished) {
          runOnJS(setModalVisible)(false)
        }
      })
    }
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

  const handleClose = () => {
    onClose()
  }

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType='none'
      statusBarTranslucent
    >
      <Animated.View
        style={[styles.overlay, overlayAnimatedStyle, overlayStyle]}
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={{ flex: 1 }} />
        </TouchableWithoutFeedback>

        <Animated.View style={contentAnimatedStyle}>{children}</Animated.View>
      </Animated.View>
    </Modal>
  )
}

export default PickerOverlay
