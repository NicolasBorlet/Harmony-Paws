import DogListing from '@/components/dogListing/dog-listing';
import RideListing from '@/components/rideListing/ride-listing';
import RoundedIconLink from '@/components/rounded-icon-link';
import { MapButton } from '@/components/ui/button';
import TabSwitcher from '@/components/ui/TabSwitcher';
import { Body, Small, SpecialTitle } from '@/components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState<'dog' | 'ride'>('dog');
  const headerHeight = useSharedValue(200);
  const startY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin((event) => {
      startY.value = event.absoluteY;
    })
    .onUpdate((event) => {
      const deltaY = startY.value - event.absoluteY;
      headerHeight.value = Math.max(
        100, // hauteur minimum
        Math.min(200, 200 - deltaY) // hauteur maximum
      );
    })
    .onEnd((event) => {
      // Gestion du swipe horizontal existant
      if (Math.abs(event.translationX) > 50) {
        if (event.translationX > 0) {
          runOnJS(setSelectedTab)('dog');
        } else {
          runOnJS(setSelectedTab)('ride');
        }
      }
    });

  const animatedHeaderStyle = useAnimatedStyle(() => ({
    height: headerHeight.value,
  }));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.View style={animatedHeaderStyle}>
        <View style={{ paddingHorizontal: 20, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
          <RoundedIconLink icon={<Ionicons name="chatbubble" size={20} color="white" />} href="/messages" />
        </View>
        <View style={{ paddingBottom: 32, paddingHorizontal: 20 }}>
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
      </Animated.View>
      <GestureDetector gesture={gesture}>
        <View style={{ flex: 1 }}>
          {selectedTab === 'dog' ? <DogListing /> : <RideListing />}
        </View>
      </GestureDetector>
      <MapButton onPress={() => router.push('/map')}>
        <Small>Carte</Small>
        <Ionicons name="map" size={18} color="white" />
      </MapButton>
    </SafeAreaView>
  );
}
