import Back from '@/components/back-button'
import { Body } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { useLocalSearchParams } from 'expo-router'
import { Linking, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'

export default function Document() {
  const params = useLocalSearchParams()
  const insets = useSafeAreaInsets()

  const openInBrowser = async () => {
    await Linking.openURL(params.documentUrl as string)
  }

  return (
    <View style={styles.container}>
      <Back position='relative' top={insets.top} left='16' />
      <Body>{params.documentName}</Body>

      <View style={styles.webViewContainer}>
        <WebView
          source={{ uri: params.documentUrl as string }}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  webViewContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 16,
    backgroundColor: `${Colors.purple[500]}1A`,
  },
  browserButton: {
    padding: 16,
  },
})
