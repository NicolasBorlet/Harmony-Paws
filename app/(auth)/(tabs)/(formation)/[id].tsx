import { i18n } from "@/app/_layout";
import Back from "@/components/back-button";
import ModuleListing from "@/components/formation/moduleListing/module-listing";
import SegmentedControl from "@/components/formation/segmented-control";
import { NavigationTitle } from "@/components/ui/text";
import * as Haptics from "expo-haptics";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { runOnJS, useSharedValue } from "react-native-reanimated";
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
  const startY = useSharedValue(0);
  
  const [selectedTab, setSelectedTab] = useState<'about' | 'advice'>('about');

  const onTabChange = useCallback((tab: 'about' | 'advice') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedTab(tab);
  }, []);

  const gesture = Gesture.Pan()
    .onBegin((event) => {
      startY.value = event.absoluteY;
    })
    .onUpdate((event) => {
      const deltaY = startY.value - event.absoluteY;
    })
    .onEnd((event) => {
      // Gestion du swipe horizontal existant
      if (Math.abs(event.translationX) > 50) {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
        if (event.translationX > 0) {
          runOnJS(setSelectedTab)('about');
        } else {
          runOnJS(setSelectedTab)('advice');
        }
      }
  });

  return (
    <GestureHandlerRootView style={{ flex: 1, paddingTop: insets.top, backgroundColor: 'white' }}>
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
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
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <GestureDetector gesture={gesture}>
              <View style={{ flex: 1 }}>
                {selectedTab === 'about' ? <ModuleListing /> : <></>}
              </View>
          </GestureDetector>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}