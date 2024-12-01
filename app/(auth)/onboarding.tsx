import { Body } from '@/components/ui/text'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { MMKV } from 'react-native-mmkv'

// Initialize MMKV
export const storage = new MMKV()

export default function OnBoarding() {
  const onboarding = storage.getBoolean('onBoarding')

  useEffect(() => {
    console.log('Onboarding', onboarding)
  }, [onboarding])

  return (
    <View style={styles.container}>
      <Body>Onboarding</Body>
      <Button
        title='set onBoarding'
        onPress={() => {
          storage.set('onBoarding', true)
          router.replace('/(auth)/(tabs)/(home)')
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#663399',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
