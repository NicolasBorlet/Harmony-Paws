import { View } from "react-native";
import { DogItemSkeleton } from "../skeletons/skeletons";

export default function ListingLoader() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <DogItemSkeleton />
      <DogItemSkeleton />
    </View>
  )
}