import { i18n } from '@/app/_layout'
import Back from '@/components/back-button'
import ItemListing from '@/components/document/item-listing'
import Divider from '@/components/ui/divider'
import { BodyBold, SpecialTitle_3 } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { useDogDocuments } from '@/lib/api/dog'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { Linking, Platform, Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Documents() {
  const insets = useSafeAreaInsets()
  const params = useLocalSearchParams()
  const { data: documents } = useDogDocuments(params.id as string)

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  return (
    <View style={styles.container}>
      <Back position='relative' top={insets.top} left='0' />
      <BodyBold
        style={{
          textAlign: 'center',
          marginTop: 8,
        }}
      >
        {i18n.t('documents.myDocuments')}
      </BodyBold>
      <Divider spacing={32} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 32,
        }}
      >
        <View
          style={{
            gap: 8,
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <SpecialTitle_3>
            {i18n.t(`months.${currentMonth}`)} {currentYear}
          </SpecialTitle_3>
          <Entypo name='chevron-down' size={16} color={Colors.purple[500]} />
        </View>
        <Pressable
          style={{
            backgroundColor: Colors.orange[500],
            padding: 8,
            borderRadius: 16,
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AntDesign name='plus' size={16} color={Colors.white} />
        </Pressable>
      </View>
      {documents?.map(document => (
        <Pressable
          key={document.name}
          onPress={() => {
            Platform.OS === 'android'
              ? Linking.openURL(document.url)
              : router.push({
                  pathname: '/(auth)/(tabs)/(medical)/[id]/documents/[id]',
                  params: {
                    id: params.id as string,
                    documentName: document.name,
                    documentUrl: document.url,
                  },
                })
          }}
        >
          <ItemListing item={document} />
        </Pressable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
})
