import { Colors } from '@/constants/Colors'
import { Platform, StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSkeletonAnimation } from './skeletons'

export const DogDetailsSkeleton = () => {
  const insets = useSafeAreaInsets()
  const animatedStyle = useSkeletonAnimation()

  return (
    <>
      {/* Back button skeleton */}
      <View style={styles.backButtonContainer}>
        <View style={[styles.backButton, animatedStyle]} />
      </View>

      {/* Parallax image skeleton */}
      <View style={styles.parallaxContainer}>
        <View style={[styles.parallaxImage, animatedStyle]} />
      </View>

      {/* Content skeleton */}
      <View
        style={[
          styles.container,
          {
            paddingBottom: Platform.OS === 'ios' ? insets.bottom : 72,
          },
        ]}
      >
        {/* Name and age */}
        <View style={styles.infoContainer}>
          <View style={[styles.title, animatedStyle]} />
        </View>

        {/* Breed, sex, dominance row */}
        <View style={styles.gridRow}>
          <View style={[styles.gridItem, animatedStyle]} />
          <View style={[styles.gridItem, animatedStyle]} />
          <View style={[styles.gridItem, animatedStyle]} />
        </View>

        {/* Divider */}
        <View style={[styles.divider, animatedStyle]} />

        {/* About section */}
        <View style={styles.infoContainer}>
          <View style={[styles.sectionTitle, animatedStyle]} />
          <View style={[styles.description, animatedStyle]} />
        </View>

        {/* Divider */}
        <View style={[styles.divider, animatedStyle]} />

        {/* Behavior section */}
        <View style={styles.infoContainer}>
          <View style={[styles.sectionTitle, animatedStyle]} />
          <View style={styles.behaviorGrid}>
            {[1, 2, 3].map((_, index) => (
              <View key={index} style={[styles.behaviorItem, animatedStyle]} />
            ))}
          </View>
        </View>

        {/* Divider */}
        <View style={[styles.divider, animatedStyle]} />

        {/* Master section */}
        <View style={styles.infoContainer}>
          <View style={[styles.sectionTitle, animatedStyle]} />
          <View style={[styles.masterCard, animatedStyle]}>
            <View style={[styles.masterImage, animatedStyle]} />
            <View style={styles.masterInfo}>
              <View style={[styles.masterName, animatedStyle]} />
              <View style={[styles.masterDetails, animatedStyle]} />
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={[styles.divider, animatedStyle]} />

        {/* Next ride section */}
        <View style={styles.infoContainer}>
          <View style={[styles.sectionTitle, animatedStyle]} />
          <View style={[styles.nextRideText, animatedStyle]} />
        </View>
      </View>

      {/* Button skeleton */}
      <Animated.View style={styles.buttonContainer}>
        <View style={[styles.button, animatedStyle]} />
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  backButtonContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
  },
  parallaxContainer: {
    height: 300,
    width: '100%',
  },
  parallaxImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e5e7eb',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    padding: 16,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  title: {
    width: 200,
    height: 32,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 8,
  },
  gridItem: {
    flex: 1,
    height: 60,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    width: '100%',
  },
  sectionTitle: {
    width: 150,
    height: 24,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
  },
  description: {
    width: '100%',
    height: 80,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
  },
  behaviorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  behaviorItem: {
    width: 100,
    height: 32,
    backgroundColor: '#e5e7eb',
    borderRadius: 16,
  },
  masterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
  },
  masterImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#d1d5db',
  },
  masterInfo: {
    flex: 1,
    gap: 8,
  },
  masterName: {
    width: 150,
    height: 24,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
  },
  masterDetails: {
    width: 100,
    height: 16,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
  },
  nextRideText: {
    width: '100%',
    height: 24,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 32,
    left: 20,
    right: 20,
  },
  button: {
    height: 48,
    backgroundColor: '#e5e7eb',
    borderRadius: 24,
  },
})
