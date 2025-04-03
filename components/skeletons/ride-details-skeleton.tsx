import { Colors } from '@/constants/Colors'
import { Platform, StyleSheet, View } from 'react-native'
import Animated, { FadeOut } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSkeletonAnimation } from './skeletons'

export const RideDetailsSkeleton = () => {
  const insets = useSafeAreaInsets()
  const { animatedStyle, fadeOut } = useSkeletonAnimation()

  return (
    <Animated.View
      style={[styles.container, animatedStyle]}
      exiting={FadeOut.duration(300)}
    >
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
          styles.contentContainer,
          {
            paddingBottom: Platform.OS === 'ios' ? insets.bottom : 72,
          },
        ]}
      >
        {/* Place title */}
        <View style={styles.infoContainer}>
          <View style={[styles.title, animatedStyle]} />
        </View>

        {/* Info row (start time, duration, activities) */}
        <View style={styles.gridRow}>
          <View style={[styles.gridItem, animatedStyle]} />
          <View style={[styles.gridItem, animatedStyle]} />
          <View style={[styles.gridItem, animatedStyle]} />
        </View>

        {/* Divider */}
        <View style={[styles.divider, animatedStyle]} />

        {/* Creator section */}
        <View style={styles.infoContainer}>
          <View style={[styles.sectionTitle, animatedStyle]} />
          <View style={[styles.creatorCard, animatedStyle]}>
            <View style={[styles.creatorImage, animatedStyle]} />
            <View style={styles.creatorInfo}>
              <View style={[styles.creatorName, animatedStyle]} />
              <View style={[styles.creatorDetails, animatedStyle]} />
            </View>
          </View>
        </View>

        {/* Route section */}
        <View style={styles.infoContainer}>
          <View style={[styles.sectionTitle, animatedStyle]} />
          <View style={styles.routeContainer}>
            {[1, 2, 3].map((_, index) => (
              <View key={index} style={[styles.routeStep, animatedStyle]} />
            ))}
          </View>
        </View>

        {/* Participants section */}
        <View style={styles.infoContainer}>
          <View style={[styles.sectionTitle, animatedStyle]} />
          <View style={styles.participantsContainer}>
            {[1, 2, 3].map((_, index) => (
              <View key={index} style={[styles.participantCard, animatedStyle]}>
                <View style={[styles.participantImage, animatedStyle]} />
                <View style={styles.participantInfo}>
                  <View style={[styles.participantName, animatedStyle]} />
                  <View style={[styles.participantDetails, animatedStyle]} />
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Join button skeleton */}
      <Animated.View style={styles.buttonContainer}>
        <View style={[styles.button, animatedStyle]} />
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
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
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
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
  creatorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
  },
  creatorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#d1d5db',
  },
  creatorInfo: {
    flex: 1,
    gap: 8,
  },
  creatorName: {
    width: 150,
    height: 24,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
  },
  creatorDetails: {
    width: 100,
    height: 16,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
  },
  routeContainer: {
    gap: 12,
  },
  routeStep: {
    height: 80,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
  },
  participantsContainer: {
    gap: 12,
  },
  participantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
  },
  participantImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d1d5db',
  },
  participantInfo: {
    flex: 1,
    gap: 4,
  },
  participantName: {
    width: 120,
    height: 20,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
  },
  participantDetails: {
    width: 80,
    height: 16,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 32,
    left: 16,
    right: 16,
  },
  button: {
    height: 48,
    backgroundColor: '#e5e7eb',
    borderRadius: 24,
  },
})
