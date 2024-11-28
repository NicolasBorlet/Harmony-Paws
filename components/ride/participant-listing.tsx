import { FlashList } from "@shopify/flash-list"
import { View } from "react-native"
import ParticipantItem, { ParticipantItemProps } from "./participant-item"

const participants: ParticipantItemProps[] = [
    {
        id: 1,
        name: "Max",
        image: "https://picsum.photos/300",
        ownerName: "Lucie",
        ownerImage: "https://picsum.photos/300",
        ownerSex: 1
    },
    {
        id: 2,
        name: "Taico",
        image: "https://picsum.photos/300",
        ownerName: "Emma",
        ownerImage: "https://picsum.photos/300",
        ownerSex: 1
    },
    {
        id: 3,
        name: "Astro",
        image: "https://picsum.photos/300",
        ownerName: "Aymeric",
        ownerImage: "https://picsum.photos/300",
        ownerSex: 0
    },
]

export default function ParticipantListing() {
    return (
        <FlashList
            data={participants}
            renderItem={({ item }) => (
                <ParticipantItem participant={item} />
            )}
            contentContainerStyle={{ paddingTop: 14 }}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 24 }} />
          }
        />
    )
}