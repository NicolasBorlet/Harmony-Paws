import ListingLoader, { ItemType, LoaderType } from "@/components/loader/listing-loader";
import { useSkeletonAnimation } from "@/components/skeletons/skeletons";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

export default function FormationSingleLoader() {
  const animatedStyle = useSkeletonAnimation()

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Animated.View style={[animatedStyle, { flex: 1, gap: 16 }]}>
        <View style={styles.simpleCard} />
        <View style={styles.descriptionContainer}>
          <View style={styles.description} />
          <View style={styles.description} />
          <View style={styles.description} />
        </View>
        <ListingLoader type={LoaderType.LISTING} itemType={ItemType.FORMATION} />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  simpleCard: {
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
  },
  description: {
    width: '100%',
    height: 12,
    borderRadius: 4,
    backgroundColor: '#d1d5db',
  },
  descriptionContainer: {
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
    width: '100%',
    height: 100,
    gap: 8,
  }
})
