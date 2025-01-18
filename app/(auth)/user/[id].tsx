import { i18n } from "@/app/_layout";
import Back from "@/components/back-button";
import BodyTitle from "@/components/bodyTitle/body-title";
import { RoundedImage } from "@/components/ui/image";
import { CardTitle, SmallMedium } from "@/components/ui/text";
import DogCardComponent from "@/components/user/dog-card";
import { useUser } from "@/lib/api/user";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function UserScreen() {
  const { id } = useLocalSearchParams();
  
  const { data: user, isLoading } = useUser(id.toString());

  useEffect(() => {
    console.log('id', id);
    console.log('user', user);
  }, [id, user]);

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
          <CardTitle color="#000" style={{ textAlign: 'center' }}>{user?.first_name}, {user?.age} ans</CardTitle>
          <SmallMedium color="#000">
            {user?.description ? user?.description : (i18n.t('noDescriptionFor') + ' ' + user?.first_name)}
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