import { i18n } from "@/app/_layout";
import Back from "@/components/back-button";
import SegmentedControl from "@/components/formation/segmented-control";
import { NavigationTitle } from "@/components/ui/text";
import * as Haptics from "expo-haptics";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const formation = {
  id: 1,
  name: "Formation 1",
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
}

export default function FormationDetails() {
  const insets = useSafeAreaInsets();
  
  const [selectedTab, setSelectedTab] = useState<'about' | 'advice'>('about');

  const onTabChange = useCallback((tab: 'about' | 'advice') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedTab(tab);
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: insets.top + 8, backgroundColor: "#fff" }}>
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            paddingHorizontal: 20,
            paddingBottom: 16,
          }}
        >
          <Back position="relative" left="0" />
          <NavigationTitle color="#000">{formation.name}</NavigationTitle>
        </View>
        {/* <Divider /> */}
        <SegmentedControl
          selectedTab={selectedTab}
          onTabChange={onTabChange}
          language={i18n.locale}
        />
      </View>
    </View>
  );
}