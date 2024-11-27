import Back from '@/components/back-button';
import MasterDogCardComponent from '@/components/dog/master-dog-card';
import ParallaxScrollView from '@/components/parallax-scrollview';
import { StandardButton } from '@/components/ui/button';
import { BodyMedium, CardTitle, Body, ExtraSmallMedium, BodyBold, ExtraSmallSemiBold } from '@/components/ui/text';
import { router} from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RideItemListing from '@/components/rideListing/ride-item-listing';
import BodyTitle from '@/components/body-title/body-title';
import Block from '@/components/grid/Block';
import { GridItem, GridItemBackground } from '@/components/ui/view';
import { DogDominance } from '@/lib/api/types';

const dog = {
  id: 1,
  name: 'Taico',
  age: 3,
  image: 'https://picsum.photos/300',
  sex: 'Mâle',
  dominance: DogDominance.DOMINANT,
  description: 'Taico est un chien de race australienne. Il est le meilleur ami de la famille et est toujours à l\'écoute de ses amis.',
  owner: {
    name: 'Emma Swane',
    image: 'https://picsum.photos/300',
  },
  breed: {
    name: 'Golden Retriever',
  },
  behavors: [
    {
      id: 1,
      name: 'Joueur',
    },
    {
      id: 2,
      name: 'Calme',
    },
    {
      id: 3,
      name: 'Intéressé',
    },
    {
      id: 1,
      name: 'Joueur',
    },
    {
      id: 2,
      name: 'Calme',
    },
    {
      id: 3,
      name: 'Intéressé',
    },
    {
      id: 1,
      name: 'Joueur',
    }
  ],
  nextRide: {
    image: 'https://picsum.photos/300',
    name: 'Balade 1',
    date: 'Lundi 1er avril',
    time: '14h30',
  }
};

export default function DogDetails() {
  const insets = useSafeAreaInsets();

  const bottomPosition = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    buttonAnimation();
  }, []);


  const buttonAnimation = () => {
  // Animate the button to slide up
    bottomPosition.value = withSpring(insets.bottom + 16, {
      damping: 20,
      stiffness: 90,
    });

    // Animate the button opacity
    opacity.value = withSpring(1, {
      damping: 20,
      stiffness: 90,
    });
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      bottom: bottomPosition.value,
      opacity: opacity.value,
    };
  });

  return (
    <>
      <Back />
      <ParallaxScrollView headerImage={dog.image}>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <CardTitle color='#000000'>{dog.name}, {dog.age} ans</CardTitle>
          </View>
          <View>
            <Block row wrap='nowrap' style={{
              gap: 8,
            }}>
              <GridItemBackground>
                <BodyBold color='#663399'>{dog.breed.name}</BodyBold>
              </GridItemBackground>
              <GridItemBackground>
                <BodyBold color='#663399'>{dog.sex}</BodyBold>
              </GridItemBackground>
              <GridItemBackground>
                <BodyBold color='#663399'>{dog.dominance}</BodyBold>
              </GridItemBackground>
            </Block>
          </View>
          <View style={styles.infoContainer}>
            <BodyTitle title={`A propos de ${dog.name}`} />
            <Body>
              {dog.description || ''}
            </Body>
          </View>
          <View style={styles.infoContainer}>
            <BodyTitle title='Comportement' />
            <Block flex={0} row wrap="wrap" style={{ gap: 12 }} justifyContent='space-between'>
              {dog.behavors.map((behavor) => (
                <GridItem key={behavor.id}>
                  <ExtraSmallMedium color='#F49819'>{behavor.name}</ExtraSmallMedium>
                </GridItem>
              ))}
            </Block>
          </View>
          <View style={styles.infoContainer}>
            <BodyTitle title='Ma maitresse' />
            <MasterDogCardComponent />
          </View>
          <View style={styles.infoContainer}>
            <BodyTitle title='Sa prochaine balade' />
            <RideItemListing rideCardData={dog.nextRide} />
          </View>
        </View>
      </ParallaxScrollView>
      <Animated.View style={[styles.buttonContainer, animatedStyles]}>
        <StandardButton onPress={() => router.push('/dog/invitation')}>
          <BodyMedium color='#fff'>On se balade ?</BodyMedium>
        </StandardButton>
      </Animated.View>
    </>
  );
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
    paddingHorizontal: 20,
  },
});
