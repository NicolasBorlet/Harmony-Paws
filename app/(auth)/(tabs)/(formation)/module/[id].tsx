import { i18n } from "@/app/_layout";
import Back from "@/components/back-button";
import { NavigationTitle } from "@/components/ui/text";
import { View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function Module () {
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
          <NavigationTitle color="#000">{i18n.t('joinTheRide')}</NavigationTitle>
        </View>
      </View>
    </SafeAreaView>
  )
}