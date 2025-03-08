import { i18n } from '@/app/_layout'
import Back from '@/components/back-button'
import { StandardButton } from '@/components/ui/button'
import { Body, BodyBold, ExtraSmall, SmallBold } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView, Share, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'

export default function Document() {
  const params = useLocalSearchParams()
  const insets = useSafeAreaInsets()

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
          <View style={{ gap: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 4,
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Colors.purple[500],
                  borderRadius: 100,
                  padding: 2,
                }}
              >
                <AntDesign
                  name='question'
                  size={12}
                  color={Colors.purple[500]}
                />
              </View>
              <ExtraSmall color={Colors.purple[500]}>
                {params.reason}
              </ExtraSmall>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 4,
                alignItems: 'center',
              }}
            >
              <MaterialCommunityIcons
                name='map-marker-outline'
                size={18}
                color={Colors.purple[500]}
              />
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
        <View style={{ paddingTop: 32 }}>
          <StandardButton
            onPress={() => {
              Share.share({
                url: params.documentUrl as string,
              })
            }}
          >
            <Body color={Colors.white}>{i18n.t('global.share')}</Body>
          </StandardButton>
        </View>
      </View>
    </ScrollView>
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
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
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
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
  },
})
