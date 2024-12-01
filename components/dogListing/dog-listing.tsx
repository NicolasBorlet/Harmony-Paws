import { Dog } from '@/lib/api/types'
import { dogs$ } from '@/lib/observables/dog-observable'
import { FlashList } from '@shopify/flash-list'
import { router } from 'expo-router'
import { Pressable, View } from 'react-native'
import OpacityFadeIn from '../animate/opacity-fadeIn'
import DogItemListing from './dog-item-listing'

export default function DogListing() {
  const dogs = dogs$.get()

  console.log('Dogs value:', dogs)

  const renderDogItem = ({ item }: { item: Dog }) => (
    <OpacityFadeIn>
      <Pressable onPress={() => router.push(`/dog/${item.id}`)}>
        <DogItemListing dog={item} />
      </Pressable>
    </OpacityFadeIn>
  )

  return (
    <FlashList
      data={dogs}
      renderItem={renderDogItem}
      estimatedItemSize={10}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 24 }}
      showsVerticalScrollIndicator={false}
      // refreshControl={
      //   <RefreshControl
      //     refreshing={isRefreshing}
      //     onRefresh={handleRefresh}
      //   />
      // }
    />
  )
}
