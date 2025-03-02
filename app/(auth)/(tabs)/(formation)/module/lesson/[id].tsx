import { i18n } from '@/app/_layout'
import Back from '@/components/back-button'
import Block from '@/components/grid/Block'
import { StandardButton } from '@/components/ui/button'
import {
  BodyMedium,
  BodySemiBold,
  ExtraSmallMedium,
} from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { useVideoPlayer, VideoView } from 'expo-video'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { useEvent } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'

export default function Lesson() {
  const insets = useSafeAreaInsets()

  const player = useVideoPlayer(videoSource, player => {
    player.loop = true
    player.play()
  })

  const { isPlaying } = useEvent(player, 'playingChange', {
    isPlaying: player.playing,
  })

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
          <View style={styles.step}></View>
          <View style={styles.step}></View>
          <View style={styles.step}></View>
        </Block>
        <Block
          style={{
            paddingHorizontal: 16,
          }}
          gap={16}
        >
          <BodySemiBold>Étape 1</BodySemiBold>
          <View style={styles.stepItem}>
            <ExtraSmallMedium color={Colors.grey[800]}>
              Lorem ipsum dolor sit amet consectetur. Velit ac vitae phasellus
              pharetra urna eu est nec fermentum. Ac at tristique etiam neque.
            </ExtraSmallMedium>
          </View>
        </Block>
      </Block>
      <View style={styles.buttonContainer}>
        <StandardButton>
          <BodyMedium color='#fff'>{i18n.t('nextLesson')}</BodyMedium>
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
