import Back from '@/components/back-button'
import ParallaxScrollViewText from '@/components/parallax-scrollview-text'
import { Colors } from '@/constants/Colors'
import { useBreeds } from '@/lib/api/breed'
import { useNavigation } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MMKV } from 'react-native-mmkv'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const storage = new MMKV()

export default function FirstStep() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const { data: breeds } = useBreeds()

  const canGoBack = navigation.canGoBack()

  const [dogName, setDogName] = useState('')
  const [selectedSex, setSelectedSex] = useState<'Male' | 'Female'>('Male')
  const [dogAge, setDogAge] = useState('')
  const [selectedBreed, setSelectedBreed] = useState('')

  const isFormValid = dogName && dogAge && selectedSex && selectedBreed

  return (
    <>
      <ParallaxScrollViewText
        headerTextContainer={
          <View
            style={{
              paddingTop: insets.top,
              padding: 16,
            }}
          >
            {canGoBack && (
              <Back
                position='relative'
                left='0'
                backgroundColor='white'
                color='black'
              />
            )}
            <View>
              <Text>Etape 1/2</Text>
              <Text>Informations</Text>
            </View>
          </View>
        }
        backgroundColor={Colors.light.primary}
      >
        <View style={{ backgroundColor: 'red' }}>
          <Text>Etape 1/2</Text>
          <Text>Informations</Text>
        </View>
      </ParallaxScrollViewText>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  titleContainer: {
    gap: 16,
  },
  content: {
    paddingHorizontal: 20,
    gap: 20,
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    gap: 20,
  },
})
