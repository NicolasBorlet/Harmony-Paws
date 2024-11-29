import { Image } from "expo-image";
import { View } from "react-native";

export default function ModuleListingItem({ module }) {
  return (
    <View style={{ flex: 1, width: "100%", height: 150, borderRadius: 20, overflow: "hidden" }} >
      <Image source={{ uri: module.image }} style={{ flex: 1, width: "100%", height: 150 }} />
    </View>
  )
};