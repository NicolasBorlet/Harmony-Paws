import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated'

const useSkeletonAnimation = () => {
  const opacity = useSharedValue(0.3)

  useEffect(() => {
    // Démarrer l'animation immédiatement
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 })
      ),
      -1,
      true
    )
  }, [])

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))
}

export const CardSkeleton = () => {
  const animatedStyle = useSkeletonAnimation()

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar} />
        <View style={styles.headerTexts}>
          <View style={styles.headerTextLong} />
          <View style={styles.headerTextShort} />
        </View>
      </View>
      
      {/* Content */}
      <View style={styles.content}>
        <View style={styles.fullLine} />
        <View style={styles.longLine} />
        <View style={styles.mediumLine} />
      </View>
    </Animated.View>
  )
}

export const SimpleCardSkeleton = () => {
  const animatedStyle = useSkeletonAnimation()

  return (
    <Animated.View style={[styles.simpleCard, animatedStyle]}>
      <View style={styles.content}>
        <View style={styles.fullLine} />
        <View style={styles.longLine} />
        <View style={styles.mediumLine} />
      </View>
    </Animated.View>
  )
}

export const RideItemSkeleton = () => {
  const animatedStyle = useSkeletonAnimation()

  return (
    <Animated.View style={[styles.rideCard, animatedStyle]}>  
      {/* Title placeholder */}
      <View style={styles.rideTitle} />
      
      {/* Date row */}
      <View style={styles.dateRow}>
        <View style={styles.datePlaceholder} />
        <View style={styles.timePlaceholder} />
      </View>

      {/* Duration circle */}
      <View style={styles.durationCircle} />
    </Animated.View>
  )
}

export const DogItemSkeleton = () => {
  const animatedStyle = useSkeletonAnimation()

  return (
    <Animated.View style={[styles.dogCard, animatedStyle]}>      
      {/* Title and gender row */}
      <View style={styles.dogInfoRow}>
        <View style={styles.dogTitle} />
        <View style={styles.genderIcon} />
      </View>
    </Animated.View>
  )
}

export const ChatItemSkeleton = () => {
  const animatedStyle = useSkeletonAnimation()

  return (
    <Animated.View style={animatedStyle}>
      <View style={[styles.content, { flexDirection: 'row', alignItems: 'center' }]}>
        {/* Avatar */}
        <View style={styles.avatar} />
        {/* Message */}
        <View style={{ flex: 1, gap: 10 }}>
          <View style={styles.mediumLine} />
          <View style={styles.longLine} />
        </View>
      </View>
    </Animated.View>
  )
}

export const FormationItemSkeleton = () => {
  const animatedStyle = useSkeletonAnimation()

  return (
    <Animated.View style={[styles.formationItem, animatedStyle]}>
      <View style={styles.content}>
        <View style={styles.mediumLine} />
        <View style={styles.mediumLine} />
        <View style={styles.fullLine} />
      </View>
    </Animated.View>
  )
}

export const ModuleItemSkeleton = () => {
  const animatedStyle = useSkeletonAnimation()

  return (
    <Animated.View style={[styles.simpleCard, animatedStyle]}>
      <View style={styles.content}>
        <View style={styles.fullLine} />
        <View style={styles.longLine} />
        <View style={styles.mediumLine} />
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  simpleCard: {
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#d1d5db',
  },
  headerTexts: {
    marginLeft: 12,
  },
  headerTextLong: {
    width: 96,
    height: 12,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
  },
  headerTextShort: {
    width: 64,
    height: 12,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
    marginTop: 8,
  },
  content: {
    gap: 8,
  },
  fullLine: {
    width: '100%',
    height: 12,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
  },
  longLine: {
    width: '83%',
    height: 12,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
  },
  mediumLine: {
    width: '67%',
    height: 12,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
  },
  rideCard: {
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    height: 139,
    marginBottom: 16,
    padding: 16,
    position: 'relative',
  },
  rideImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#d1d5db',
    borderRadius: 8,
  },
  rideTitle: {
    width: 150,
    height: 24,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
    marginTop: 'auto',
    marginBottom: 8,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  datePlaceholder: {
    width: 80,
    height: 16,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
  },
  timePlaceholder: {
    width: 40,
    height: 16,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
  },
  durationCircle: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#d1d5db',
  },
  dogCard: {
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    height: 331,
    marginBottom: 16,
    padding: 16,
    position: 'relative',
  },
  dogImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#d1d5db',
    borderRadius: 8,
  },
  dogInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
  },
  dogTitle: {
    width: 120,
    height: 24,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
  },
  genderIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#d1d5db',
    borderRadius: 12,
    marginLeft: 10,
  },
  chatItem: {
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  formationItem: {
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    aspectRatio: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1,
  },
  moduleItem: {
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
})
