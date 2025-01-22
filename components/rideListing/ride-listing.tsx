import { usePaginatedActivities } from "@/lib/api/ride";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import OpacityFadeIn from "../animate/opacity-fadeIn";
import LoaderComponent from "../loader";
import { Body } from "../ui/text";
import RideItemListing from "./ride-item-listing";


export default function RideListing({ scrollY }: { scrollY: any }) {
  const { data, isLoading, isError } = usePaginatedActivities()

  if (isLoading) {
    return <LoaderComponent />
  }
  return (
    <FlashList
      data={data?.activities || []}
      renderItem={({ item, index }) => (
        <Pressable onPress={() => router.push(`/ride/${item.id}`)}>
          <OpacityFadeIn delay={index * 200}>
            <RideItemListing rideCardData={item} />
          </OpacityFadeIn>
        </Pressable>
      )}
      ListEmptyComponent={() => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Body>Aucune activité trouvée</Body>
      </View>}
      estimatedItemSize={10}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 24 }}
      showsVerticalScrollIndicator={false}
      onScroll={(event) => {
        scrollY.value = event.nativeEvent.contentOffset.y
      }}
    />
  );
}
