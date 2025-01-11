import type { PropsWithChildren } from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function OpacityFadeIn({ children, delay }: PropsWithChildren & { delay?: number }) {
  return <Animated.View entering={FadeIn.delay(delay ?? 0)}>{children}</Animated.View>;
}
