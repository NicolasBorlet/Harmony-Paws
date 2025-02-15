import type { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated'

import { useBottomTabOverflow } from './ui/TabBarBackground'

const HEADER_HEIGHT = 375
const blurhash = 'L6Pj0^jE.AyE_3t7t7R**0o#DgR4'

type Props = PropsWithChildren<{
  headerTextContainer?: React.ReactNode
  backgroundColor?: string
  backgroundContainer?: React.ReactNode
  paddingHorizontal?: number
}>

export default function ParallaxScrollViewText({
  children,
  headerTextContainer,
  backgroundColor = '#fff',
  backgroundContainer,
  paddingHorizontal = 16,
}: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollViewOffset(scrollRef)
  const bottom = useBottomTabOverflow()
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1],
          ),
        },
      ],
    }
  })

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
      >
        <View style={[styles.header]}>
          <Animated.View
            style={[
              headerAnimatedStyle,
              { backgroundColor },
              { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
            ]}
          />
          <View>
            {headerTextContainer ? headerTextContainer : backgroundContainer}
          </View>
        </View>
        <View style={[styles.content, { paddingHorizontal }]}>{children}</View>
      </Animated.ScrollView>
    </View>
  )
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
    paddingVertical: 20,
    gap: 16,
    overflow: 'hidden',
    backgroundColor: 'white',
    minHeight: '100%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
  },
})
