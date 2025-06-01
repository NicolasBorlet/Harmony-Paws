import React, { i18n } from '@/app/_layout'
import Back from '@/components/back-button'
import BodyTitle from '@/components/bodyTitle/body-title'
import DogAgeSection from '@/components/dog/creation/age-section'
import DogBehaviorSection from '@/components/dog/creation/behavior-section'
import DogBreedSection from '@/components/dog/creation/breed-section'
import DogNameSection from '@/components/dog/creation/dog-name-section'
import DominanceSection from '@/components/dog/creation/dominance-section'
import SexSection from '@/components/dog/creation/sex-section'
import MasterDogCardComponent from '@/components/dog/master-dog-card'
import Block from '@/components/grid/Block'
import ParallaxScrollView from '@/components/parallax-scrollview'
import { DogDetailsSkeleton } from '@/components/skeletons/dog-details-skeleton'
import { StandardButton } from '@/components/ui/button'
import { ContextMenu } from '@/components/ui/context-menu'
import Divider from '@/components/ui/divider'
import Input from '@/components/ui/input'
import {
  Body,
  BodyBold,
  BodyMedium,
  CardTitle,
  ExtraSmallMedium,
} from '@/components/ui/text'
import { GridItem, GridItemBackground } from '@/components/ui/view'
import { Colors } from '@/constants/Colors'
import { Database } from '@/database.types'
import { useBehaviors } from '@/lib/api/behavior'
import { useBreeds } from '@/lib/api/breed'
import { useDogDetails } from '@/lib/api/dog'
import { user$ } from '@/lib/observables/session-observable'
import { Entypo } from '@expo/vector-icons'
import * as Burnt from 'burnt'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

type Breed = Database['public']['Tables']['breeds']['Row']
type Dog = Database['public']['Tables']['dogs']['Row']

const convertToBreed = (breed: any): Breed | null => {
  if (!breed) return null
  return {
    id: breed.id,
    name: breed.name,
    created_at: breed.created_at || null,
    updated_at: breed.updated_at || null,
  }
}

const convertToBreeds = (breeds: any[] | undefined): Breed[] | undefined => {
  if (!breeds) return undefined
  return breeds.map(breed => ({
    id: breed.id,
    name: breed.name,
    created_at: breed.created_at || null,
    updated_at: breed.updated_at || null,
  }))
}

export default function DogDetails() {
  const { id } = useLocalSearchParams()
  const { data, isLoading } = useDogDetails(id as string)
  const { data: behaviors } = useBehaviors()
  const { data: breeds } = useBreeds()

  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false)
  const [isModifying, setIsModifying] = useState(false)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })
  const [inputHeight, setInputHeight] = useState(10)

  const user = user$.get()
  const insets = useSafeAreaInsets()

  const bottomPosition = useSharedValue(-100)
  const opacity = useSharedValue(0)

  const [modifiedData, setModifiedData] = useState<{
    name: string
    age: number
    breed: Breed | null
    sex: 'male' | 'female'
    dominance: string | null
    behaviors: any[]
  }>({
    name: '',
    age: 0,
    breed: null,
    sex: 'male',
    dominance: null,
    behaviors: [],
  })

  useEffect(() => {
    if (data) {
      setModifiedData({
        name: data.name,
        age: data.age,
        breed: convertToBreed(data.breed),
        sex: data.sex as 'male' | 'female',
        dominance: data.dominance,
        behaviors: data.behaviors,
      })
    }
  }, [data])

  useEffect(() => {
    buttonAnimation()
  }, [])

  const buttonAnimation = () => {
    bottomPosition.value = withSpring(insets.bottom + 16, {
      damping: 20,
      stiffness: 90,
    })

    opacity.value = withSpring(1, {
      damping: 20,
      stiffness: 90,
    })
  }

  const animatedStyles = useAnimatedStyle(() => {
    return {
      bottom: bottomPosition.value,
      opacity: opacity.value,
    }
  })

  const handleContextMenuPress = () => {
    console.log('handleContextMenuPress')
    setContextMenuPosition({
      x: SCREEN_WIDTH - 220,
      y: Platform.OS === 'ios' ? insets.top + 25 : 74,
    })
    setIsContextMenuVisible(true)
  }

  const contextMenuItems = [
    {
      label: i18n.t('dog.edit'),
      onPress: () => {
        if (isModifying) {
          Burnt.toast({
            title: i18n.t('dog.alreadyModifying'),
            preset: 'error',
            haptic: 'error',
          })
        } else {
          setIsModifying(true)
          if (data) {
            setModifiedData({
              name: data.name,
              age: data.age,
              breed: convertToBreed(data.breed),
              sex: data.sex as 'male' | 'female',
              dominance: data.dominance,
              behaviors: data.behaviors,
            })
          }
        }
      },
      icon: <Entypo name='edit' size={16} color={Colors.light.text} />,
    },
    {
      label: i18n.t('dog.delete'),
      onPress: () => {
        Burnt.toast({
          title: i18n.t('dog.deleteConfirmation'),
          preset: 'error',
          message: i18n.t('dog.deleteConfirmationMessage'),
        })
      },
      icon: <Entypo name='trash' size={16} color={Colors.light.text} />,
    },
  ]

  if (isLoading || !data) {
    return <DogDetailsSkeleton />
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={StyleSheet.absoluteFill}>
        <Back top={Platform.OS === 'ios' ? insets.top : 24} />
        {user?.id === data.owner.id && (
          <Back
            icon={
              <Entypo
                name='dots-three-vertical'
                size={16}
                color={Colors.white}
              />
            }
            onPress={handleContextMenuPress}
            backgroundColor={Colors.purple[500]}
            top={Platform.OS === 'ios' ? insets.top : 24}
            right='16px'
          />
        )}
        <ContextMenu
          isVisible={isContextMenuVisible}
          onClose={() => setIsContextMenuVisible(false)}
          items={contextMenuItems}
          position={contextMenuPosition}
        />
        <ParallaxScrollView headerImage={data?.image || ''}>
          <View
            style={[
              styles.container,
              {
                paddingBottom: Platform.OS === 'ios' ? insets.bottom : 72,
              },
            ]}
          >
            <View style={styles.infoContainer}>
              <CardTitle color='#000000'>
                {isModifying ? (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 12,
                      alignItems: 'center',
                    }}
                  >
                    <DogNameSection
                      initialName={modifiedData.name}
                      isModifying={true}
                      onNameChange={newName => {
                        setModifiedData(prev => ({
                          ...prev,
                          name: newName,
                        }))
                      }}
                    />
                    <DogAgeSection
                      initialAge={modifiedData.age}
                      isModifying={true}
                      onAgeChange={newAge => {
                        setModifiedData(prev => ({
                          ...prev,
                          age: newAge,
                        }))
                      }}
                    />
                  </View>
                ) : (
                  `${data.name}, ${data.age} ans`
                )}
              </CardTitle>
            </View>
            <View>
              {isModifying ? (
                <Block gap={12}>
                  <DogBreedSection
                    breeds={convertToBreeds(breeds)}
                    initialBreed={modifiedData.breed}
                    isModifying={true}
                    onBreedChange={newBreed => {
                      setModifiedData(prev => ({
                        ...prev,
                        breed: newBreed,
                      }))
                    }}
                  />
                  <SexSection
                    initialSex={modifiedData.sex}
                    isModifying={true}
                    onSexChange={newSex => {
                      setModifiedData(prev => ({
                        ...prev,
                        sex: newSex,
                      }))
                    }}
                  />
                  {modifiedData.dominance && (
                    <DominanceSection
                      initialDominance={modifiedData.dominance}
                      isModifying={true}
                      onDominanceChange={newDominance => {
                        setModifiedData(prev => ({
                          ...prev,
                          dominance: newDominance,
                        }))
                      }}
                    />
                  )}
                </Block>
              ) : (
                <Block row wrap='nowrap' style={{ gap: 12 }}>
                  <GridItemBackground height={60}>
                    <BodyBold color={Colors.light.secondary}>
                      {data.breed?.name}
                    </BodyBold>
                  </GridItemBackground>
                  <GridItemBackground height={60}>
                    <BodyBold color={Colors.light.secondary}>
                      {data.sex}
                    </BodyBold>
                  </GridItemBackground>
                  {data.dominance && (
                    <GridItemBackground height={60}>
                      <BodyBold color={Colors.light.secondary}>
                        {data.dominance}
                      </BodyBold>
                    </GridItemBackground>
                  )}
                </Block>
              )}
            </View>
            <Divider />
            <View style={styles.infoContainer}>
              <BodyTitle title={`${i18n.t('dog.aboutOf')} ${data.name}`} />
              {isModifying ? (
                <Input
                  placeholder={data.description}
                  multiline
                  onContentSizeChange={(event: any) =>
                    setInputHeight(event.nativeEvent.contentSize.height)
                  }
                  style={{
                    height: Math.max(10, inputHeight),
                  }}
                />
              ) : (
                <Body>
                  {data.description || i18n.t('global.weDontKnowMoreAbout')}{' '}
                  {data.name}.
                </Body>
              )}
            </View>
            <View style={styles.infoContainer}>
              {isModifying ? (
                <>
                  <Body color='black'>
                    {i18n.t('dogCreation.dogBehaviorQuestion')}
                  </Body>
                  <DogBehaviorSection
                    behaviors={behaviors}
                    showTitle={false}
                    initialSelectedBehaviors={data.behaviors.map(b => b.id)}
                    onBehaviorsChange={newBehaviors => {
                      console.log('New behaviors:', newBehaviors)
                    }}
                    isModifying
                  />
                </>
              ) : (
                <>
                  <Divider />
                  <BodyTitle title={i18n.t('dog.behavior')} />
                  <Block
                    flex={0}
                    row
                    wrap='wrap'
                    style={{ gap: 12 }}
                    justifyContent='space-between'
                  >
                    {data.behaviors.length > 0 ? (
                      data.behaviors.map(behavior => (
                        <GridItem key={behavior.id}>
                          <ExtraSmallMedium color='#F49819'>
                            {behavior.name}
                          </ExtraSmallMedium>
                        </GridItem>
                      ))
                    ) : (
                      <Body>{i18n.t('dog.noBehavior')}</Body>
                    )}
                  </Block>
                </>
              )}
            </View>
            {!isModifying && (
              <>
                <Divider />
                <View style={styles.infoContainer}>
                  <BodyTitle title={i18n.t('dog.myMaster')} />
                  <Pressable
                    onPress={() => {
                      if (user?.id === data.owner.id) {
                        Burnt.toast({
                          title: 'Vous êtes le maître de ce chien',
                          preset: 'error',
                          message:
                            'Vous ne pouvez pas vous ajouter vous-même comme ami',
                        })
                        return
                      } else {
                        router.push({
                          pathname: '/user/[id]',
                          params: { id: data.owner.id },
                        })
                      }
                    }}
                  >
                    <MasterDogCardComponent
                      masterData={{
                        first_name: data.owner.first_name,
                        last_name: data.owner.last_name,
                        id: data.owner.id,
                      }}
                    />
                  </Pressable>
                </View>
                <Divider />

                <View style={styles.infoContainer}>
                  <BodyTitle title={i18n.t('dog.nextRide')} />
                  <Body>{i18n.t('dog.noNextRide')}</Body>
                  {/* <RideItemListing rideCardData={data.nextRide} /> */}
                </View>
              </>
            )}
          </View>
        </ParallaxScrollView>
        {data.owner.id !== user?.id && (
          <Animated.View style={[styles.buttonContainer, animatedStyles]}>
            <StandardButton onPress={() => router.push('/dog/invitation')}>
              <BodyMedium color='#fff'>
                {i18n.t('dog.rideInvitation')}
              </BodyMedium>
            </StandardButton>
          </Animated.View>
        )}
        {isModifying && (
          <Animated.View style={[styles.buttonContainer, animatedStyles]}>
            <Block row wrap='nowrap' style={{ gap: 12 }}>
              <Block>
                <StandardButton
                  onPress={() => {
                    Burnt.toast({
                      title: i18n.t('global.cancel'),
                      preset: 'done',
                    })
                    setIsModifying(false)
                  }}
                  color={Colors.red[500]}
                  pressedColor={Colors.red[400]}
                >
                  <BodyMedium color='#fff'>
                    {i18n.t('global.cancel')}
                  </BodyMedium>
                </StandardButton>
              </Block>
              <Block>
                <StandardButton
                  onPress={() => {
                    Burnt.toast({
                      title: i18n.t('global.save'),
                      preset: 'done',
                    })
                    setIsModifying(false)
                  }}
                >
                  <BodyMedium color='#fff'>{i18n.t('global.save')}</BodyMedium>
                </StandardButton>
              </Block>
            </Block>
          </Animated.View>
        )}
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  ownerContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ownerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  ownerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  ownerDetails: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },
})
