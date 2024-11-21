import { CardTitle } from '@/components/ui/text';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

export default function RideDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CardTitle>Ride {id}</CardTitle>
    </View>
  );
}