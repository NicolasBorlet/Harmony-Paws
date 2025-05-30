import { Colors } from '@/constants/Colors'
import React, { useCallback, useEffect } from 'react'
import { Dimensions, Pressable, StyleSheet, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { BodyMedium } from './text'

interface ContextMenuItem {
  label: string
  onPress: () => void
  icon?: React.ReactNode
}

interface ContextMenuProps {
  isVisible: boolean
  onClose: () => void
  items: ContextMenuItem[]
  position?: { x: number; y: number }
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export const ContextMenu: React.FC<ContextMenuProps> = ({
  isVisible,
  onClose,
  items,
  position = { x: 0, y: 0 },
}) => {
  console.log('ContextMenu render:', { isVisible, position })

  const scale = useSharedValue(0)
  const opacity = useSharedValue(0)

  const handlePress = useCallback(
    (onPress: () => void) => {
      onPress()
      onClose()
    },
    [onClose],
  )

  useEffect(() => {
    console.log('ContextMenu useEffect:', { isVisible })
    if (isVisible) {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 150,
      })
      opacity.value = withTiming(1, { duration: 200 })
    } else {
      scale.value = withSpring(0, {
        damping: 15,
        stiffness: 150,
      })
      opacity.value = withTiming(0, { duration: 200 })
    }
  }, [isVisible, scale, opacity])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    }
  })

  const backdropStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  })

  if (!isVisible) {
    console.log('ContextMenu not visible, returning null')
    return null
  }

  console.log('ContextMenu rendering content')
  return (
    <>
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <Pressable style={styles.backdropPressable} onPress={onClose} />
      </Animated.View>
      <Animated.View
        style={[
          styles.container,
          {
            top: position.y,
            left: position.x,
          },
          animatedStyle,
        ]}
      >
        {items.map((item, index) => (
          <Pressable
            key={index}
            style={styles.menuItem}
            onPress={() => handlePress(item.onPress)}
          >
            {item.icon && <View style={styles.iconContainer}>{item.icon}</View>}
            <BodyMedium color={Colors.light.text}>{item.label}</BodyMedium>
          </Pressable>
        ))}
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
  },
  backdropPressable: {
    flex: 1,
  },
  container: {
    position: 'absolute',
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    padding: 8,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1001,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  iconContainer: {
    marginRight: 12,
  },
})
