import Back from '@/components/back-button';
import MasterDogCardComponent from '@/components/dog/master-dog-card';
import ParallaxScrollView from '@/components/parallax-scrollview';
import { StandardButton } from '@/components/ui/button';
import { BodyMedium, CardTitle, Small } from '@/components/ui/text';
import { router} from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const dog = {
  name: 'Taico',
  age: 30,
  image: 'https://picsum.photos/300',
  description: 'Taico est un chien de race australienne. Il est le meilleur ami de la famille et est toujours à l\'écoute de ses amis.',
  owner: {
    name: 'Emma Swane',
    image: 'https://picsum.photos/300',
  },
  breed: {
    name: 'Golden Retriever',
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
            <BodyMedium>{dog.description || ''}</BodyMedium>
            <View>
              <Small color='#000000'>Race: {dog.breed.name}</Small>
              {/* <Small color='#000000'>Dominance: {dog.dominance}</Small> */}
            </View>
          </View>
          <MasterDogCardComponent />
          {/* Uncomment when you have ride data
          <RideItemListing rideCardData={dogData.nextRide} /> 
          */}
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
    gap: 16,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
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
