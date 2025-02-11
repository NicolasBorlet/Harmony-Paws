import { i18n } from '@/app/_layout'
import Back from '@/components/back-button'
import AdviceListing from '@/components/formation/adviceListing/advice-listing'
import ModuleListing from '@/components/formation/moduleListing/module-listing'
import SegmentedControl from '@/components/formation/segmented-control'
import FormationSingleLoader from '@/components/loader/formation-single-loader'
import ParallaxScrollView from '@/components/parallax-scrollview'
import {
  BodyBold,
  BodyMedium,
  ExtraSmallMedium,
  ModulePrice,
  NavigationTitle,
} from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { useFormationById } from '@/lib/api/formation'
import { AntDesign } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import { useLocalSearchParams } from 'expo-router'
import { useCallback, useState } from 'react'
import { ScrollView, View } from 'react-native'
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler'
import { runOnJS, useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function FormationDetails() {
  const insets = useSafeAreaInsets()
  const startY = useSharedValue(0)
  const { id } = useLocalSearchParams()
  const { data: formation, isLoading, error } = useFormationById(Number(id))

  const [selectedTab, setSelectedTab] = useState<'about' | 'advice'>('about')

  const onTabChange = useCallback((tab: 'about' | 'advice') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setSelectedTab(tab)
  }, [])

  const gesture = Gesture.Pan()
    .onBegin(event => {
      startY.value = event.absoluteY
    })
    .onUpdate(event => {
      const deltaY = startY.value - event.absoluteY
    })
    .onEnd(event => {
      if (Math.abs(event.translationX) > 50) {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light)
        if (event.translationX > 0) {
          runOnJS(setSelectedTab)('about')
        } else {
          runOnJS(setSelectedTab)('advice')
        }
      }
    })

  if (isLoading) return <FormationSingleLoader />
  if (error || !formation) return <BodyMedium>Une erreur est survenue</BodyMedium>

  return (
    <>
      <Back />
      <ParallaxScrollView headerImage={formation.image || ''} paddingHorizontal={0}>
        <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: 'white' }}
        >
        <View
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingBottom: 16,
            }}
          >
            <NavigationTitle color='#000'>{formation.name}</NavigationTitle>
          </View>
          <SegmentedControl
            selectedTab={selectedTab}
            onTabChange={onTabChange}
            language={i18n.locale as 'fr' | 'en'}
          />
          <View style={{ flex: 1, paddingHorizontal: 16 }}>
            <GestureDetector gesture={gesture}>
              <View style={{ flex: 1 }}>
                {selectedTab === 'about' ? (
                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      gap: 20,
                    }}
                  >
                    <View
                      style={{
                        marginTop: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                        backgroundColor: 'rgba(102, 51, 153, 0.1)',
                        borderRadius: 10,
                        padding: 16,
                        justifyContent: 'center',
                      }}
                    >
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <BodyBold color={Colors.light.secondary}>
                          {i18n.t('completeFormation')}
                        </BodyBold>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 4,
                            alignItems: 'center',
                          }}
                        >
                          <ModulePrice color='#F7A400'>
                            {formation.price}€
                          </ModulePrice>
                          {formation.old_price && (
                            <>
                              <AntDesign name='arrowleft' size={12} color='black' />
                              <ModulePrice color={Colors.light.secondary}>
                                {formation.old_price}€
                              </ModulePrice>
                            </>
                          )}
                        </View>
                      </View>
                      <View>
                        <ExtraSmallMedium color='#616060'>
                          {formation.description}
                        </ExtraSmallMedium>
                      </View>
                    </View>
                    <ModuleListing modules={formation.modules || []} />
                  </ScrollView>
                ) : (
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                      gap: 20,
                    }}
                  >
                    <AdviceListing />
                  </ScrollView>
                )}
              </View>
            </GestureDetector>
          </View>
        </View>
        </GestureHandlerRootView>
      </ParallaxScrollView>
    </>
  )
}
