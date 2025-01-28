import { ExtraSmallMedium, ModulePrice, SmallBold } from "@/components/ui/text";
import { ModuleInterface } from "@/lib/api/types/interfaces";
import { Image } from "expo-image";
import { View } from "react-native";

interface ModuleListingItemProps {
  module: ModuleInterface
}

export default function ModuleListingItem({ module }: ModuleListingItemProps) {
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