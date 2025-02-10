import { CardSkeleton, DogItemSkeleton, RideItemSkeleton, SimpleCardSkeleton } from '@/components/skeletons/skeletons'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Medical() {
  return (
    <SafeAreaView className="p-4">
      <CardSkeleton />
      <SimpleCardSkeleton />
      <RideItemSkeleton />
      <DogItemSkeleton />
    </SafeAreaView>
  )
}
