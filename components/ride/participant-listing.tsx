import { User } from "@/lib/api/types"
import { FlashList } from "@shopify/flash-list"
import { View } from "react-native"
import ParticipantItem from "./participant-item"

interface ParticipantListingProps {
  participants: User[]
}

export default function ParticipantListing({ participants }: ParticipantListingProps) {
  if (!participants?.length) return null;

  return (
    <FlashList
      data={participants}
      renderItem={({ item }) => (
        <ParticipantItem participant={item} />
      )}
      contentContainerStyle={{ paddingTop: 14 }}
      scrollEnabled={false}
      ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
      estimatedItemSize={70}
    />
  )
}