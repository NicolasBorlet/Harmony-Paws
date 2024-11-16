import { useSession } from '@/app/ctx';
import { Button, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  const { signOut } = useSession();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Button title="Go to login" onPress={signOut} />
      </ScrollView>
    </SafeAreaView>
  );
}
