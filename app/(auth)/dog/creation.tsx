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
import { addDogBehaviors, createDog, uploadDogImage } from '@/lib/api/dog'
import { user$ } from '@/lib/observables/session-observable'
import { storage } from '@/lib/utils/storage'
import * as Burnt from 'burnt'
import { router, useNavigation } from 'expo-router'
import React, { useLayoutEffect, useState } from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
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
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  // Fonction pour vérifier si tous les champs requis sont remplis
  const validateDogData = (dogData: any) => {
    const requiredFields = [
      'owner_id',
      'image',
      'sex',
      'name',
      'age',
      'breed_id',
      'behavior_ids',
    ]

    // Vérifier que tous les champs requis existent et ne sont pas vides
    const isValid = requiredFields.every(field => {
      if (field === 'behavior_ids') {
        return Array.isArray(dogData[field]) && dogData[field].length > 0
      }
      return dogData[field] !== undefined && dogData[field] !== ''
    })

    return isValid
  }

  // Fonction pour obtenir les données actuelles du chien
  const getCurrentDogData = () => {
    try {
      return JSON.parse(storage.getString('dog') || '{}')
    } catch {
      return {}
    }
  }

  const handleCreateDog = async () => {
    const dogData = getCurrentDogData()

    if (!validateDogData(dogData)) {
      // Vous pouvez ajouter ici une alerte ou un message d'erreur
      Burnt.toast({
        title: 'Erreur',
        preset: 'error',
        message: 'Veuillez remplir tous les champs',
        haptic: 'error',
      })
      return
    }

    try {
      setIsSubmitting(true)

      // Récupérer les données du storage
      const { image, behavior_ids, ...dogInfo } = dogData

      // Créer le chien
      const [newDog] = await createDog(dogInfo)

      // Si on a une image, l'uploader
      if (image) {
        await uploadDogImage(newDog.id, image)
      }

      // Si on a des comportements, les ajouter
      if (behavior_ids && behavior_ids.length > 0) {
        await addDogBehaviors(newDog.id, behavior_ids)
      }

      // Nettoyer le storage
      storage.delete('dog')

      // Rediriger vers la page suivante
      Burnt.toast({
        title: 'Chien créé avec succès',
        preset: 'done',
        message: 'Votre chien a été créé avec succès',
        haptic: 'success',
      })
      router.replace(`/(auth)/profile-creation`)
    } catch (error) {
      console.error('Error creating dog:', error)
      // Ici vous pourriez ajouter une gestion d'erreur UI
    } finally {
      setIsSubmitting(false)
    }
  }

  // Vérifier si le formulaire est valide pour activer/désactiver le bouton
  const isFormValid = validateDogData(getCurrentDogData())

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
                  top={Platform.OS === 'android' ? 32 : undefined}
                  backgroundColor='white'
                  color='black'
                />
              )}
              <ParagraphMedium color='white'>
                {i18n.t('global.step')} 1/2
              </ParagraphMedium>

              <SpecialTitle_3 color='white'>
                {i18n.t('dogCreation.wouldLikeKnowPet')}
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
            bottom:
              Platform.OS === 'android' ? insets.bottom + 32 : insets.bottom,
          },
        ]}
      >
        <StandardButton
          onPress={handleCreateDog}
          disabled={isSubmitting}
          style={[
            styles.button,
            (!isFormValid || isSubmitting) && styles.buttonDisabled,
          ]}
        >
          <BodyMedium color='#fff'>{i18n.t('global.continue')}</BodyMedium>
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
  button: {
    opacity: 1,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
})
