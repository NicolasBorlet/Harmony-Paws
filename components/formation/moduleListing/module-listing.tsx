import { ColumnItem } from "@/components/ui/ColumnItem";
import { Formation } from "@/lib/api/types";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import ModuleListingItem from "./module-listing-item";

const modules: Formation[] = [
  {
    id: 1,
    name: "Module 1",
    subject: "Subject 1",
    image: "https://picsum.photos/300",
    animator_name: "Animator 1",
    price: 100,
    description: "Description 1",
    place: "Place 1",
    date: new Date(),
    participant_limit: 10,
    duration: 1,
    created_at: new Date(),
    updated_at: new Date(),
},
{
    id: 2,
    name: "Module 2",
    subject: "Subject 2",
    image: "https://picsum.photos/300",
    animator_name: "Animator 2",
    price: 200,
    description: "Description 2",
    place: "Place 2",
    date: new Date(),
    participant_limit: 20,
    duration: 2,
    created_at: new Date(),
    updated_at: new Date(),
},
{
    id: 3,
    name: "Module 3",
    subject: "Subject 3",
    image: "https://picsum.photos/300",
    animator_name: "Animator 3",
    price: 300,
    description: "Description 3",
    place: "Place 3",
    date: new Date(),
    participant_limit: 30,
    duration: 3,
    created_at: new Date(),
    updated_at: new Date(),
},
]

const numColumns = 2;

export default function ModuleListing () {
  return (
    <FlashList
      data={modules}
      numColumns={numColumns}
      renderItem={({ index, item }) => (
        <ColumnItem index={index} numColumns={numColumns}>
          <ModuleListingItem module={item} />
        </ColumnItem>
      )}
      keyExtractor={(item) => item.id.toString()}
      scrollEnabled={false}
      ItemSeparatorComponent={() => (
        <View style={{ height: 16 }} />
      )}
      estimatedItemSize={10}
    />
  )
}