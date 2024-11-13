import StyledButton from '@/components/ui/button';
import { ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <StyledButton title="Hello" />
      </ScrollView>
    </SafeAreaView>
  );
}
