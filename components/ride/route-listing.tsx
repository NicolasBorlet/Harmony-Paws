import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import RouteItem, { RouteItemProps } from "./route-item";

const routes: RouteItemProps[] = [
  {
    name: "Place du Laca",
    location: "Champagnier",
    startTime: new Date(),
    endTime: new Date(),
  },
  {
    name: "Tour Ertzienne",
    location: "Champagnier",
    startTime: new Date(),
    endTime: new Date(),
  },
  {
    name: "Place du Laca",
    location: "Champagnier",
    startTime: new Date(),
    endTime: new Date(),
  },
]

export default function RouteListing () {
  return (
    <FlashList
      data={routes}
      renderItem={({ item }) => (
        <RouteItem step={item} />
      )}
      contentContainerStyle={{ paddingTop: 14 }}
      scrollEnabled={false}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
    />
  )
}