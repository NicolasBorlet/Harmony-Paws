import { OnboardingItem } from '@/type';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface PaginationProps {
  data: OnboardingItem[];
  x: { value: number };
  screenWidth: number;
}

const Pagination = ({ data, x, screenWidth }: PaginationProps) => {
  // eslint-disable-next-line react/no-unstable-nested-components
  const PaginationComp = ({ i }: { i: number }) => {
    const animatedDotStyle = useAnimatedStyle(() => {
      const widthAnimation = interpolate(
        x.value,
        [(i - 1) * screenWidth, i * screenWidth, (i + 1) * screenWidth],
        [10, 20, 10],
        Extrapolation.CLAMP,
      );
      const opacityAnimation = interpolate(
        x.value,
        [(i - 1) * screenWidth, i * screenWidth, (i + 1) * screenWidth],
        [0.5, 1, 0.5],
        Extrapolation.CLAMP,
      );
      return {
        width: widthAnimation,
        opacity: opacityAnimation,
      };
    });
    return <Animated.View style={[styles.dots, animatedDotStyle]} />;
  };

  return (
    <View style={styles.paginationContainer}>
      {data.map((_, i) => {
        return <PaginationComp i={i} key={i} />;
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dots: {
    height: 10,
    backgroundColor: 'orange',
    marginHorizontal: 10,
    borderRadius: 5,
  },
});