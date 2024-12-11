import { useDogsFromUserId } from '@/lib/api/dog'
import { DogListingInterface, DogSex } from '@/lib/api/types'
import { FlashList } from '@shopify/flash-list'
import { router } from 'expo-router'
import { useCallback, useEffect, useMemo } from 'react'
import { Pressable, View } from 'react-native'
import OpacityFadeIn from '../animate/opacity-fadeIn'
import DogItemListing from './dog-item-listing'

const dogs: DogListingInterface[] = [
  {
    id: 1,
    name: 'Rex',
    age: 3,
    image: 'https://picsum.photos/300',
    sex: DogSex.MALE,
    updated_at: new Date(),
    created_at: new Date(),
  },
]

export default function DogListing() {
  // const dogs = dogs$.get()
  const { data, isLoading, error } = useDogsFromUserId('1')

  const separatorStyle = useMemo(() => ({ height: 20 }), [])
  const contentContainerStyle = useMemo(() => ({
    paddingHorizontal: 16,
    paddingTop: 24
  }), [])

  const handleDogPress = useCallback((dogId: number) => {
    router.push(`/dog/${dogId}`)
  }, [])

  const renderDogItem = useCallback(({ item }: { item: DogListingInterface }) => (
    <OpacityFadeIn>
      <Pressable onPress={() => handleDogPress(item.id)}>
        <DogItemListing dog={item} />
      </Pressable>
    </OpacityFadeIn>
  ), [handleDogPress])

  useEffect(() => {
    // console.log('session', session$.get().id)
    console.log('dogs', data)
  }, [dogs])

  return (
    <FlashList
      data={data}
      renderItem={renderDogItem}
      estimatedItemSize={10}
      ItemSeparatorComponent={() => <View style={separatorStyle} />}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
    />
  )
}
