import { i18n } from '@/app/_layout'
import Path1 from '@/assets/svg/paw-path/path-1'
import Path2 from '@/assets/svg/paw-path/path-2'
import Path3 from '@/assets/svg/paw-path/path-3'
import Path4 from '@/assets/svg/paw-path/path-4'
import Back from '@/components/back-button'
import BodyTitle from '@/components/bodyTitle/body-title'
import MaterialItem from '@/components/formation/module/material-item'
import Block from '@/components/grid/Block'
import LoaderComponent from '@/components/loader'
import StandardScrollView from '@/components/scrollview/standard-scrollview'
import { StandardButton } from '@/components/ui/button'
import Divider from '@/components/ui/divider'
import { Body, BodyMedium, ExtraSmallSemiBold } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { useModuleById } from '@/lib/api/formation'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Module() {
  const insets = useSafeAreaInsets()

  const { id } = useLocalSearchParams<{ id: string }>()

  const { data, isLoading } = useModuleById(Number(id))

  useEffect(() => {
    console.log(data)
  }, [data])

  if (isLoading) {
    return <LoaderComponent />
  }

  return (
    <>
      <Back />
      <StandardScrollView
        headerImage={data?.image}
        paddingHorizontal={0}
        title={data?.name}
      >
        <View style={{ gap: 24, display: 'flex', flexDirection: 'column' }}>
          <View style={styles.container}>
            <Body>{data?.description}</Body>
            <View style={styles.content}>
              <Divider />
              <BodyTitle title={i18n.t('module.materialNeeded')} />
              {data?.materials && data.materials.length > 0 ? (
                <Block row wrap='wrap' gapHorizontal={32} gapVertical={16}>
                  {data.materials.map((material, index) => (
                    <MaterialItem key={index} title={material || ''} />
                  ))}
                </Block>
              ) : (
                <Body>{i18n.t('module.noMaterialNeeded')}</Body>
              )}
            </View>
            <View style={styles.content}>
              <Divider />
              <BodyTitle title={i18n.t('module.lessons')} />
              <View style={styles.lessonContainer}>
                {data?.lessons.map((lesson, index) => {
                  const lessonItemStyle =
                    lesson.id > 1 && lesson.id <= 5
                      ? styles[`lessonItem${lesson.id}` as keyof typeof styles]
                      : undefined

                  return (
                    <View key={lesson.id}>
                      <Pressable
                        style={[styles.lessonItem, lessonItemStyle]}
                        onPress={() => {
                          router.push(`/(formation)/module/lesson/${lesson.id}`)
                        }}
                      >
                        <View
                          style={[
                            styles.check,
                            {
                              backgroundColor:
                                lesson.id === 1 ||
                                lesson.progress_percentage === 100
                                  ? Colors.green[500]
                                  : Colors.grey[800],
                            },
                          ]}
                        >
                          {lesson.id === 1 ||
                          lesson.progress_percentage === 100 ? (
                            <FontAwesome
                              name='check'
                              size={17}
                              color={Colors.white}
                            />
                          ) : (
                            <Entypo
                              name='lock'
                              size={17}
                              color={Colors.white}
                            />
                          )}
                        </View>
                        <Image
                          source={{ uri: lesson.image }}
                          style={[
                            styles.lessonImage,
                            {
                              borderColor:
                                lesson.id === 1 ||
                                lesson.progress_percentage === 100
                                  ? Colors.green[500]
                                  : Colors.grey[800],
                            },
                          ]}
                        />
                        <ExtraSmallSemiBold
                          style={[
                            styles.lessonText,
                            {
                              backgroundColor:
                                lesson.id === 1 ||
                                lesson.progress_percentage === 100
                                  ? Colors.green[500]
                                  : Colors.grey[800],
                            },
                          ]}
                        >
                          {lesson.title}
                        </ExtraSmallSemiBold>
                      </Pressable>
                      {index < data.lessons.length - 1 &&
                        data?.lessons.length > 1 && (
                          <>
                            {lesson.id === 1 ? (
                              <Path1
                                style={styles.path_1}
                                color={
                                  data?.lessons.find(
                                    l => l.id === lesson.id + 1,
                                  )?.progress_percentage === 100
                                    ? Colors.green[500]
                                    : Colors.grey[800]
                                }
                              />
                            ) : lesson.id === 2 ? (
                              <Path2
                                style={styles.path_2}
                                color={
                                  data?.lessons.find(
                                    l => l.id === lesson.id + 1,
                                  )?.progress_percentage === 100
                                    ? Colors.green[500]
                                    : Colors.grey[800]
                                }
                              />
                            ) : lesson.id === 3 ? (
                              <Path3
                                style={styles.path_3}
                                color={
                                  data?.lessons.find(
                                    l => l.id === lesson.id + 1,
                                  )?.progress_percentage === 100
                                    ? Colors.green[500]
                                    : Colors.grey[800]
                                }
                              />
                            ) : lesson.id === 4 ? (
                              <Path4
                                style={styles.path_4}
                                color={
                                  data?.lessons.find(
                                    l => l.id === lesson.id + 1,
                                  )?.progress_percentage === 100
                                    ? Colors.green[500]
                                    : Colors.grey[800]
                                }
                              />
                            ) : null}
                          </>
                        )}
                    </View>
                  )
                })}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <StandardButton
            disabled={!data?.lessons.every(l => l.progress_percentage === 100)}
            disabledText={i18n.t('module.allModulesNotCompleted')}
          >
            <BodyMedium color='#fff'>{i18n.t('module.nextModule')}</BodyMedium>
          </StandardButton>
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
    zIndex: 1,
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
    top: '15%',
    right: '15%',
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
    top: '30%',
    left: '35%',
    width: 87,
    height: 112,
  },
  path_4: {
    position: 'absolute',
    top: '75%',
    left: '5%',
    width: 87,
    height: 112,
  },
  buttonContainer: {
    paddingHorizontal: 16,
  },
})
