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
import * as Notifications from 'expo-notifications'
import { router } from 'expo-router'
import { useCallback, useRef, useState } from 'react'
import { View } from 'react-native'
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  Pressable,
} from 'react-native-gesture-handler'
import { runOnJS, useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const insets = useSafeAreaInsets()

  const [selectedTab, setSelectedTab] = useState<'dog' | 'ride'>('dog')
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const headerHeight = useSharedValue(200)
  const startY = useSharedValue(0)
  const scrollY = useSharedValue(0)

  // notifications
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  const gesture = Gesture.Pan()
    .onBegin(event => {
      startY.value = event.absoluteY
    })
    .onUpdate(event => {
      const deltaY = startY.value - event.absoluteY
      headerHeight.value = Math.max(
        100, // hauteur minimum
        Math.min(200, 200 - deltaY), // hauteur maximum
      )
    })
    .onEnd(event => {
      // Gestion du swipe horizontal existant
      if (Math.abs(event.translationX) > 50) {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light)
        if (event.translationX > 0) {
          runOnJS(setSelectedTab)('dog')
        } else {
          runOnJS(setSelectedTab)('ride')
        }
      }
    })

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
      <GestureDetector gesture={gesture}>
        <View style={{ flex: 1 }}>
          {selectedTab === 'dog' ? <DogListing scrollY={scrollY}/> : <RideListing />}
        </View>
      </GestureDetector>
      <MapButton onPress={() => router.push('/map')}>
        <Small>{i18n.t('map')}</Small>
        <Ionicons name='map' size={18} color='white' />
      </MapButton>
      <FilterComponent
        bottomSheetModalRef={bottomSheetModalRef}
        handleSheetChanges={handleSheetChanges}
      />
    </GestureHandlerRootView>
  )
}
