import type { PropsWithChildren } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated'

import { Colors } from '@/constants/Colors'
import { Entypo } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useBottomTabOverflow } from './ui/TabBarBackground'
import { NavigationTitleExtraBold } from './ui/text'

const HEADER_HEIGHT = 375
const blurhash = 'L6Pj0^jE.AyE_3t7t7R**0o#DgR4'

type Props = PropsWithChildren<{
  headerImage?: string
  backgroundColor?: string
  backgroundContainer?: React.ReactNode
  paddingHorizontal?: number
  title?: string
  isModifying?: boolean
  onHeaderImagePress?: () => void
}>

export default function ParallaxScrollView({
  children,
  headerImage,
  backgroundColor = '#fff',
  backgroundContainer,
  paddingHorizontal = 16,
  title,
  isModifying = false,
  onHeaderImagePress,
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
        <Animated.View
          style={[styles.header, headerAnimatedStyle, { backgroundColor }]}
        >
          {headerImage ? (
            <Pressable
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '100%',
                width: '100%',
              }}
              onPress={() => {
                if (isModifying && onHeaderImagePress) {
                  onHeaderImagePress()
                }
              }}
            >
              <Image
                style={[styles.image]}
                source={headerImage}
                contentFit='cover'
                transition={1000}
                placeholder={{ blurhash }}
              />
              <View style={styles.overlay} />
              {isModifying && (
                <View
                  style={[
                    styles.overlay,
                    {
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                  ]}
                >
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderColor: Colors.purple[500],
                      borderWidth: 1,
                      borderRadius: 16,
                      padding: 12,
                    }}
                  >
                    <Entypo name='edit' size={32} color={Colors.purple[500]} />
                  </View>
                </View>
              )}
            </Pressable>
          ) : (
            backgroundContainer
          )}
          {title && (
            <View style={{ position: 'absolute', bottom: 48, left: 16 }}>
              <NavigationTitleExtraBold>{title}</NavigationTitleExtraBold>
            </View>
          )}
        </Animated.View>
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
  image: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
})
