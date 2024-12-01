import Back from '@/components/back-button'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Settings() {
  const insets = useSafeAreaInsets()

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: 'white' }}>
      <Back />
    </View>
  )
}
