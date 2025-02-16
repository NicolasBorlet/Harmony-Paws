import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import Animated from 'react-native-reanimated'

import { useDropdown } from '@/hooks/useDropDown'
import { DropdownProps } from '@/lib/utils/drop-down'

const { width } = Dimensions.get('window')

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

  return (
    <View style={styles.container}>
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
        visible={isVisible}
        transparent
        animationType='none'
        onRequestClose={toggleDropdown}
      >
        <TouchableWithoutFeedback onPress={toggleDropdown}>
          <View style={styles.modalOverlay}>
            {buttonLayout && (
              <Animated.View style={[styles.modalContainer, animatedStyle]}>
                <FlatList
                  data={options}
                  keyExtractor={(item, index) => `${item.value}-${index}`}
                  renderItem={({ item }) => (
                    <Pressable
                      style={styles.option}
                      onPress={() => {
                        handleSelect(item)
                        if (onSelect) onSelect(item)
                      }}
                    >
                      <Text style={styles.optionText}>{item.label}</Text>
                      {selectedOption?.value === item.value && (
                        <Ionicons name='checkmark' size={20} color='green' />
                      )}
                    </Pressable>
                  )}
                  showsVerticalScrollIndicator={false}
                />
              </Animated.View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}

export default Dropdown

const styles = StyleSheet.create({
  container: {
    width: width,
    marginVertical: 10,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'white',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: 'gray',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    overflow: 'hidden',
    width: '90%',
    maxWidth: 400,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  optionText: {
    fontSize: 16,
  },
})
