import Divider from "@/components/ui/divider";
import { Advice } from "@/lib/api/types";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import AdviceListingItem from "./advice-listing-item";

const advice: Advice[] = [
  {
    id: 1,
    title: "Je recommande",
    description: "J’ai acheté deux modules et ils sont très complets. Je recommande",
    rating: 5,
    date: new Date(),
    creator: {
      id: 1,
      name: "Creator 1",
      image: "https://picsum.photos/300",
    },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    title: "Je recommande",
    description: "J’ai acheté deux modules et ils sont très complets. Je recommande",
    rating: 4,
    date: new Date(),
    creator: {
      id: 1,
      name: "Creator 1",
      image: "https://picsum.photos/300",
    },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 3,
    title: "Je recommande",
    description: "J’ai acheté deux modules et ils sont très complets. Je recommande",
    rating: 5,
    date: new Date(),
    creator: {
      id: 1,
      name: "Creator 1",
      image: "https://picsum.photos/300",
    },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 4,
    title: "Je recommande",
    description: "J’ai acheté deux modules et ils sont très complets. Je recommande",
    rating: 5,
    date: new Date(),
    creator: {
      id: 1,
      name: "Creator 1",
      image: "https://picsum.photos/300",
    },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 6,
    title: "Je recommande",
    description: "J’ai acheté deux modules et ils sont très complets. Je recommande",
    rating: 4,
    date: new Date(),
    creator: {
      id: 1,
      name: "Creator 1",
      image: "https://picsum.photos/300",
    },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 7,
    title: "Je recommande",
    description: "J’ai acheté deux modules et ils sont très complets. Je recommande",
    rating: 5,
    date: new Date(),
    creator: {
      id: 1,
      name: "Creator 1",
      image: "https://picsum.photos/300",
    },
    created_at: new Date(),
    updated_at: new Date(),
  },
]

export default function AdviceListing () {
  return (
    <FlashList
      data={advice}
      renderItem={({ item }) => (
        <AdviceListingItem advice={item} />
      )}
      keyExtractor={(item) => item.id.toString()}
      scrollEnabled={false}
      ItemSeparatorComponent={() => (
        <View style={{ marginTop: 20 }}>
          <Divider />
        </View>
      )}
      estimatedItemSize={10}
    />
  )
}