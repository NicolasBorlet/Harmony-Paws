import { dateToHours } from "@/lib/utils/date";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import Block from "../grid/Block";
import { ExtraSmallMedium, SmallBold, SmallSemiBold } from "../ui/text";
import { RouteItemView } from "../ui/view";

export interface RouteItemProps {
  name: string,
  location: string,
  startTime: Date,
  endTime: Date,
}

export default function RouteItem ({ step, index }: { step: RouteItemProps, index: number }) {
  const startTime = dateToHours(step.startTime)
  const endTime = dateToHours(step.endTime)

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
            <SmallSemiBold color="#000">{step.name}</SmallSemiBold>
            <Block row gap={6} flex={0}>
              <FontAwesome name="map-marker" size={14} color="#663399" />
              <ExtraSmallMedium color="#000">{step.location}</ExtraSmallMedium>
            </Block>
          </RouteItemView>
        </Block>
      </Block>
      <Block>
        <SmallBold color="#000">{endTime}</SmallBold>
      </Block>
    </Block>
  )
}