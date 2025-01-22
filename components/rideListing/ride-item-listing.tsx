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
        {rideCardData.place}
      </CardTitle>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
        <ExtraSmall>
          {rideCardData.date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long'
          })} à
        </ExtraSmall>
        <ExtraSmall style={{ fontFamily: 'Montserrat_700Bold' }}>
          {`${rideCardData.date.getHours()}h${String(rideCardData.date.getMinutes()).padStart(2, '0')}`}
        </ExtraSmall>
      </View>
      <View style={{ position: 'absolute', right: 24, top: 16 }}>
        <View style={{ borderRadius: 999, width: 24, height: 24, borderWidth: 1, borderColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ExtraSmall style={{ fontFamily: 'Montserrat_700Bold' }}>
            {rideCardData.duration}
          </ExtraSmall>
        </View>
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
