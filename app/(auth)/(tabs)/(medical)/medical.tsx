import { i18n } from '@/app/_layout'
import DogCard from '@/components/medical/dog-card'
import MedicalHeader from '@/components/medical/medical-header'
import { StandardButton } from '@/components/ui/button'
import { Body, ExtraSmall } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { useDogsFromUserId } from '@/lib/api/dog'
import { DogListingInterface } from '@/lib/api/types'
import { user$ } from '@/lib/observables/session-observable'
import { FlashList } from '@shopify/flash-list'
import { router } from 'expo-router'

import { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native'
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const CARD_WIDTH = 250 // Largeur de la carte
const CARD_HEIGHT = 260 // Hauteur de la carte
const CARD_GAP = 32 // Espacement entre les cartes
const SCALE_FACTOR = 1.1 // Facteur d'échelle maximum pour la carte active
const CONTAINER_HEIGHT = CARD_HEIGHT * SCALE_FACTOR + 64 // Hauteur du conteneur avec espace pour l'ombre
const ITEM_TOTAL_WIDTH = CARD_WIDTH + CARD_GAP // Largeur totale d'un item avec son gap
const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default function Medical() {
  const scrollY = useSharedValue(0)
  const insets = useSafeAreaInsets()
  const [activeIndex, setActiveIndex] = useState(0)
  const [dogs, setDogs] = useState<DogListingInterface[]>([])
  const flashListRef = useRef<FlashList<DogListingInterface>>(null)

  const user = user$.get()
  const { data: userDogs } = useDogsFromUserId(user?.id)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y
    },
  })

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x
    const index = Math.round(scrollPosition / ITEM_TOTAL_WIDTH)
    if (index !== activeIndex) {
      setActiveIndex(index)
      const updatedDogs = dogs.map((dog: DogListingInterface, i: number) => ({
        ...dog,
        active: i === index,
      }))
      setDogs(updatedDogs)
    }
  }

  // Centrer l'élément actif au montage
  useEffect(() => {
    if (flashListRef.current) {
      flashListRef.current.scrollToIndex({
        index: activeIndex,
        animated: true,
        viewPosition: 0.5,
      })
    }
  }, [])

  useEffect(() => {
    if (userDogs) {
      console.log('userDogs', userDogs)
      const updatedDogs = userDogs.map(
        (dog: DogListingInterface, index: number) => ({
          ...dog,
          active: index === 0,
        }),
      )
      console.log('updatedDogs', updatedDogs)
      setDogs(updatedDogs)
    }
  }, [userDogs])

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <View style={{ paddingHorizontal: 16 }}>
        <MedicalHeader scrollY={scrollY} />
      </View>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ padding: 16, paddingTop: 0 }}>
          <ExtraSmall color={Colors.black}>
            {i18n.t('medical.healthRecordDescription')}
          </ExtraSmall>
        </View>
        <View style={{ height: CONTAINER_HEIGHT, width: SCREEN_WIDTH }}>
          <FlashList
            ref={flashListRef}
            data={dogs}
            horizontal
            onScroll={handleScroll}
            scrollEventThrottle={16}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }: { item: DogListingInterface }) => (
              <View
                style={{
                  width: CARD_WIDTH + CARD_GAP,
                  height: CONTAINER_HEIGHT,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: CARD_GAP / 2,
                  paddingVertical: 8,
                }}
              >
                <DogCard dog={item} active={item.active} />
              </View>
            )}
            estimatedItemSize={5}
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_TOTAL_WIDTH}
            decelerationRate='fast'
            contentContainerStyle={{
              paddingHorizontal: (SCREEN_WIDTH - CARD_WIDTH - CARD_GAP) / 2,
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <StandardButton
            width='140'
            onPress={() => {
              router.push(`/${dogs[activeIndex].id}`)
            }}
          >
            <Body color={Colors.white}>{i18n.t('global.choose')}</Body>
          </StandardButton>
        </View>
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonContainer: {
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
