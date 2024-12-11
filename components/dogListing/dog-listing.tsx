import { Dog, DogDominance, DogSex } from '@/lib/api/types'
import { session$ } from '@/lib/observables/session-observable'
import { FlashList } from '@shopify/flash-list'
import { router } from 'expo-router'
import { useCallback, useEffect, useMemo } from 'react'
import { Pressable, View } from 'react-native'
import OpacityFadeIn from '../animate/opacity-fadeIn'
import DogItemListing from './dog-item-listing'

const dogs: Dog[] = [
  {
    id: 1,
    owner_id: 1,
    breed_id: 1,
    name: 'Rex',
    age: 3,
    image: 'https://picsum.photos/300',
    sex: DogSex.MALE,
    dominance: DogDominance.DOMINANT,
    description: "Rex est un chien de race australienne. Il est le meilleur ami de la famille et est toujours à l'écoute de ses amis.",
    owner: {
      id: 1,
      name: 'Lucie',
    },
    updated_at: new Date(),
    created_at: new Date(),
  },
]

export default function DogListing() {
  // const dogs = dogs$.get()

  const separatorStyle = useMemo(() => ({ height: 20 }), [])
  const contentContainerStyle = useMemo(() => ({
    paddingHorizontal: 16,
    paddingTop: 24
  }), [])

  const handleDogPress = useCallback((dogId: number) => {
    router.push(`/dog/${dogId}`)
  }, [])

  const renderDogItem = useCallback(({ item }: { item: Dog }) => (
    <OpacityFadeIn>
      <Pressable onPress={() => handleDogPress(item.id)}>
        <DogItemListing dog={item} />
      </Pressable>
    </OpacityFadeIn>
  ), [handleDogPress])

  useEffect(() => {
    console.log('session', session$.get().id)
    console.log('dogs', dogs)
  }, [dogs])

  return (
    <FlashList
      data={dogs}
      renderItem={renderDogItem}
      estimatedItemSize={10}
      ItemSeparatorComponent={() => <View style={separatorStyle} />}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
    />
  )
}
