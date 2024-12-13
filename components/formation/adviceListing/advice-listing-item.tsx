import { RoundedImage } from "@/components/ui/image";
import { ExtraSmall, SmallBold, SmallSemiBold } from "@/components/ui/text";
import { Colors } from "@/constants/Colors";
import { Advice } from "@/lib/api/types";
import { dateToDay } from "@/lib/utils/date";
import { memo, useMemo } from "react";
import { View } from "react-native";
import StarRating from "./star-rating";

const AdviceListingItem = memo(function AdviceListingItem({ advice }: { advice: Advice }) {
  const date = useMemo(() => dateToDay(advice.date), [advice.date]);

  return (
    <View style={{
      flex: 1,
      width: "100%",
      flexDirection: "row",
      marginTop: 20,
      gap: 20
    }}>
      <View>
        <RoundedImage source={{ uri: advice.creator.image }} />
      </View>
      <View style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        gap: 16
      }}>
        <View style={{ gap: 4 }}>
          <View style={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            justifyContent: "space-between",
          }}>
            <SmallBold color={Colors.light.secondary}>{advice.creator.name}</SmallBold>
            <ExtraSmall color="#000">{date}</ExtraSmall>
          </View>
          <View>
            <StarRating rating={advice.rating} />
          </View>
        </View>
        <View>
          <SmallSemiBold color="#000">{advice.title}</SmallSemiBold>
          <ExtraSmall color="#000">{advice.description}</ExtraSmall>
        </View>
      </View>
    </View>
  );
});

export default AdviceListingItem;