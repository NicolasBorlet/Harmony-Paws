import { i18n } from '@/app/_layout'
import DogCard from '@/components/medical/dog-card'
import MedicalHeader from '@/components/medical/medical-header'
import { ExtraSmall } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { FlashList } from '@shopify/flash-list'
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

const initialDogs = [
  {
    id: 1,
    name: 'Taico',
    age: 3,
    gender: 'male',
    image: 'https://picsum.photos/200/300',
    active: true,
  },
  {
    id: 2,
    name: 'Taico',
    age: 3,
    gender: 'male',
    image: 'https://picsum.photos/200/300',
    active: false,
  },
  {
    id: 3,
    name: 'Taico',
    age: 3,
    gender: 'male',
    image: 'https://picsum.photos/200/300',
    active: false,
  },
]

const CARD_WIDTH = 280 // Largeur de la carte + marge
const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default function Medical() {
  const scrollY = useSharedValue(0)
  const insets = useSafeAreaInsets()
  const [activeIndex, setActiveIndex] = useState(0)
  const [dogs, setDogs] = useState(initialDogs)
  const flashListRef = useRef<FlashList<(typeof dogs)[0]>>(null)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y
    },
  })

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x
    const index = Math.round(scrollPosition / CARD_WIDTH)
    if (index !== activeIndex) {
      setActiveIndex(index)
      const updatedDogs = dogs.map((dog, i) => ({
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

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <MedicalHeader scrollY={scrollY} />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ padding: 16 }}>
          <ExtraSmall color={Colors.black}>
            {i18n.t('healthRecordDescription')}
          </ExtraSmall>
        </View>
        <FlashList
          ref={flashListRef}
          data={dogs}
          horizontal
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ width: CARD_WIDTH }}>
              <DogCard dog={item} active={item.active} />
            </View>
          )}
          estimatedItemSize={CARD_WIDTH}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          decelerationRate='fast'
          contentContainerStyle={{
            paddingHorizontal: (SCREEN_WIDTH - CARD_WIDTH) / 2,
          }}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        />
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
