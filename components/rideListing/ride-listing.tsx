import { usePaginatedActivities } from "@/lib/api/ride";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import OpacityFadeIn from "../animate/opacity-fadeIn";
import LoaderComponent from "../loader";
import ListingLoader, { ItemType, LoaderType } from "../loader/listing-loader";
import { Body } from "../ui/text";
import RideItemListing from "./ride-item-listing";

export default function RideListing({ scrollY }: { scrollY: any }) {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePaginatedActivities(5);

  const allActivities = data?.pages.flatMap(page => page.activities) || [];

  const handleLoadMore = () => {
    if (!isLoading && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading && !allActivities.length) {
    return <ListingLoader type={LoaderType.LISTING} itemType={ItemType.RIDE} />
  }

  return (
    <FlashList
      data={allActivities}
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
      ListFooterComponent={() => isFetchingNextPage ? <LoaderComponent /> : null}
      estimatedItemSize={5}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 24 }}
      showsVerticalScrollIndicator={false}
      onScroll={(event) => {
        scrollY.value = event.nativeEvent.contentOffset.y
      }}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
}
