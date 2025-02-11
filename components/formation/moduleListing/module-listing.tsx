import { ColumnItem } from "@/components/ui/ColumnItem";
import { ModuleInterface } from "@/lib/api/types/interfaces";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import OpacityFadeIn from "../../animate/opacity-fadeIn";
import ModuleListingItem from "./module-listing-item";

const numColumns = 2;

interface ModuleListingProps {
  modules?: ModuleInterface[]
}

export default function ModuleListing({ modules = [] }: ModuleListingProps) {
  return (
    <FlashList
      data={modules}
      numColumns={numColumns}
      renderItem={({ index, item }) => (
        <ColumnItem index={index} numColumns={numColumns}>
          <Pressable onPress={() => router.push(`/module/${item.id}`)} style={{
            flex: 1,
            width: "100%",
            height: "100%",
          }}>
            <OpacityFadeIn delay={index * 200}>
              <ModuleListingItem module={item} />
            </OpacityFadeIn>
          </Pressable>
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