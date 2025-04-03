import { Colors } from '@/constants/Colors'
import { Platform, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSkeletonAnimation } from './skeletons'

export const HealthRecordSkeleton = () => {
  const insets = useSafeAreaInsets()
  const animatedStyle = useSkeletonAnimation()

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Platform.OS === 'ios' ? insets.top : 0 },
      ]}
    >
      {/* Back button skeleton */}
      <View style={[styles.backButton, animatedStyle]} />

      {/* Header skeleton */}
      <View style={styles.headerContainer}>
        <View style={[styles.headerTitle, animatedStyle]} />
        <View style={[styles.headerSubtitle, animatedStyle]} />
      </View>

      {/* Content skeleton */}
      <View style={styles.content}>
        {/* First row with 3 items */}
        <View style={styles.firstRow}>
          <View style={[styles.gridItem, animatedStyle]} />
          <View style={[styles.gridItem, animatedStyle]} />
          <View style={[styles.gridItem, animatedStyle]} />
        </View>

        {/* Second row with 2 items */}
        <View style={styles.secondRow}>
          <View style={[styles.infoCard, animatedStyle]} />
          <View style={[styles.infoCard, animatedStyle]} />
        </View>

        {/* Vaccines card */}
        <View style={[styles.listCard, animatedStyle]} />

        {/* Documents card */}
        <View style={[styles.listCard, animatedStyle]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
    marginTop: 16,
    marginLeft: 16,
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
  content: {
    padding: 16,
    gap: 32,
  },
  firstRow: {
    flexDirection: 'row',
    gap: 8,
  },
  gridItem: {
    flex: 1,
    height: 80,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
  },
  secondRow: {
    flexDirection: 'row',
    gap: 32,
  },
  infoCard: {
    flex: 1,
    height: 120,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
  },
  listCard: {
    height: 160,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
  },
})
