import { i18n } from "@/app/_layout";
import Back from "@/components/back-button";
import BodyTitle from "@/components/bodyTitle/body-title";
import { RoundedImage } from "@/components/ui/image";
import { CardTitle, SmallMedium } from "@/components/ui/text";
import DogCardComponent from "@/components/user/dog-card";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function UserScreen() {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={{
        paddingHorizontal: 16,
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <View
        style={{
          gap: 24,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          paddingTop: 32,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
          }}
        >
          <Back position='relative' left='0' />
        </View>
        <View style={{ alignItems: 'center' }}>
          <RoundedImage
            height={150}
            width={150}
            src="https://picsum.photos/300"
          />
          <FontAwesome name="paw" size={42} color="#DE6E48" style={{
            position: 'absolute',
            top: 0,
            right: '30%',
            transform: [{ rotate: '-16deg' }],
          }} />
        </View>
        <View style={styles.container}>
          <CardTitle color="#000" style={{ textAlign: 'center' }}>Emma, 30 ans</CardTitle>
          <SmallMedium color="#000">
            Lorem ipsum dolor sit amet consectetur. Leo fames dui tortor nunc mi donec lectus dignissim gravida.
          </SmallMedium>
        </View>
        <View style={styles.container}>
          <BodyTitle title={i18n.t('hisMate')} />
          <DogCardComponent />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16
  }
})