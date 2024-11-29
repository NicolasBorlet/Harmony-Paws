import { i18n } from "@/app/_layout";
import Back from "@/components/back-button";
import AdviceListing from "@/components/formation/adviceListing/advice-listing";
import ModuleListing from "@/components/formation/moduleListing/module-listing";
import SegmentedControl from "@/components/formation/segmented-control";
import { BodyBold, ExtraSmallMedium, ModulePrice, NavigationTitle } from "@/components/ui/text";
import { AntDesign } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
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
  old_price: 150,
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
                {selectedTab === 'about' ? (
                  <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{
                    gap: 20,
                  }}>
                    <View
                      style={{
                        marginTop: 20,
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        backgroundColor: "rgba(102, 51, 153, 0.1)",
                        borderRadius: 10,
                        padding:16,
                        justifyContent: "center",
                      }}
                    >
                      <View style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}>
                        <BodyBold color="#663399">{i18n.t('completeFormation')}</BodyBold>
                        <View style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 4,
                          alignItems: "center",
                        }}
                        >
                          <ModulePrice color="#F7A400">{formation.price}€</ModulePrice>
                          <AntDesign name="arrowleft" size={12} color="black" />
                          <ModulePrice color="#663399">{formation.old_price}€</ModulePrice>
                        </View>
                      </View>
                        <View>
                          <ExtraSmallMedium color="#616060">
                            Lorem ipsum dolor sit amet consectetur. Velit ac vitae phasellus pharetra urna eu est nec fermentum. Ac at tristique etiam neque.
                          </ExtraSmallMedium>
                        </View>
                      </View>
                    <ModuleListing />
                  </ScrollView>
                ) : 
                  <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{
                    gap: 20,
                  }}>
                    <AdviceListing />
                  </ScrollView>
                }
              </View>
          </GestureDetector>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}