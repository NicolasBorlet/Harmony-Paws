import { ExtraSmallMedium, ModulePrice, SmallBold } from "@/components/ui/text";
import { Image } from "expo-image";
import { View } from "react-native";

export default function ModuleListingItem({ module }) {
  return (
    <View style={{ flex: 1, width: "100%", gap: 16 }} >
      <View style={{ flex: 1, borderRadius: 20, overflow: "hidden", height: 150 }}>
        <Image source={{ uri: module.image }} style={{ flex: 1 }} contentFit="cover" />
      </View>
      <View>
        <View style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
          <SmallBold color="#F7A400">{module.name}</SmallBold>
          <ModulePrice color="#F7A400">{module.price}€</ModulePrice>
        </View>
        <View>
          <ExtraSmallMedium color="D9D9D9">{module.description}</ExtraSmallMedium>
        </View>
      </View>
    </View>
  )
};