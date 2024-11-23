import Back from '@/components/back-button';
import MasterDogCardComponent from '@/components/dog/master-dog-card';
import ParallaxScrollView from '@/components/parallax-scrollview';
import RideItemListing from '@/components/rideListing/ride-item-listing';
import { StandardButton } from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import { BodyMedium, CardTitle, Small } from '@/components/ui/text';
import { Dog, DogCardInterface, dogApi, dogLocalStorage } from '@/lib/api/dog';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function DogDetails() {
  const db = SQLite.openDatabaseSync('harmonypaws.db');
  
  const { id, dogData } = useLocalSearchParams<{ id: string, dogData: string }>();
  const dog: DogCardInterface = dogData ? JSON.parse(dogData) : null;
  const [fullDogData, setFullDogData] = useState<Dog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDogLocalDetails = async () => {
      try {
        const data = await dogLocalStorage.getLocalDog(db, id);

        if (!data || !data.breed_id || !data.description) {
          console.log('Dog needs update from Supabase, fetching...');
          await fetchDogDetails();
          return;
        }

        console.log('Using local dog data:', data);
        setFullDogData(data);
      } catch (error) {
        console.error('Error fetching dog details:', error);
        await fetchDogDetails();
      } finally {
        setIsLoading(false);
      }
    };

    const fetchDogDetails = async () => {
      try {
        const data = await dogApi.getDog(id);
        console.log('Fetched dog details from Supabase:', data);

        await dogLocalStorage.syncLocalDog(db, data);
        console.log('Updated local storage with new data');

        setFullDogData(data);
      } catch (error) {
        console.error('Error fetching dog details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDogLocalDetails();
  }, [id]);

  if (!dog) {
    return null;
  }

  return (
    <>
      <Back />
      <ParallaxScrollView headerImage={dog.image}>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <CardTitle color='#000000'>{dog.name}, {dog.age} ans</CardTitle>
            {isLoading ? (
              <Loader />
            ) : fullDogData ? (
              <>
                <Small color='#000000'>{fullDogData.description}</Small>
                <View style={styles.detailsContainer}>
                  <Small color='#000000'>Race: {fullDogData.breed_id}</Small>
                  <Small color='#000000'>Dominance: {fullDogData.dominance}</Small>
                </View>
              </>
            ) : null}
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
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    marginTop: 8,
  },
});
