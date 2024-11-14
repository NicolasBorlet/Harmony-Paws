import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import DogItemListing from "./dog-item-listing";

const dogData = [
  {
    id: 1,
    name: 'Dog 1',
    image: 'https://picsum.photos/300',
  },
  {
    id: 2,
    name: 'Dog 2',
    image: 'https://picsum.photos/300',
  },
  {
    id: 3,
    name: 'Dog 3',
    image: 'https://picsum.photos/300',
  },
];

export default function DogListing() {
  return (
    <FlashList
      data={dogData}
      renderItem={({ item }) => <DogItemListing />}
      estimatedItemSize={10}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 80 }}
      showsVerticalScrollIndicator={false}
    />
  );
}
