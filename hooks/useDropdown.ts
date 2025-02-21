import React from 'react'
import { Dimensions, LayoutRectangle, Pressable } from 'react-native'
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { IOption } from '@/lib/utils/drop-down'

const screenHeight = Dimensions.get('window').height

export const useDropdown = () => {
  const [isVisible, setIsVisible] = React.useState(false)
  const [selectedOption, setSelectedOption] = React.useState<IOption>()
  const [buttonLayout, setButtonLayout] =
    React.useState<LayoutRectangle | null>(null)
  const buttonRef = React.useRef<React.ElementRef<typeof Pressable>>(null)

  const dropdownHeight = useSharedValue(0)
  const dropdownOpacity = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => ({
    height: dropdownHeight.value,
    opacity: dropdownOpacity.value,
  }))

  const showDropdown = React.useCallback(() => {
    dropdownHeight.value = withTiming(200, { duration: 300 })
    dropdownOpacity.value = withTiming(1, { duration: 300 })
  }, [dropdownHeight, dropdownOpacity])

  const hideDropdown = React.useCallback(() => {
    dropdownHeight.value = withTiming(0, { duration: 200 })
    dropdownOpacity.value = withTiming(0, { duration: 200 })
  }, [dropdownHeight, dropdownOpacity])

  const toggleDropdown = React.useCallback(() => {
    if (!isVisible) {
      setIsVisible(true)
      showDropdown()
    } else {
      hideDropdown()
    }
  }, [isVisible, showDropdown, hideDropdown])

  const handleSelect = React.useCallback(
    (option: IOption) => {
      setSelectedOption(option)
      setIsVisible(false)
      hideDropdown()
    },
    [hideDropdown],
  )

  return {
    isVisible,
    selectedOption,
    buttonLayout,
    buttonRef,
    animatedStyle,
    toggleDropdown,
    handleSelect,
  }
}
