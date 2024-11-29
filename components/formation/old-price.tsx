import { View } from "react-native";
import { ModulePrice } from "../ui/text";

export default function OldPrice ({ oldPrice }: {
  oldPrice: number;
}) {
  return (
    <View>
      <ModulePrice color="#663399">{oldPrice}€</ModulePrice>
    </View>
  )
}