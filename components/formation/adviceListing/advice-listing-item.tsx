import { RoundedImage } from "@/components/ui/image";
import { ExtraSmall, SmallBold, SmallSemiBold } from "@/components/ui/text";
import { Advice } from "@/lib/api/types";
import { dateToDay } from "@/lib/utils/date";
import { View } from "react-native";
import StarRating from "./star-rating";

export default function AdviceListingItem({ advice }: { advice: Advice }) {
  const date = dateToDay(advice.date);

  return (
    <View style={{ flex: 1, width: "100%", flexDirection: "row", marginTop: 20, gap: 20 }} >
      <View>
        <RoundedImage source={{ uri: advice.creator.image }} />
      </View>
      <View style={{display: "flex", flex: 1, flexDirection: "column", gap: 16}}>
        <View style={{ gap: 4 }}>
          <View style={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            justifyContent: "space-between",
          }}>
            <SmallBold color="#663399">{advice.creator.name}</SmallBold>
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
  )
};