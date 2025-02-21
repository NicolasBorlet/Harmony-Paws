import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import React, { useEffect, useRef } from 'react'
import {
  Animated,
  Dimensions,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import { useDropdown } from '@/hooks/useDropdown'
import { DropdownProps } from '@/lib/utils/drop-down'

const ITEM_HEIGHT = 40
const PICKER_HEIGHT = ITEM_HEIGHT * 5
const SELECTION_HEIGHT = ITEM_HEIGHT
const SCREEN_HEIGHT = Dimensions.get('window').height

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder,
  onSelect,
}) => {
  const {
    isVisible,
    selectedOption,
    buttonLayout,
    buttonRef,
    animatedStyle,
    toggleDropdown,
    handleSelect,
  } = useDropdown()

  const [animation] = React.useState(new Animated.Value(0))
  const [modalVisible, setModalVisible] = React.useState(false)
  const scrollViewRef = useRef<ScrollView>(null)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isClosing, setIsClosing] = React.useState(false)

  useEffect(() => {
    if (isVisible) {
      setIsClosing(false)
      setModalVisible(true)
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start()
    } else {
      setIsClosing(true)
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setModalVisible(false)
        setIsClosing(false)
      })
    }
  }, [isVisible])

  const modalAnimatedStyle = {
    opacity: animation,
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.9, 1],
        }),
      },
    ],
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isClosing) return
    const y = event.nativeEvent.contentOffset.y
    const offsetTop = (SCREEN_HEIGHT * 0.8 - ITEM_HEIGHT) / 2
    const adjustedY = Math.max(0, y - offsetTop)
    const index = Math.round(adjustedY / ITEM_HEIGHT)

    if (index >= 0 && index < options.length) {
      setCurrentIndex(index)
    }
  }

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    if (isClosing || !isVisible) return
    const y = event.nativeEvent.contentOffset.y
    const offsetTop = (SCREEN_HEIGHT * 0.8 - ITEM_HEIGHT) / 2
    const adjustedY = Math.max(0, y - offsetTop)
    const index = Math.round(adjustedY / ITEM_HEIGHT)

    if (index >= 0 && index < options.length && scrollViewRef.current) {
      setCurrentIndex(index)
      const targetY = index * ITEM_HEIGHT + offsetTop
      scrollViewRef.current.scrollTo({
        y: targetY,
        animated: true,
      })
      onSelect(options[index])
      console.log('Scroll selected breed:', options[index].label)
    }
  }

  const handleOptionPress = (item: any, index: number) => {
    if (isClosing) return
    console.log('Press - Selected breed:', item.label)
    setCurrentIndex(index)
    onSelect(item)
    handleSelect(item)
  }

  useEffect(() => {
    if (selectedOption) {
      console.log('Current selected breed:', selectedOption.label)
    }
  }, [selectedOption])

  useEffect(() => {
    if (isVisible && scrollViewRef.current) {
      scrollViewRef.current.setNativeProps({ scrollEnabled: true })
    }
  }, [isVisible])

  useEffect(() => {
    if (isVisible && scrollViewRef.current && !isClosing) {
      const offsetTop = (SCREEN_HEIGHT * 0.8 - ITEM_HEIGHT) / 2
      const targetY = currentIndex * ITEM_HEIGHT + offsetTop
      scrollViewRef.current.scrollTo({
        y: targetY,
        animated: false,
      })
    }
  }, [isVisible, currentIndex])

  return (
    <View>
      <Pressable
        ref={buttonRef}
        style={styles.dropdownButton}
        onPress={toggleDropdown}
      >
        <Text style={styles.dropdownButtonText}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Ionicons name='chevron-down' size={20} color='gray' />
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent
        animationType='none'
        onRequestClose={toggleDropdown}
      >
        <TouchableWithoutFeedback onPress={toggleDropdown}>
          <View style={styles.modalOverlay}>
            <BlurView intensity={20} style={StyleSheet.absoluteFill} />
            <Animated.View style={[styles.modalContent, modalAnimatedStyle]}>
              <View style={styles.pickerContainer}>
                <View
                  style={[
                    styles.selectionBars,
                    {
                      top:
                        (SCREEN_HEIGHT * 0.8 - SELECTION_HEIGHT) / 2 +
                        currentIndex * ITEM_HEIGHT,
                    },
                  ]}
                >
                  <View style={styles.selectionBarTop} />
                  <View style={styles.selectionBarBottom} />
                </View>

                <ScrollView
                  ref={scrollViewRef}
                  showsVerticalScrollIndicator={false}
                  snapToInterval={ITEM_HEIGHT}
                  decelerationRate='fast'
                  onScroll={!isClosing && isVisible ? handleScroll : undefined}
                  onMomentumScrollEnd={
                    !isClosing && isVisible
                      ? handleMomentumScrollEnd
                      : undefined
                  }
                  contentContainerStyle={styles.scrollContent}
                  scrollEventThrottle={32}
                  bounces={true}
                  scrollEnabled={!isClosing && isVisible}
                  pagingEnabled={false}
                >
                  <View
                    style={{ height: (SCREEN_HEIGHT * 0.8 - ITEM_HEIGHT) / 2 }}
                  />
                  {options.map((item, index) => (
                    <Pressable
                      key={item.value}
                      style={[
                        styles.option,
                        currentIndex === index && styles.selectedOption,
                      ]}
                      onPress={() => handleOptionPress(item, index)}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          currentIndex === index && styles.selectedOptionText,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </Pressable>
                  ))}
                  <View
                    style={{ height: (SCREEN_HEIGHT * 0.8 - ITEM_HEIGHT) / 2 }}
                  />
                </ScrollView>
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}

export default Dropdown

const styles = StyleSheet.create({
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
  dropdownButtonText: {
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
    color: '#696969',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    width: '80%',
    height: SCREEN_HEIGHT * 0.8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  pickerContainer: {
    flex: 1,
    position: 'relative',
  },
  scrollContent: {
    flexGrow: 1,
  },
  option: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  selectedOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
    color: 'white',
    textAlign: 'center',
  },
  selectedOptionText: {
    fontFamily: 'Montserrat_600SemiBold',
  },
  selectionBars: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: SELECTION_HEIGHT,
    zIndex: 1,
  },
  selectionBarTop: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  selectionBarBottom: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
})
