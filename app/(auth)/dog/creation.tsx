import { i18n } from '@/app/_layout'
import Back from '@/components/back-button'
import DogAgeSection from '@/components/dog/creation/age-section'
import DogBehaviorSection from '@/components/dog/creation/behavior-section'
import DogBreedSection from '@/components/dog/creation/breed-section'
import DogNameSection from '@/components/dog/creation/dog-name-section'
import ImageSelector from '@/components/dog/creation/image-selector'
import SexSection from '@/components/dog/creation/sex-section'
import ParallaxScrollViewText from '@/components/parallax-scrollview-text'
import { StandardButton } from '@/components/ui/button'
import {
  BodyMedium,
  ParagraphMedium,
  SpecialTitle_3,
} from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { useBehaviors } from '@/lib/api/behavior'
import { useBreeds } from '@/lib/api/breed'
import { user$ } from '@/lib/observables/session-observable'
import { storage } from '@/lib/utils/storage'
import { useNavigation } from 'expo-router'
import React, { useLayoutEffect } from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function FirstStep() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const canGoBack = navigation.canGoBack()

  const { data: breeds, isLoading: isLoadingBreeds } = useBreeds()
  const { data: behaviors, isLoading: isLoadingBehaviors } = useBehaviors()

  const isLoading = isLoadingBreeds || isLoadingBehaviors || !user$.get()

  useLayoutEffect(() => {
    const userData = user$.get()
    console.log('Current user from user$:', userData)

    // Accéder à l'objet utilisateur dans la structure imbriquée
    if (userData && typeof userData === 'object') {
      // Trouver l'ID numérique (la clé)
      const userId = Object.keys(userData)[0]
      // Accéder à l'objet utilisateur
      const user = userData[userId]

      if (user && user.id) {
        console.log('Setting dog owner_id with:', user.id)
        storage.set(
          'dog',
          JSON.stringify({
            owner_id: user.id,
          }),
        )

        // Vérification du stockage
        const storedDog = storage.getString('dog')
        console.log('Stored dog data:', storedDog)
      }
    } else {
      console.log('No valid user data available in user$')
    }
  }, [])

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color={Colors.light.primary} />
      </View>
    )
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
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
        paddingHorizontal={0}
      >
        <View style={styles.dogInformationContainer}>
          {/** Image selector */}
          <ImageSelector />
          {/** Sex container */}
          <SexSection />
          {/** Dog name container */}
          <DogNameSection />
          {/** Dog age container */}
          <DogAgeSection />
          {/** Dog breed container */}
          <DogBreedSection breeds={breeds} />
          {/** Dog behavior container */}
          <DogBehaviorSection behaviors={behaviors} />
          {/** Button container */}
        </View>
      </ParallaxScrollViewText>
      <View
        style={[
          styles.buttonContainer,
          {
            bottom: insets.bottom,
          },
        ]}
      >
        <StandardButton onPress={() => {}}>
          <BodyMedium color='#fff'>{i18n.t('continue')}</BodyMedium>
        </StandardButton>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  dogInformationContainer: {
    gap: 32,
    paddingBottom: 72,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 16,
  },
})
