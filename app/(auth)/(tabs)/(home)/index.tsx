import { useSession } from '@/app/ctx';
import DogListing from '@/components/dogListing/dog-listing';
import RideListing from '@/components/rideListing/ride-listing';
import TabSwitcher from '@/components/ui/TabSwitcher';
import { Body, SpecialTitle } from '@/components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Button, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { signOut } = useSession();
  const [selectedTab, setSelectedTab] = useState<'dog' | 'ride'>('dog');

  const gesture = Gesture.Pan()
    .onEnd((event) => {
      if (Math.abs(event.translationX) < 50) return;

      if (event.translationX > 0) {
        runOnJS(setSelectedTab)('dog');
      } else {
        runOnJS(setSelectedTab)('ride');
      }
    });

  const handleSignOut = () => {
    signOut();
    router.replace("/login");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button
        title="Sign Out"
        onPress={handleSignOut}
      />
      <View style={{ paddingHorizontal: 20, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
        <View style={{ height: 48, width: 48, backgroundColor: '#663399' }} />
        <View style={{ height: 48, width: 48, backgroundColor: '#663399' }} />
      </View>
      <View style={{ paddingBottom: 48, paddingHorizontal: 20 }}>
        <SpecialTitle>Salut Taico</SpecialTitle>
        <Body>C’est le moment de se balader ?</Body>
      </View>
      <View style={{ paddingTop: 20, alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
        <TabSwitcher
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
        />
        <Ionicons name="filter" size={21} color="black" style={{ height: 48, width: 48 }} />
      </View>
      <GestureDetector gesture={gesture}>
        {selectedTab === 'dog' ? <DogListing /> : <RideListing />}
      </GestureDetector>
    </SafeAreaView>
  );
}
