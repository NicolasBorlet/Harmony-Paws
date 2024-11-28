import { i18n } from "@/app/_layout";
import Back from "@/components/back-button";
import Divider from "@/components/ui/divider";
import { NavigationTitle } from "@/components/ui/text";
import { Formation } from "@/lib/api/types";
import { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FormationDetails() {
  const insets = useSafeAreaInsets();
  const [formation, setFormation] = useState<Formation | null>(null);

  return (
    <View style={{ flex: 1, paddingTop: insets.top + 8 }}>
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Back position="relative" left="0" />
          <NavigationTitle color="#000">{i18n.t('notifications')}</NavigationTitle>
        </View>
        <Divider />
      </View>
    </View>
  );
}