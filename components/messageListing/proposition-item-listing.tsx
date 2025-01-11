import { Image } from "expo-image";
import { View } from "react-native";
import { ExtraSmallMedium, MessageListingAuthor } from "../ui/text";

export default function PropositionItemListing({ propositionData }: { propositionData: any }) {
  return (
    <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
      <Image source={{ uri: propositionData.avatar }} style={{ width: 60, height: 60, borderRadius: 100 }} />
      <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <MessageListingAuthor>{propositionData.name}</MessageListingAuthor>
        <ExtraSmallMedium
          color="#979898"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {propositionData.description}
        </ExtraSmallMedium>
      </View>
    </View>
  )
}