import { i18n } from '@/app/_layout'
import DogListing from '@/components/dogListing/dog-listing'
import FilterComponent from '@/components/filter/filter-component'
import HomeHeader from '@/components/home/home-header'
import RideListing from '@/components/rideListing/ride-listing'
import { MapButton } from '@/components/ui/button'
import TabSwitcher from '@/components/ui/TabSwitcher'
import { Small } from '@/components/ui/text'
import { Ionicons } from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import * as Haptics from 'expo-haptics'
import { router } from 'expo-router'
import { useCallback, useRef, useState } from 'react'
import { View } from 'react-native'
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler'
import { useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const insets = useSafeAreaInsets()

  const [selectedTab, setSelectedTab] = useState<'dog' | 'ride'>('dog')
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const scrollY = useSharedValue(0)

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  const onTabChange = useCallback((tab: 'dog' | 'ride') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setSelectedTab(tab)
  }, [])

  return (
    <GestureHandlerRootView
      style={{ flex: 1, paddingTop: insets.top, backgroundColor: 'white' }}
    >
      <View>
        <View style={{ paddingHorizontal: 16 }}>
          <HomeHeader scrollY={scrollY} />
        </View>
        <View
          style={{
            paddingTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <TabSwitcher
            selectedTab={selectedTab}
            onTabChange={onTabChange}
            language={i18n.locale as 'fr' | 'en'}
          />
          <Pressable onPress={handlePresentModalPress}>
            <Ionicons
              name='filter'
              size={21}
              color='black'
              style={{ height: 48, width: 48 }}
            />
          </Pressable>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {selectedTab === 'dog' ? (
          <DogListing scrollY={scrollY} />
        ) : (
          <RideListing scrollY={scrollY} />
        )}
      </View>
      <MapButton onPress={() => router.push('/map')}>
        <Small>{i18n.t('global.map')}</Small>
        <Ionicons name='map' size={18} color='white' />
      </MapButton>
      <FilterComponent
        bottomSheetModalRef={bottomSheetModalRef}
        handleSheetChanges={handleSheetChanges}
      />
    </GestureHandlerRootView>
  )
}
