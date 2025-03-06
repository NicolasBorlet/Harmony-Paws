import Back from '@/components/back-button'
import { Body } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { useLocalSearchParams, usePathname } from 'expo-router'
import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function HealthRecord() {
  const { id } = useLocalSearchParams()
  const pathname = usePathname()
  const insets = useSafeAreaInsets()

  useEffect(() => {
    console.log('id', id)
    console.log('pathname', pathname)
  }, [id])

  return (
    <View style={styles.container}>
      <Back position='relative' top={insets.top} />
      <Body>Health Record</Body>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
})
