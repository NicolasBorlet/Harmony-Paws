import FormationSingleLoader from '@/components/loader/formation-single-loader'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Medical() {
  return (
    <SafeAreaView className="p-4">
      <FormationSingleLoader />
    </SafeAreaView>
  )
}
