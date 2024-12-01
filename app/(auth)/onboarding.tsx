import { Body } from '@/components/ui/text'
import { useEffect } from 'react'
import { Button } from 'react-native'
import { MMKV } from 'react-native-mmkv'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

// Initialize MMKV
export const storage = new MMKV()

export default function OnBoarding() {
  const onboarding = storage.getBoolean('onBoarding')

  useEffect(() => {
    console.log('Onboarding', onboarding)
  }, [onboarding])

  return (
    <SafeAreaView>
      <Body>Onboarding</Body>
      <Button
        title='set onBoarding'
        onPress={() => {
          storage.set('onBoarding', true)
          router.replace('/(auth)/(tabs)/(home)')
        }}
      />
    </SafeAreaView>
  )
}
