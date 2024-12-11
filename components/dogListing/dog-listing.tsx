import { usePaginatedDogs } from '@/lib/api/dog'
import { DogListingInterface } from '@/lib/api/types'
import { FlashList } from '@shopify/flash-list'
import { router } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'
import { Pressable, View } from 'react-native'
import OpacityFadeIn from '../animate/opacity-fadeIn'
import DogItemListing from './dog-item-listing'


export default function DogListing() {
  const [page, setPage] = useState(0)
  const pageSize = 10

  // const dogs = dogs$.get()
  const {
    data,
    isLoading,
    isFetching,
  } = usePaginatedDogs(page, pageSize)

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

  return (
    <FlashList
      data={data?.dogs || []}
      renderItem={renderDogItem}
      estimatedItemSize={10}
      ItemSeparatorComponent={() => <View style={separatorStyle} />}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
    />
    // <LoaderComponent />
  )
}
