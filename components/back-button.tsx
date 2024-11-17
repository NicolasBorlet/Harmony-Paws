import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackButton } from "./ui/button";

export default function Back({ position, left }: { position?: string, left?: string }) {
  const { top } = useSafeAreaInsets();

  return (
    <BackButton onPress={() => router.back()} position={position} left={left} style={{ marginTop: position === 'relative' ? 0 : top }}>
      <Entypo name="chevron-left" size={18} color="white" />
    </BackButton>
  )
}
