import { usePaginatedFormations } from "@/lib/api/formation";
import { Formation } from "@/lib/api/types";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import OpacityFadeIn from "../animate/opacity-fadeIn";
import ListingLoader, { ItemType, LoaderType } from "../loader/listing-loader";
import FormationListingItem from "./formation-listing-item";

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

const formations: Formation[] = [
  {
    id: 1,
    name: "Formation 1",
    subject: "Subject 1",
    animator_name: "Animator 1",
    price: 100,
    old_price: 150,
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
    name: "Formation 2",
    subject: "Subject 2",
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
    name: "Formation 3",
    subject: "Subject 3",
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
  {
    id: 4,
    name: "Formation 3",
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
  {
    id: 5,
    name: "Formation 3",
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
  {
    id: 6,
    name: "Formation 3",
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
  }
];

export default function FormationListing() {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePaginatedFormations(5);

  const allFormations = data?.pages.flatMap(page => page.formations) || [];

  const handleLoadMore = () => {
    if (!isLoading && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return <ListingLoader type={LoaderType.LISTING} itemType={ItemType.FORMATION} />
  }

  return (
    <AnimatedFlashList
      data={allFormations}
      renderItem={({ item, index }) => (
        <View style={[index % 2 ? {paddingLeft: 12} : {paddingRight: 12}, {flex: 1}]} >
          <OpacityFadeIn delay={index * 200}>
            <FormationListingItem
              formation={item as Formation}
            />
          </OpacityFadeIn>
        </View>
      )}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => (item as Formation).id.toString()}
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