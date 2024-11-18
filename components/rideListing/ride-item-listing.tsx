import { Image } from 'expo-image';
import { StyleSheet, View } from "react-native";
import { RideCard } from "../ui/card";
import { CardTitle, ExtraSmall } from "../ui/text";

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function RideItemListing({ rideCardData }: { rideCardData: any }) {
  return (
    <RideCard>
      <Image
        style={styles.image}
        source={rideCardData.image}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />
      <CardTitle style={{ color: '#fff' }}>
        {rideCardData.name}
      </CardTitle>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
        <ExtraSmall>
          {rideCardData.date}
        </ExtraSmall>
        <ExtraSmall style={{ fontFamily: 'Montserrat_700Bold' }}>
          {rideCardData.time}
        </ExtraSmall>
      </View>
    </RideCard>
  );
}

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
