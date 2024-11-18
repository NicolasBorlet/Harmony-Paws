import Back from "@/components/back-button";
import { StandardButton, UnderlinedButton } from "@/components/ui/button";
import { BodyMedium, NavigationTitle } from "@/components/ui/text";
import { Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function DogInvitation() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ paddingHorizontal: 20, paddingTop: 32, flex: 1, paddingBottom: insets.bottom, gap: 48 }}>
      <View style={{ gap: 24, display: "flex", flexDirection: "column" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
        }}
        >
          <Back position="relative" left="0" />
          <NavigationTitle color="#000">On se balade ?</NavigationTitle>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <View>
            <Text>Hello</Text>
          </View>
        </View>
        <View style={{ width: '100%', alignItems: 'center', gap: 16 }}>
          <StandardButton onPress={() => {}}>
            <BodyMedium color='#fff'>Envoyer le message</BodyMedium>
          </StandardButton>
          <UnderlinedButton onPress={() => {}}>
            <BodyMedium color='#000000' style={{ textDecorationLine: 'underline' }}>Envoyer sans message</BodyMedium>
          </UnderlinedButton>
        </View>
      </View>
    </SafeAreaView>
  );
}
