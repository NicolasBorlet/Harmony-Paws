import { Colors } from "@/constants/Colors";
import { Step } from "@/lib/api/types";
import { dateToHours } from "@/lib/utils/date";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import Block from "../grid/Block";
import { ExtraSmallMedium, SmallBold, SmallSemiBold } from "../ui/text";
import { RouteItemView } from "../ui/view";

export default function RouteItem({ step, index }: { step: Step, index: number }) {
  const startTime = step.estimated_hour ? dateToHours(new Date(step.estimated_hour)) : '--:--'

  return (
    <Block gap={8}>
      {index === 0 && (
        <Block>
          <SmallBold color="#000">{startTime}</SmallBold>
        </Block>
      )}
      <Block row gap={16}>
        <Block
          flex={0}
          style={{
            width: 42,
          }}
          alignItems="center"
        >
          <View style={{ height: 89, backgroundColor: '#000', width: 1 }} />
        </Block>
        <Block>
          <RouteItemView even={index % 2 === 0}>
            <SmallSemiBold color="#000">{step.place}</SmallSemiBold>
            <Block row gap={6} flex={0}>
              <FontAwesome name="map-marker" size={14} color={Colors.light.secondary} />
              <ExtraSmallMedium color="#000">{step.place}</ExtraSmallMedium>
            </Block>
          </RouteItemView>
        </Block>
      </Block>
      <Block>
        <SmallBold color="#000">{startTime}</SmallBold>
      </Block>
    </Block>
  )
}