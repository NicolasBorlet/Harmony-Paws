import type { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated'

import { Image } from 'expo-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useBottomTabOverflow } from '../ui/TabBarBackground'
import { NavigationTitleExtraBold } from '../ui/text'

const HEADER_HEIGHT = 530
const blurhash = 'L6Pj0^jE.AyE_3t7t7R**0o#DgR4'

type Props = PropsWithChildren<{
  headerImage?: string
  backgroundColor?: string
  backgroundContainer?: React.ReactNode
  paddingHorizontal?: number
  title?: string
}>

export default function ParallaxScrollView({
  children,
  headerImage,
  backgroundColor = '#fff',
  backgroundContainer,
  paddingHorizontal = 16,
  title,
}: Props) {
  const insets = useSafeAreaInsets()

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
        <Animated.View
          style={[styles.header, headerAnimatedStyle, { backgroundColor }]}
        >
          {!headerImage && backgroundContainer}
          {title && (
            <View style={{ position: 'absolute', bottom: 48, left: 16 }}>
              <NavigationTitleExtraBold>{title}</NavigationTitleExtraBold>
            </View>
          )}
        </Animated.View>
        {headerImage && (
          <View
            style={[
              styles.imageContainer,
              {
                paddingTop: insets.top,
              },
            ]}
          >
            <Image
              style={styles.image}
              source={headerImage}
              contentFit='contain'
              transition={1000}
            />
          </View>
        )}
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
    padding: 32,
    gap: 16,
    overflow: 'hidden',
    backgroundColor: 'white',
    minHeight: '100%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 1,
  },
})
