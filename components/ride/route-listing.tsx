import { Step } from "@/lib/api/types";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import RouteItem from "./route-item";

export default function RouteListing({ steps }: { steps: Step[] }) {
  if (!steps?.length) return null;
  
  return (
    <FlashList
      data={steps}
      renderItem={({ item, index }) => (
        <RouteItem step={item} index={index} />
      )}
      scrollEnabled={false}
      ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
      estimatedItemSize={3}
    />
  )
}