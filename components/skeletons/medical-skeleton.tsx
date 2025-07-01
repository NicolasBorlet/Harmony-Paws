import { Colors } from '@/constants/Colors'
import { Dimensions, Platform, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSkeletonAnimation } from './skeletons'

const CARD_WIDTH = 250
const CARD_HEIGHT = 260
const CARD_GAP = 32
const SCALE_FACTOR = 1.1
const CONTAINER_HEIGHT = CARD_HEIGHT * SCALE_FACTOR + 64
const ITEM_TOTAL_WIDTH = CARD_WIDTH + CARD_GAP
const { width: SCREEN_WIDTH } = Dimensions.get('window')

export const MedicalSkeleton = () => {
  const insets = useSafeAreaInsets()
  const animatedStyle = useSkeletonAnimation()

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Platform.OS === 'ios' ? insets.top : 0 },
      ]}
    >
      {/* Header skeleton */}
      <View style={styles.headerContainer}>
        <View style={[styles.headerTitle, animatedStyle]} />
        <View style={[styles.headerSubtitle, animatedStyle]} />
      </View>

      {/* Description skeleton */}
      <View style={styles.descriptionContainer}>
        <View style={[styles.descriptionLine, animatedStyle]} />
        <View style={[styles.descriptionLine, animatedStyle]} />
        <View style={[styles.descriptionLine, animatedStyle]} />
      </View>

      {/* Cards carousel skeleton */}
      <View style={styles.externalContainer}>
        <View style={styles.flashListContainer}>
          <View style={styles.cardsContainer}>
            {/* Render 3 skeleton cards */}
            {[1, 2, 3].map((_, index) => (
              <View key={index} style={styles.cardContainer}>
                <View style={[styles.card, animatedStyle]}>
                  {/* Card image skeleton */}
                  <View style={[styles.cardImage, animatedStyle]} />

                  {/* Card content skeleton */}
                  <View style={styles.cardContent}>
                    <View style={[styles.cardTitle, animatedStyle]} />
                    <View style={[styles.cardInfo, animatedStyle]} />
                    <View style={[styles.cardInfo, animatedStyle]} />
                    <View style={[styles.cardInfo, animatedStyle]} />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Button skeleton */}
      <View style={styles.buttonContainer}>
        <View style={[styles.button, animatedStyle]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 8,
  },
  headerTitle: {
    width: 200,
    height: 32,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
  },
  headerSubtitle: {
    width: 150,
    height: 24,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 8,
  },
  descriptionLine: {
    width: '100%',
    height: 16,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
  },
  externalContainer: {
    height: CONTAINER_HEIGHT + 64,
    width: SCREEN_WIDTH,
  },
  flashListContainer: {
    width: SCREEN_WIDTH,
    height: CONTAINER_HEIGHT,
    marginVertical: 32,
  },
  cardsContainer: {
    flexDirection: 'row',
    paddingHorizontal: (SCREEN_WIDTH - CARD_WIDTH - CARD_GAP) / 2,
  },
  cardContainer: {
    width: CARD_WIDTH + CARD_GAP,
    height: CONTAINER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: CARD_GAP / 2,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#e5e7eb',
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#d1d5db',
  },
  cardContent: {
    padding: 16,
    gap: 8,
  },
  cardTitle: {
    width: 120,
    height: 24,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
  },
  cardInfo: {
    width: 80,
    height: 16,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
  },
  buttonContainer: {
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 140,
    height: 48,
    backgroundColor: '#e5e7eb',
    borderRadius: 24,
  },
})
