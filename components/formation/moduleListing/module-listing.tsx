import { ModuleInterface } from '@/lib/api/types/interfaces'
import { FlashList } from '@shopify/flash-list'
import { router } from 'expo-router'
import { Pressable, View } from 'react-native'
import OpacityFadeIn from '../../animate/opacity-fadeIn'
import TranslateY from '../../animate/translateY'
import ModuleListingItem from './module-listing-item'

interface ModuleListingProps {
  modules?: ModuleInterface[]
}

export default function ModuleListing({ modules = [] }: ModuleListingProps) {
  return (
    <FlashList
      data={modules}
      renderItem={({ index, item }) => (
        <Pressable onPress={() => router.push(`/module/${item.id}`)}>
          <OpacityFadeIn delay={index * 200}>
            <TranslateY delay={index * 200}>
              <ModuleListingItem module={item} />
            </TranslateY>
          </OpacityFadeIn>
        </Pressable>
      )}
      keyExtractor={item => item.id.toString()}
      scrollEnabled={false}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      estimatedItemSize={10}
    />
  )
}
