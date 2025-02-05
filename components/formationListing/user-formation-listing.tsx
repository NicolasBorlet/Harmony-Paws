import { useUserPaginatedFormations } from "@/lib/api/formation";
import { useUser } from "@/lib/observables/session-observable";
import { FlashList } from "@shopify/flash-list";
import { useEffect } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import FormationListingItem from "./formation-listing-item";

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

export default function UserFormationListing() {
  const { data: user } = useUser()
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUserPaginatedFormations(5, user?.id);

  const allUserFormations = data?.pages.flatMap(page => page.formations) || [];

  const handleLoadMore = () => {
    if (!isLoading && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    console.log(allUserFormations)
  }, [allUserFormations])

  return (
    <AnimatedFlashList
      data={allUserFormations}
      renderItem={({ item }) => (
        <FormationListingItem
          formation={item}
        />
      )}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      contentContainerStyle={{
        paddingBottom: 24
      }}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      estimatedItemSize={10}
      numColumns={2}
    />
  );
}