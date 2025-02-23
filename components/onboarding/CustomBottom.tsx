import { useNotifications } from '@/lib/context/NotificationContext'
import { router } from 'expo-router'
import React from 'react'
import { FlatList, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

interface CustomButtonProps {
  flatListRef: React.RefObject<FlatList>
  flatListIndex: { value: number }
  dataLength: number
}

const CustomButton: React.FC<CustomButtonProps> = ({
  flatListRef,
  flatListIndex,
  dataLength,
}) => {
  const { requestPermissions } = useNotifications()
  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width:
        flatListIndex.value === dataLength - 1
          ? withSpring(140)
          : withSpring(60),
      height: 60,
    }
  })
  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      width: 30,
      height: 30,
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(100)
              : withTiming(0),
        },
      ],
    }
  })
  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(0)
              : withTiming(-100),
        },
      ],
    }
  })

  const handleLastStep = async () => {
    const permissionGranted = await requestPermissions()
    if (permissionGranted) {
      console.log('Notifications permissions granted')
    } else {
      console.log('Notifications permissions denied')
    }
    router.replace('/(auth)/dog/creation')
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (flatListIndex.value < dataLength - 1) {
          flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1 })
        } else {
          handleLastStep()
        }
      }}
    >
      <Animated.View style={[styles.container, buttonAnimationStyle]}>
        <Animated.Text
          style={[
            styles.textButton,
            textAnimationStyle,
            {
              fontFamily: 'Montserrat_500Medium',
            },
          ]}
        >
          Commencer
        </Animated.Text>
        <Animated.Image
          source={require('./ArrowIcon.png')}
          style={[styles.arrow, arrowAnimationStyle]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  arrow: {
    position: 'absolute',
  },
  textButton: { color: 'white', fontSize: 16, position: 'absolute' },
})
