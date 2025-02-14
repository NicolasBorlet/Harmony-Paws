import { Formation } from '@/lib/api/types'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { Pressable, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import Block from '../grid/Block'
import { BodyExtraBold } from '../ui/text'

const blurhash = 'L6Pj0^jE.AyE_3t7t7R**0o#DgR4'

export default function FormationListingItem({
  formation,
}: {
  formation: Formation
}) {
  const progressWidth = useSharedValue(0)

  useEffect(() => {
    // Animer la largeur de 0 à 50%
    progressWidth.value = withSpring(50, {
      damping: 12,
      stiffness: 90,
    })
  }, [])

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value}%`,
      height: 4,
      backgroundColor: '#0DA453',
    }
  })

  return (
    <Pressable
      onPress={() => {
        router.push(`/(formation)/${formation.id}`)
      }}
    >
      <Block
        style={{
          width: '100%',
          height: 150,
          borderRadius: 20,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            zIndex: 1,
          }}
        />
        <Image
          source={{ uri: formation.image }}
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
          }}
          placeholder={{ blurhash }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            padding: 12,
            zIndex: 2,
          }}
        >
          <BodyExtraBold color='#FFFFFF'>{formation.name}</BodyExtraBold>
          {formation.progress && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <View
                style={{
                  width: '100%',
                  height: 4,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  overflow: 'hidden',
                }}
              >
                <Animated.View style={animatedStyles} />
              </View>
            </View>
          )}
        </View>
      </Block>
    </Pressable>
  )
}
