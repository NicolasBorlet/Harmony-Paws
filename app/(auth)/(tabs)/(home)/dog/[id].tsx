import Back from '@/components/back-button';
import MasterDogCardComponent from '@/components/dog/master-dog-card';
import ParallaxScrollView from '@/components/parallax-scrollview';
import { CardTitle, Small } from '@/components/ui/text';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

const dogData = {
  name: 'Max',
  age: 4,
  description:
    'Max est un chien très actif et curieux. Il aime explorer de nouvelles choses et est toujours prêt à une nouvelle aventure.',
  image: 'https://picsum.photos/300',
  breed: 'Labrador',
  sex: 'Male',
  size: 'Huge',
  master: {
    name: 'Lucie',
    age: 30,
    profilePicture: 'https://picsum.photos/300',
  },
  nextRide : {
    location: 'Champagnier',
    date: new Date(),
    hour: '17:30',
    duration: 60,
  }
};

export default function DogDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <>
      <Back />
      <ParallaxScrollView headerImage={dogData.image}>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <CardTitle color='#000000'>Max, 4 ans</CardTitle>
            <Small color='#000000'>{dogData.description}</Small>
          </View>
          <MasterDogCardComponent />
        </View>
      </ParallaxScrollView>
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
    gap: 10
  }
});
