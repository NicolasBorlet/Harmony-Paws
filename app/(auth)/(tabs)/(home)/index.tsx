import { i18n } from '@/app/_layout'
import DogListing from '@/components/dogListing/dog-listing'
import FilterComponent from '@/components/filter/filter-component'
import HomeHeader from '@/components/home/home-header'
import RideListing from '@/components/rideListing/ride-listing'
import { HomeSkeleton } from '@/components/skeletons/home-skeleton'
import { MapButton } from '@/components/ui/button'
import TabSwitcher from '@/components/ui/TabSwitcher'
import { Small } from '@/components/ui/text'
import { tabState } from '@/lib/observables/tab-observable'
import { Ionicons } from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { observer } from '@legendapp/state/react'
import * as Haptics from 'expo-haptics'
import { router } from 'expo-router'
import { useCallback, useRef } from 'react'
import { View } from 'react-native'
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler'
import { useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

function HomeScreen() {
  const insets = useSafeAreaInsets()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const scrollY = useSharedValue(0)
  const currentTab = tabState.get()

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  const onTabChange = useCallback((tab: 'dog' | 'ride') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    tabState.set(tab)
  }, [])

  // Simuler un état de chargement pour le test du skeleton
  const isLoading = false // À remplacer par votre état de chargement réel

  if (isLoading) {
    return <HomeSkeleton />
  }

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
            selectedTab={currentTab}
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
        {currentTab === 'dog' ? (
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

export default observer(HomeScreen)
