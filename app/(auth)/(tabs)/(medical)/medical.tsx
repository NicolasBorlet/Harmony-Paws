import AnimatedHeader from '@/components/header/animated-header'
import RoundedIconLink from '@/components/rounded-icon-link'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { View } from 'react-native'
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Medical() {
  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y // Met à jour la valeur partagée
    },
  })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ padding: 16 }}>
        <AnimatedHeader
          scrollY={scrollY}
          icons={
            <>
              <RoundedIconLink
                icon={<Ionicons name='notifications' size={20} color='white' />}
                onPress={() => router.push('/notifications')}
              />
              <RoundedIconLink
                icon={<Ionicons name='chatbubble' size={20} color='white' />}
                onPress={() => router.push('/messages')}
              />
            </>
          }
          title='formations'
        />
      </View>
    </SafeAreaView>
  )
}
