import { i18n } from '@/app/_layout'
import Back from '@/components/back-button'
import { BodyBold, ExtraSmall, SmallBold } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { useLocalSearchParams } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'

export default function Document() {
  const params = useLocalSearchParams()
  const insets = useSafeAreaInsets()

  return (
    <View style={styles.container}>
      <Back position='relative' top={insets.top} left='16' />
      <BodyBold
        style={{
          textAlign: 'center',
          marginTop: 8,
          marginBottom: 32,
        }}
      >
        {params.documentName}
      </BodyBold>
      <View style={styles.contentContainer}>
        <View style={styles.informationsContainer}>
          <SmallBold color={Colors.purple[500]}>
            {i18n.t('global.informations')}
          </SmallBold>
          <View style={{ gap: 4 }}>
            <View>
              <ExtraSmall color={Colors.purple[500]}>
                {params.reason}
              </ExtraSmall>
            </View>
            <View>
              <ExtraSmall color={Colors.purple[500]}>{params.place}</ExtraSmall>
            </View>
          </View>
        </View>
        <View style={styles.webViewContainer}>
          <WebView
            source={{ uri: params.documentUrl as string }}
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              backgroundColor: `${Colors.purple[500]}1A`,
            }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 16,
    backgroundColor: `${Colors.purple[500]}1A`,
  },
  webViewContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  browserButton: {
    padding: 16,
  },
  informationsContainer: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 12,
    marginBottom: 32,
    gap: 12,
  },
})
