import Back from '@/components/back-button'
import BodyTitle from '@/components/bodyTitle/body-title'
import StandardScrollView from '@/components/scrollview/standard-scrollview'
import Divider from '@/components/ui/divider'
import { Body } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { useLocalSearchParams } from 'expo-router'
import { StyleSheet, View } from 'react-native'
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
      <StandardScrollView
        headerImage={'https://picsum.photos/200/300'}
        paddingHorizontal={0}
        title='Faire le beau'
      >
        <View style={{ gap: 24, display: 'flex', flexDirection: 'column' }}>
          <View style={styles.container}>
            <Body>
              Lorem ipsum dolor sit amet consectetur. Velit ac vitae phasellus
              pharetra urna eu est nec fermentum. Ac at tristique etiam neque.
            </Body>
            <View style={styles.content}>
              <Divider />
              <BodyTitle title='Matériels nécessaires' />
            </View>
            <View style={styles.content}>
              <Divider />
              <BodyTitle title='Leçon' />
              <View style={styles.lessonContainer}>
                <View style={styles.lessonItem}></View>
              </View>
            </View>
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
      </StandardScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 32,
  },
  content: {
    gap: 16,
  },
  lessonContainer: {
    gap: 16,
    backgroundColor: Colors.lightOrange[50],
    padding: 16,
    borderRadius: 20,
  },
  lessonItem: {
    gap: 16,
  },
})
