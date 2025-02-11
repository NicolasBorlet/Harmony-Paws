import { usePaginatedDogs } from '@/lib/api/dog'
import { DogListingInterface } from '@/lib/api/types'
import { FlashList } from '@shopify/flash-list'
import { router } from 'expo-router'
import { useCallback, useMemo } from 'react'
import { Pressable, View } from 'react-native'
import OpacityFadeIn from '../animate/opacity-fadeIn'
import LoaderComponent from '../loader'
import ListingLoader from '../loader/listing-loader'
import DogItemListing from './dog-item-listing'

export default function DogListing({ scrollY }: { scrollY: any }) {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePaginatedDogs(5);

  const allDogs = data?.pages.flatMap(page => page.dogs) || [];

  const handleLoadMore = () => {
    if (!isLoading && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  const separatorStyle = useMemo(() => ({ height: 20 }), [])
  const contentContainerStyle = useMemo(() => ({
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24
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

  if (isLoading && !allDogs.length) {
    return <ListingLoader />
  }

  return (
    <FlashList
      data={allDogs}
      renderItem={renderDogItem}
      estimatedItemSize={10}
      ItemSeparatorComponent={() => <View style={separatorStyle} />}
      contentContainerStyle={contentContainerStyle}
      onScroll={(event) => {
        scrollY.value = event.nativeEvent.contentOffset.y
      }}
      showsVerticalScrollIndicator={false}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() => isFetchingNextPage ? <LoaderComponent /> : null}
    />
  )
}
