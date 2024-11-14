import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import DogItemListing from "./dog-item-listing";

const dogData = [
  {
    id: 1,
    name: 'Dog 1',
    image: 'https://picsum.photos/300',
    age: 10,
    sex: 1,
    caracteristics: [0, 3, 8, 10],
  },
  {
    id: 2,
    name: 'Dog 2',
    image: 'https://picsum.photos/300',
    age: 7,
    sex: 1,
    caracteristics: [0, 3, 8, 10],
  },
  {
    id: 3,
    name: 'Dog 3',
    image: 'https://picsum.photos/300',
    age: 4,
    sex: 0,
    caracteristics: [0, 3, 8, 10],
  },
];

export default function DogListing() {
  return (
    <FlashList
      data={dogData}
      renderItem={({ item }) => <DogItemListing dogCardData={item} />}
      estimatedItemSize={10}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 80, paddingTop: 24 }}
      showsVerticalScrollIndicator={false}
    />
  );
}
