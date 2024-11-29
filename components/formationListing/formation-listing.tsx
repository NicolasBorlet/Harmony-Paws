import { Formation } from "@/lib/api/types";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import FormationListingItem from "./formation-listing-item";

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

const formations: Formation[] = [
  {
      id: 1,
      name: "Formation 1",
      subject: "Subject 1",
      image: "https://picsum.photos/300",
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
];

export default function FormationListing() {
  return (
    <AnimatedFlashList
      data={formations}
      renderItem={({ item }) => (
        <FormationListingItem
          formation={item}
        />
      )}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
    />
  );
}