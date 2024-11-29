import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";

export default function StarRating ({ rating }: { rating: number }) {
  return (
    <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <AntDesign keyExtractor={i} name="star" size={12} color={i <= rating ? "#F7A400" : "black"} />
      ))}
    </View>
  )
};