import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";
import { memo, useMemo } from "react";

const StarRating = memo(function StarRating({ rating }: { rating: number }) {
  const stars = useMemo(() => {
    return [1, 2, 3, 4, 5].map((i) => (
      <AntDesign 
        key={i} 
        name="star" 
        size={12} 
        color={i <= rating ? "#F7A400" : "black"} 
      />
    ));
  }, [rating]);

  const containerStyle = useMemo(() => ({ 
    display: "flex", 
    flexDirection: "row", 
    gap: 4 
  }), []);

  return (
    <View style={containerStyle}>
      {stars}
    </View>
  );
});

export default StarRating;