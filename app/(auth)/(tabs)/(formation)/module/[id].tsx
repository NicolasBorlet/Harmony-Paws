import Path1 from '@/assets/svg/paw-path/path-1'
import Path2 from '@/assets/svg/paw-path/path-2'
import Path3 from '@/assets/svg/paw-path/path-3'
import Path4 from '@/assets/svg/paw-path/path-4'
import Back from '@/components/back-button'
import BodyTitle from '@/components/bodyTitle/body-title'
import StandardScrollView from '@/components/scrollview/standard-scrollview'
import Divider from '@/components/ui/divider'
import { Body, ExtraSmallSemiBold } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { FontAwesome } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import { Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const lessons = [
  {
    id: 1,
    title: 'Introduction',
    image: 'https://picsum.photos/200/300',
    available: true,
  },
  {
    id: 2,
    title: 'Les modes de communication',
    image: 'https://picsum.photos/200/300',
    available: true,
  },
  {
    id: 3,
    title: 'Les signaux d’apaisement',
    image: 'https://picsum.photos/200/300',
    available: false,
  },
  {
    id: 4,
    title: 'Les expressions faciales',
    image: 'https://picsum.photos/200/300',
    available: false,
  },
  {
    id: 5,
    title: 'Quizz final',
    image: 'https://picsum.photos/200/300',
    available: false,
  },
]

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
                {lessons.map(lesson => {
                  const lessonItemStyle =
                    lesson.id > 1 && lesson.id <= 5
                      ? styles[`lessonItem${lesson.id}` as keyof typeof styles]
                      : undefined

                  return (
                    <>
                      <Pressable
                        key={lesson.id}
                        style={[styles.lessonItem, lessonItemStyle]}
                        onPress={() => {
                          router.push(`/(formation)/module/lesson/${lesson.id}`)
                        }}
                      >
                        <View
                          style={[
                            styles.check,
                            {
                              backgroundColor: lesson.available
                                ? Colors.green[500]
                                : Colors.grey[800],
                            },
                          ]}
                        >
                          <FontAwesome
                            name='check'
                            size={17}
                            color={Colors.white}
                          />
                        </View>
                        <Image
                          source={{ uri: lesson.image }}
                          style={[
                            styles.lessonImage,
                            {
                              borderColor: lesson.available
                                ? Colors.green[500]
                                : Colors.grey[800],
                            },
                          ]}
                        />
                        <ExtraSmallSemiBold
                          style={[
                            styles.lessonText,
                            {
                              backgroundColor: lesson.available
                                ? Colors.green[500]
                                : Colors.grey[800],
                            },
                          ]}
                        >
                          {lesson.title}
                        </ExtraSmallSemiBold>
                      </Pressable>
                      {lesson.id === 1 ? (
                        <Path1
                          style={styles.path_1}
                          color={
                            lesson.available
                              ? Colors.green[500]
                              : Colors.grey[800]
                          }
                        />
                      ) : lesson.id === 2 ? (
                        <Path2
                          style={styles.path_2}
                          color={
                            lesson.available
                              ? Colors.green[500]
                              : Colors.grey[800]
                          }
                        />
                      ) : lesson.id === 3 ? (
                        <Path3
                          style={styles.path_3}
                          color={
                            lesson.available
                              ? Colors.green[500]
                              : Colors.grey[800]
                          }
                        />
                      ) : lesson.id === 4 ? (
                        <Path4
                          style={styles.path_4}
                          color={
                            lesson.available
                              ? Colors.green[500]
                              : Colors.grey[800]
                          }
                        />
                      ) : null}
                    </>
                  )
                })}
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
    backgroundColor: Colors.lightOrange[50],
    paddingTop: 32,
    paddingBottom: 32,
    padding: 16,
    borderRadius: 20,
  },
  lessonItem: {
    marginTop: -32,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    position: 'relative',
    top: 32,
    right: -32,
    zIndex: 1,
    width: 32,
    height: 32,
    borderRadius: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonImage: {
    width: 100,
    height: 100,
    borderRadius: 999,
    borderWidth: 7,
    borderColor: Colors.green[500],
  },
  lessonItem2: {
    left: '20%',
  },
  lessonItem3: {
    right: '30%',
  },
  lessonItem4: {
    right: '10%',
  },
  lessonItem5: {
    left: '30%',
  },
  lessonText: {
    maxWidth: 150,
    textAlign: 'center',
    marginTop: -16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.green[500],
    borderRadius: 8,
  },
  path_1: {
    position: 'absolute',
    top: '10%',
    right: '20%',
    width: 87,
    height: 112,
  },
  path_2: {
    position: 'absolute',
    top: '30%',
    left: '15%',
    width: 150,
    height: 82,
  },
  path_3: {
    position: 'absolute',
    top: '50%',
    left: '40%',
    width: 87,
    height: 112,
  },
  path_4: {
    position: 'absolute',
    top: '75%',
    left: '10%',
    width: 87,
    height: 112,
  },
})
