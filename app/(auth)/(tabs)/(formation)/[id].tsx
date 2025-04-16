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
  NavigationTitleExtraBold,
} from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { useFormationById } from '@/lib/api/formation'
import { user$ } from '@/lib/observables/session-observable'
import { AntDesign } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import { useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { Platform, ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
export default function FormationDetails() {
  const user = user$.get()
  const { id } = useLocalSearchParams()
  const {
    data: formation,
    isLoading,
    error,
  } = useFormationById(Number(id), user.id)

  const insets = useSafeAreaInsets()

  const [selectedTab, setSelectedTab] = useState<'about' | 'advice'>('about')

  const onTabChange = useCallback((tab: 'about' | 'advice') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setSelectedTab(tab)
  }, [])

  useEffect(() => {
    console.log('formation', formation)
  }, [formation])

  if (isLoading) return <FormationSingleLoader />
  if (error || !formation)
    return <BodyMedium>Une erreur est survenue</BodyMedium>

  const modulesWithPurchaseStatus =
    formation.modules?.map(module => ({
      ...module,
      is_purchased:
        formation.hasPurchase ||
        formation.modulesPurchased?.includes(module.id) ||
        false,
    })) || []

  return (
    <>
      <Back
        backgroundColor='#fff'
        color='black'
        top={Platform.OS === 'ios' ? insets.top : 24}
      />
      <ParallaxScrollView
        headerImage={formation.image || ''}
        paddingHorizontal={0}
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
            }}
          >
            <NavigationTitleExtraBold color='#663399'>
              {formation.name}
            </NavigationTitleExtraBold>
          </View>
          {!formation.hasPurchase && (
            <SegmentedControl
              selectedTab={selectedTab}
              onTabChange={onTabChange}
              language={i18n.locale as 'fr' | 'en'}
            />
          )}
          <View style={{ flex: 1, paddingHorizontal: 16 }}>
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
                      borderRadius: 12,
                      padding: 16,
                      justifyContent: 'center',
                    }}
                  >
                    {!formation.hasPurchase && (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <BodyBold color={Colors.light.secondary}>
                          {i18n.t('formation.completeFormation')}
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
                              <AntDesign
                                name='arrowleft'
                                size={12}
                                color='black'
                              />
                              <ModulePrice color={Colors.light.secondary}>
                                {formation.old_price}€
                              </ModulePrice>
                            </>
                          )}
                        </View>
                      </View>
                    )}
                    <View>
                      <ExtraSmallMedium color='#616060'>
                        {formation.description}
                      </ExtraSmallMedium>
                    </View>
                  </View>
                  <ModuleListing modules={modulesWithPurchaseStatus} />
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
          </View>
        </View>
      </ParallaxScrollView>
    </>
  )
}
