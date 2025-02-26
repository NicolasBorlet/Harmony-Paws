import Back from '@/components/back-button'
import BodyTitle from '@/components/bodyTitle/body-title'
import StandardScrollView from '@/components/scrollview/standard-scrollview'
import Divider from '@/components/ui/divider'
import { Body, ExtraSmallSemiBold } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { FontAwesome } from '@expo/vector-icons'
import { Image } from 'expo-image'
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
                <View style={styles.lessonItem}>
                  <View style={styles.check}>
                    <FontAwesome name='check' size={17} color={Colors.white} />
                  </View>
                  <Image
                    source={{ uri: 'https://picsum.photos/200/300' }}
                    style={styles.lessonImage}
                  />
                  <ExtraSmallSemiBold style={styles.lessonText}>
                    Introduction
                  </ExtraSmallSemiBold>
                </View>
                <View style={[styles.lessonItem, styles.lessonItem2]}>
                  <View style={styles.check}>
                    <FontAwesome name='check' size={17} color={Colors.white} />
                  </View>
                  <Image
                    source={{ uri: 'https://picsum.photos/200/300' }}
                    style={styles.lessonImage}
                  />
                  <ExtraSmallSemiBold style={styles.lessonText}>
                    Introduction
                  </ExtraSmallSemiBold>
                </View>
                <View style={[styles.lessonItem, styles.lessonItem3]}>
                  <View style={styles.check}>
                    <FontAwesome name='check' size={17} color={Colors.white} />
                  </View>
                  <Image
                    source={{ uri: 'https://picsum.photos/200/300' }}
                    style={styles.lessonImage}
                  />
                  <ExtraSmallSemiBold style={styles.lessonText}>
                    Introduction
                  </ExtraSmallSemiBold>
                </View>
                <View style={[styles.lessonItem, styles.lessonItem4]}>
                  <View style={styles.check}>
                    <FontAwesome name='check' size={17} color={Colors.white} />
                  </View>
                  <Image
                    source={{ uri: 'https://picsum.photos/200/300' }}
                    style={styles.lessonImage}
                  />
                  <ExtraSmallSemiBold style={styles.lessonText}>
                    Introduction
                  </ExtraSmallSemiBold>
                </View>
                <View style={[styles.lessonItem, styles.lessonItem5]}>
                  <View style={styles.check}>
                    <FontAwesome name='check' size={17} color={Colors.white} />
                  </View>
                  <Image
                    source={{ uri: 'https://picsum.photos/200/300' }}
                    style={styles.lessonImage}
                  />
                  <ExtraSmallSemiBold style={styles.lessonText}>
                    Introduction
                  </ExtraSmallSemiBold>
                </View>
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
    backgroundColor: Colors.green[500],
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
    marginTop: -16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.green[500],
    borderRadius: 8,
  },
})
