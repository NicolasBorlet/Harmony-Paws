import { i18n } from "@/app/_layout";
import { ReactElement } from "react";
import { View } from "react-native";
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useDerivedValue } from "react-native-reanimated";
import { Body, SpecialTitle } from "../ui/text";

export default function AnimatedHeader ({ scrollY, icons, title, subtitle, dogName }: { scrollY: any, icons: ReactElement, title: string, subtitle?: string, dogName?: string }) {
  const headerOpacity = useDerivedValue(() => {
    return interpolate(scrollY.value, [0, 70], [0, 1], Extrapolate.CLAMP);
  });

  const titleOpacity = useDerivedValue(() => {
    return interpolate(scrollY.value, [0, 70], [1, 0], Extrapolate.CLAMP);
  });

  const animatedHeaderHeight = useDerivedValue(() => {
    return interpolate(scrollY.value, [0, 70], [130, 60], Extrapolate.CLAMP);
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: animatedHeaderHeight.value,
    };
  });

  const headerOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
    };
  });

  const titleOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: titleOpacity.value,
    };
  });

  return (
    <>
      <Animated.View style={animatedStyles}>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 32,
        }}>
          <Animated.View style={headerOpacityStyle}>
            <SpecialTitle>{i18n.t(`${title}`)} {dogName}</SpecialTitle>
            {subtitle && <Body>{i18n.t(`${subtitle}`)}</Body>}
          </Animated.View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 12,
            }}
          >
            {icons}
          </View>
        </View>
        <Animated.View style={[titleOpacityStyle, { paddingBottom: 32 }]}>
          <SpecialTitle>{i18n.t(`${title}`)} {dogName}</SpecialTitle>
          {subtitle && <Body>{i18n.t(`${subtitle}`)}</Body>}
        </Animated.View>
      </Animated.View>
    </>
  )
}