import Back from '@/components/back-button'
import { Body } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { useDogDocuments } from '@/lib/api/dog'
import { router, useLocalSearchParams } from 'expo-router'
import { Linking, Platform, Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Documents() {
  const insets = useSafeAreaInsets()
  const params = useLocalSearchParams()
  const { data: documents } = useDogDocuments(params.id as string)

  return (
    <View style={styles.container}>
      <Back position='relative' top={insets.top} left='0' />
      {documents?.map(document => (
        <Pressable
          key={document.name}
          onPress={() => {
            Platform.OS === 'android'
              ? Linking.openURL(document.url)
              : router.push({
                  pathname: '/(auth)/(tabs)/(medical)/[id]/documents/[id]',
                  params: {
                    id: params.id,
                    documentName: document.name,
                    documentUrl: document.url,
                  },
                })
          }}
        >
          <Body>{document.name}</Body>
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
