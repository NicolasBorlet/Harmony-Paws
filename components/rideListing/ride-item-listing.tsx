import { Image } from 'expo-image';
import { StyleSheet, View } from "react-native";
import { RideCard } from "../ui/card";
import { CardTitle, ExtraSmall } from "../ui/text";

const blurhash =
  'L6Pj0^jE.AyE_3t7t7R**0o#DgR4';

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
