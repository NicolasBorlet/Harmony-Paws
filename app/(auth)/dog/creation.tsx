import { i18n } from '@/app/_layout'
import Back from '@/components/back-button'
import ParallaxScrollViewText from '@/components/parallax-scrollview-text'
import { ParagraphMedium, SpecialTitle_3 } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { useNavigation } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function FirstStep() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  const canGoBack = navigation.canGoBack()

  return (
    <>
      <ParallaxScrollViewText
        headerTextContainer={
          <View
            style={{
              paddingTop: insets.top,
              padding: 16,
            }}
          >
            <View style={{ flexDirection: 'column', gap: 20 }}>
              {canGoBack && (
                <Back
                  position='relative'
                  left='0'
                  backgroundColor='white'
                  color='black'
                />
              )}
              <ParagraphMedium color='white'>
                {i18n.t('step')} 1/2
              </ParagraphMedium>
              <SpecialTitle_3 color='white'>
                {i18n.t('wouldLikeKnowPet')}
              </SpecialTitle_3>
            </View>
          </View>
        }
        backgroundColor={Colors.light.primary}
      >
        <View style={{ backgroundColor: 'red' }}>
          <Text>Etape 1/2</Text>
          <Text>Informations</Text>
        </View>
      </ParallaxScrollViewText>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  titleContainer: {
    gap: 16,
  },
  content: {
    paddingHorizontal: 20,
    gap: 20,
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    gap: 20,
  },
})
