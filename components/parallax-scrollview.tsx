import type { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { Image } from 'expo-image';
import { useBottomTabOverflow } from './ui/TabBarBackground';

const HEADER_HEIGHT = 375;
const blurhash =
  'L6Pj0^jE.AyE_3t7t7R**0o#DgR4';

type Props = PropsWithChildren<{
  headerImage?: string;
  backgroundColor?: string;
  backgroundContainer?: React.ReactNode;
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  backgroundColor = '#fff',
  backgroundContainer
}: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}>
        <Animated.View
          style={[
            styles.header,
            headerAnimatedStyle,
            { backgroundColor },
          ]}>
          {headerImage ? (
            <Image style={styles.image} source={headerImage} contentFit="cover" transition={1000} placeholder={{ blurhash }} />
          ) : backgroundContainer}
        </Animated.View>
        <View style={styles.content}>{children}</View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 16,
    overflow: 'hidden',
    backgroundColor: 'white',
    minHeight: '100%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
  },
  image: {
    flex: 1,
    width: '100%',
  },
});