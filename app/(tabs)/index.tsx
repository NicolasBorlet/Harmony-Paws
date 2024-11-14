import DogListing from '@/components/dogListing/dog-listing';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DogListing />
    </SafeAreaView>
  );
}
