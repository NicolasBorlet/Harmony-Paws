import { Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import { View } from "react-native";
import { DogCardItem } from "../ui/card";
import { Body, Small } from "../ui/text";

const dogData = {
  name: 'Max',
  age: 4,
  image: 'https://picsum.photos/300',
  behavior: [{
    id: 1,
    name: 'Calme',
  }, {
    id: 2,
    name: 'Sociable',
  }, {
    id: 3,
    name: 'Joueur',
  }]
}

export default function DogCardComponent({ }) {
  return (
    <DogCardItem>
      <Image source={{ uri: dogData.image }} style={{
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
          <Body>{dogData.name}, {dogData.age} ans</Body>
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
    </DogCardItem>
  )
}
