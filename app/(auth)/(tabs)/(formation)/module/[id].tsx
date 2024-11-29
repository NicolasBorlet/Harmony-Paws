import Back from "@/components/back-button";
import { NavigationTitle } from "@/components/ui/text";
import { Formation } from "@/lib/api/types";
import { View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const module: Formation = {
  id: 1,
  name: "Module 1",
  subject: "Subject 1",
  image: "https://picsum.photos/300",
  animator_name: "Animator 1",
  price: 100,
  description: "Description 1",
  place: "Place 1",
  date: new Date(),
  participant_limit: 10,
  duration: 1,
  created_at: new Date(),
  updated_at: new Date(),
};

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
          <NavigationTitle color="#000">{module.name}</NavigationTitle>
        </View>
      </View>
    </SafeAreaView>
  )
}