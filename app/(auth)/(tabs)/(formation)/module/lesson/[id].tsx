import { SafeAreaView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Lesson() {
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
      <View>
        <Text>Lesson</Text>
      </View>
    </SafeAreaView>
  )
}