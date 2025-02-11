import { useSkeletonAnimation } from "@/components/skeletons/skeletons";
import { View } from "react-native";
import Animated from "react-native-reanimated";

export default function FormationSingleLoader() {
  const animatedStyle = useSkeletonAnimation()

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={[animatedStyle]}>
        <View />
      </Animated.View>
    </View>
  )
}