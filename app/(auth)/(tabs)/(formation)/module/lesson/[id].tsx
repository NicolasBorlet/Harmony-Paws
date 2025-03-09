import { i18n } from '@/app/_layout'
import Back from '@/components/back-button'
import Block from '@/components/grid/Block'
import { LessonSkeleton } from '@/components/skeletons/skeletons'
import { StandardButton } from '@/components/ui/button'
import {
  BodyMedium,
  BodySemiBold,
  ExtraSmallMedium,
} from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { useCountOfStepsByLessonId, useStepById } from '@/lib/api/lesson'
import * as Burnt from 'burnt'
import { router, useLocalSearchParams } from 'expo-router'
import { useVideoPlayer, VideoView } from 'expo-video'
import { useEffect } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'

export default function Lesson() {
  const insets = useSafeAreaInsets()
  const { id } = useLocalSearchParams()

  const { data: step, isLoading, isError } = useStepById(Number(id))
  const { data: countOfSteps } = useCountOfStepsByLessonId(Number(id))

  const player = useVideoPlayer(videoSource, player => {
    player.loop = true
    player.play()
  })

  useEffect(() => {
    console.log('lesson id', id)
    console.log('lesson steps', step)
    console.log('count of steps', countOfSteps)
  }, [id, step, countOfSteps])

  if (isLoading) return <LessonSkeleton />
  if (isError) {
    router.back()
    Burnt.toast({
      title: 'Erreur',
      preset: 'error',
      message:
        'Une erreur est survenue. Veuillez réessayer ou contacter le support.',
      haptic: 'error',
    })
  }

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
        paddingTop: 32,
        gap: 32,
        flex: 1,
        paddingBottom: insets.bottom,
      }}
    >
      <Back position='relative' />
      <Block gap={16}>
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
        <Block row gap={12} justify='center' flex={0}>
          {Array.from({ length: countOfSteps?.count ?? 0 }).map((_, index) => (
            <View style={styles.step} key={index}></View>
          ))}
        </Block>
        <Block
          style={{
            paddingHorizontal: 16,
          }}
          gap={16}
        >
          <BodySemiBold>Étape {step?.order}</BodySemiBold>
          <View style={styles.stepItem}>
            <ExtraSmallMedium color={Colors.grey[800]}>
              {step?.content}
            </ExtraSmallMedium>
          </View>
        </Block>
      </Block>
      <View style={styles.buttonContainer}>
        <StandardButton
          onPress={() => {
            if (countOfSteps?.count === step?.order) {
              router.push(`/(formation)/module/${step?.lesson_id}`)
            } else {
              router.replace(`/(formation)/module/lesson/${Number(id) + 1}`)
            }
          }}
        >
          <BodyMedium color='#fff'>{i18n.t('lesson.nextStep')}</BodyMedium>
        </StandardButton>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 250,
  },
  controlsContainer: {
    padding: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  step: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.orange[500],
  },
  stepItem: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: `${Colors.purple[500]}1A`,
  },
})
