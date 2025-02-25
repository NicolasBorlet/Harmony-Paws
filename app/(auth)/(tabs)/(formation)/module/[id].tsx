import Back from '@/components/back-button'
import ParallaxScrollView from '@/components/parallax-scrollview'
import { NavigationTitle } from '@/components/ui/text'
import { useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Module() {
  const insets = useSafeAreaInsets()

  const { id } = useLocalSearchParams<{ id: string }>()

  // const { data, isLoading } = useModuleById(Number(id))

  // if (isLoading) {
  //   return <LoaderComponent />
  // }

  return (
    <>
      <Back />
      <ParallaxScrollView
        headerImage={'https://picsum.photos/200/300'}
        paddingHorizontal={0}
      >
        <View style={{ gap: 24, display: 'flex', flexDirection: 'column' }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}
          >
            <NavigationTitle color='#000'>
              {/* {data?.name} */}
              Faire le beau
            </NavigationTitle>
          </View>
        </View>
        <View style={{ gap: 16 }}>
          {/* {data?.lessons.map(lesson => (
            <Pressable
              onPress={() =>
                router.push(`/(formation)/module/lesson/${lesson.id}`)
              }
            >
              <BodyMedium color='#000'>{lesson.title}</BodyMedium>
            </Pressable>
          ))} */}
        </View>
      </ParallaxScrollView>
    </>
  )
}
