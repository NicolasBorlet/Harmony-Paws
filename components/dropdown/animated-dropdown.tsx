import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import { useDropdown } from '@/hooks/useDropdown'
import { DropdownProps } from '@/lib/utils/drop-down'
import { FlashList } from '@shopify/flash-list'

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
        visible={isVisible}
        transparent
        animationType='none'
        onRequestClose={toggleDropdown}
      >
        <TouchableWithoutFeedback onPress={toggleDropdown}>
          <View style={styles.modalOverlay}>
            <View
              style={{
                width: '80%',
                height: '60%',
                backgroundColor: 'red',
              }}
            >
              <FlashList
                data={options}
                renderItem={({ item }) => (
                  <View
                    style={{
                      padding: 10,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Montserrat_400Regular',
                      }}
                    >
                      {item.label}
                    </Text>
                  </View>
                )}
                keyExtractor={item => item.value}
              />
            </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
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
