import { Image } from "expo-image";
import { View } from "react-native";
import { CardTitle } from "../ui/text";

export default function DogItem({ dogData }: { dogData: any }) {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
      <Image source={{ uri: dogData.image }} style={{ width: 88, height: 88, borderRadius: 100 }} />
      <CardTitle color="#000">{dogData.name}</CardTitle>
    </View>
  );
}
