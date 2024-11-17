import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackButton } from "./ui/button";

export default function Back() {
  const { top } = useSafeAreaInsets();

  return (
    <BackButton onPress={() => router.back()} style={{ marginTop: top }}>
      <Entypo name="chevron-left" size={18} color="white" />
    </BackButton>
  )
}
