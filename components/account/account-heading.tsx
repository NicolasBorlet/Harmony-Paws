import { FontAwesome } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { RoundedImage } from "../ui/image";
import { BodyBold, Small } from "../ui/text";

export default function AccountHeading() {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <RoundedImage
          src="https://picsum.photos/300"
        />
        <View style={styles.profileInfo}>
          <BodyBold>John Doe</BodyBold>
          <Small color="#000">20 amies</Small>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Pressable>
          <FontAwesome name="gear" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileInfo: {
    gap: 2,
  },
})

