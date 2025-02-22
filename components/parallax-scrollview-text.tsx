import type { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, { useAnimatedRef } from 'react-native-reanimated'

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
  const bottom = useBottomTabOverflow()

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
    backgroundColor: 'white',
    minHeight: '100%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
  },
})
