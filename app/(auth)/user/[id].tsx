import Back from "@/components/back-button";
import { SafeAreaView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function UserScreen() {
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
        paddingTop: 32,
        flex: 1,
        paddingBottom: insets.bottom,
        gap: 48,
      }}
    >
      <View style={{ gap: 24, display: 'flex', flexDirection: 'column' }}>
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
      </View>
    </SafeAreaView>
  )
}
