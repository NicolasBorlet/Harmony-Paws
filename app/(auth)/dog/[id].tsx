import Back from '@/components/back-button';
import MasterDogCardComponent from '@/components/dog/master-dog-card';
import ParallaxScrollView from '@/components/parallax-scrollview';
import RideItemListing from '@/components/rideListing/ride-item-listing';
import { StandardButton } from '@/components/ui/button';
import { BodyMedium, CardTitle, Small } from '@/components/ui/text';
import { DogCardInterface } from '@/lib/api/dog';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function DogDetails() {
  const { id, dogData } = useLocalSearchParams<{ id: string, dogData: string }>();
  const dog: DogCardInterface = dogData ? JSON.parse(dogData) : null;

  if (!dog) {
    return null; // Or a loading state / error message
  }

  return (
    <>
      <Back />
      <ParallaxScrollView headerImage={dog.image}>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <CardTitle color='#000000'>{dog.name}, {dog.age} ans</CardTitle>
          </View>
          <MasterDogCardComponent />
          {/* Uncomment when you have ride data
          <RideItemListing rideCardData={dogData.nextRide} /> 
          */}
        </View>
        <StandardButton onPress={() => router.push('/dog/invitation')}>
          <BodyMedium color='#fff'>On se balade ?</BodyMedium>
        </StandardButton>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    padding: 20,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
});
