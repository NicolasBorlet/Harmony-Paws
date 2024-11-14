import { getCaracteristicsIcons } from '@/constants/dog-caracteristics';
import Foundation from '@expo/vector-icons/Foundation';
import { Image } from 'expo-image';
import { StyleSheet, View } from "react-native";
import { DogCard } from "../ui/card";
import { CardTitle } from "../ui/text";

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function DogItemListing({ dogCardData }: { dogCardData: any }) {
  return (
    <DogCard>
      <Image
        style={styles.image}
        source={dogCardData.image}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />
      <CardTitle style={{ color: '#fff' }}>
        {dogCardData.name}, {dogCardData.age} ans
        {dogCardData.sex === 0 ? (
          <View style={{ paddingLeft: 10 }}>
            <Foundation name="male-symbol" size={24} color="white" />
          </View>
        ) : (
          <View style={{ paddingLeft: 10 }}>
            <Foundation name="female-symbol" size={24} color="white" />
          </View>
        )}
      </CardTitle>
      {getCaracteristicsIcons(dogCardData.caracteristics)}
    </DogCard>
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
