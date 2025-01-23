import { Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import { View } from "react-native";
import { MasterDogCard } from "../ui/card";
import { Body, Small } from "../ui/text";

export default function MasterDogCardComponent({ masterData }: { masterData: { first_name: string, last_name: string, id: string } }) {
  return (
    <MasterDogCard>
      <Image source={{
        uri: 'https://picsum.photos/300'
      }} style={{
        width: 60,
        height: 60,
        borderRadius: 1000,
        objectFit: 'cover'
      }} />
      <View style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        flex: 1,
      }}>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 4
        }}>
          <Body>{masterData.first_name}</Body>
        </View>
        <Small color="#979898" numberOfLines={2}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</Small>
      </View>
      <View style={{
        width: 20,
        height: 20,
        backgroundColor: '#F7A400',
        borderRadius: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Entypo name="chevron-right" size={16} color="white" />
      </View>
    </MasterDogCard>
  )
}
