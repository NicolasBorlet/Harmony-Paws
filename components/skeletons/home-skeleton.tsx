import { Colors } from '@/constants/Colors'
import { Platform, StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSkeletonAnimation } from './skeletons'

export const HomeSkeleton = () => {
  const insets = useSafeAreaInsets()
  const animatedStyle = useSkeletonAnimation()

  return (
    <GestureHandlerRootView
      style={[
        styles.container,
        { paddingTop: Platform.OS === 'ios' ? insets.top : 0 },
      ]}
    >
      {/* Header section */}
      <View>
        <View style={styles.headerContainer}>
          <View style={[styles.headerTitle, animatedStyle]} />
          <View style={[styles.headerSubtitle, animatedStyle]} />
        </View>

        {/* Tab switcher section */}
        <View style={styles.tabContainer}>
          <View style={styles.tabSwitcher}>
            <View style={[styles.tab, animatedStyle]} />
            <View style={[styles.tab, animatedStyle]} />
          </View>
          <View style={[styles.filterButton, animatedStyle]} />
        </View>
      </View>

      {/* Content section */}
      <View style={styles.contentContainer}>
        {/* List items */}
        {[1, 2, 3].map((_, index) => (
          <View key={index} style={styles.listItem}>
            <View style={[styles.itemImage, animatedStyle]} />
            <View style={styles.itemContent}>
              <View style={[styles.itemTitle, animatedStyle]} />
              <View style={[styles.itemSubtitle, animatedStyle]} />
              <View style={[styles.itemInfo, animatedStyle]} />
            </View>
          </View>
        ))}
      </View>

      {/* Map button */}
      <View style={styles.mapButtonContainer}>
        <View style={[styles.mapButton, animatedStyle]} />
      </View>
    </GestureHandlerRootView>
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
  tabContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  tabSwitcher: {
    flexDirection: 'row',
    gap: 8,
  },
  tab: {
    width: 80,
    height: 48,
    backgroundColor: '#e5e7eb',
    borderRadius: 24,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#e5e7eb',
    borderRadius: 24,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  listItem: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#d1d5db',
  },
  itemContent: {
    flex: 1,
    gap: 8,
  },
  itemTitle: {
    width: '80%',
    height: 24,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
  },
  itemSubtitle: {
    width: '60%',
    height: 16,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
  },
  itemInfo: {
    width: '40%',
    height: 16,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
  },
  mapButtonContainer: {
    position: 'absolute',
    bottom: 32,
    left: 16,
    right: 16,
  },
  mapButton: {
    height: 48,
    backgroundColor: '#e5e7eb',
    borderRadius: 24,
  },
})
