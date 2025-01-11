import { Colors } from "@/constants/Colors";
import { View } from "react-native";
import { ModulePrice } from "../ui/text";

export default function OldPrice({ oldPrice }: {
  oldPrice: number;
}) {
  return (
    <View>
      <ModulePrice color={Colors.light.secondary}>{oldPrice}€</ModulePrice>
    </View>
  )
}