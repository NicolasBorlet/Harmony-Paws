import Back from '@/components/back-button';
import { Link, usePathname } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Messages() {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Back />
      <View style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Link href="../">
          Back
        </Link>
        <Text>Messages</Text>
      </View>
    </SafeAreaView>
  );
}
