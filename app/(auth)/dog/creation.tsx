import { i18n } from '@/app/_layout'
import Back from '@/components/back-button'
import { Checkbox } from '@/components/checkbox'
import ParallaxScrollViewText from '@/components/parallax-scrollview-text'
import { ParagraphMedium, SpecialTitle_3 } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { useNavigation } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function FirstStep() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  const [checked, setChecked] = useState(false)
  const [checked2, setChecked2] = useState(false)
  const [checked3, setChecked3] = useState(false)

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
        <View>
          <Text>Etape 1/2</Text>
          <Text>Informations</Text>
          <View style={styles.listContainer}>
            <Checkbox
              label='test'
              checked={checked}
              onPress={() => setChecked(!checked)}
            />
            <Checkbox
              label='test'
              checked={checked2}
              onPress={() => setChecked2(!checked2)}
            />
            <Checkbox
              label='testtesttesttesttesttest'
              checked={checked3}
              onPress={() => setChecked3(!checked3)}
            />
          </View>
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
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 24,
    paddingRight: 16,
  },
})
