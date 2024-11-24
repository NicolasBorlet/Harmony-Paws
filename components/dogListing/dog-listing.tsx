import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import OpacityFadeIn from "../animate/opacity-fadeIn";
import DogItemListing from "./dog-item-listing";

const dogs = [
  {
    id: 1,
    name: "Taico",
    age: 30,
    image: "https://picsum.photos/300",
    description: "Taico est un chien de race australienne. Il est le meilleur ami de la famille et est toujours à l'écoute de ses amis.",
  },
];

export default function DogListing() {
  const renderDogItem = ({ item }: { item: any }) => (
    <OpacityFadeIn>
      <Pressable onPress={() => router.push(`/dog/${item.id}`)}>
        <DogItemListing />
      </Pressable>
    </OpacityFadeIn>
  );

  return (
    <FlashList
      data={dogs}
      renderItem={renderDogItem}
      estimatedItemSize={10}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24 }}
      showsVerticalScrollIndicator={false}
      // refreshControl={
      //   <RefreshControl
      //     refreshing={isRefreshing}
      //     onRefresh={handleRefresh}
      //   />
      // }
    />
  );
}
