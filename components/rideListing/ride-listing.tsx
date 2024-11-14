import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import RideItemListing from "./ride-item-listing";

const rideData = [
  {
    id: 1,
    name: 'Ride 1',
    date: '14/11/2024',
    time: '10:00',
  },
  {
    id: 2,
    name: 'Ride 2',
    date: '14/11/2024',
    time: '10:00',
  },
  {
    id: 3,
    name: 'Ride 3',
    date: '14/11/2024',
    time: '10:00',
  },
];

export default function RideListing() {
  return (
    <FlashList
      data={rideData}
      renderItem={({ item }) => <RideItemListing rideCardData={item} />}
      estimatedItemSize={10}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 80, paddingTop: 24 }}
      showsVerticalScrollIndicator={false}
    />
  );
}
