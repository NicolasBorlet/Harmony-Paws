import { i18n } from '@/app/_layout'
import DogListing from '@/components/dogListing/dog-listing'
import FilterComponent from '@/components/filter/filter-component'
import HomeHeader from '@/components/home/home-header'
import RideListing from '@/components/rideListing/ride-listing'
import { MapButton } from '@/components/ui/button'
import TabSwitcher from '@/components/ui/TabSwitcher'
import { Small } from '@/components/ui/text'
import { Ionicons } from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import Constants from 'expo-constants'
import * as Device from 'expo-device'
import * as Haptics from 'expo-haptics'
import * as Notifications from 'expo-notifications'
import { router } from 'expo-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Platform, Text, View } from 'react-native'
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  Pressable,
} from 'react-native-gesture-handler'
import { runOnJS, useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets()

  const [selectedTab, setSelectedTab] = useState<'dog' | 'ride'>('dog')
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const headerHeight = useSharedValue(200)
  const startY = useSharedValue(0)
  const scrollY = useSharedValue(0)

  // notifications
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  const gesture = Gesture.Pan()
    .onBegin(event => {
      startY.value = event.absoluteY
    })
    .onUpdate(event => {
      const deltaY = startY.value - event.absoluteY
      headerHeight.value = Math.max(
        100, // hauteur minimum
        Math.min(200, 200 - deltaY), // hauteur maximum
      )
    })
    .onEnd(event => {
      // Gestion du swipe horizontal existant
      if (Math.abs(event.translationX) > 50) {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light)
        if (event.translationX > 0) {
          runOnJS(setSelectedTab)('dog')
        } else {
          runOnJS(setSelectedTab)('ride')
        }
      }
    })

  const onTabChange = useCallback((tab: 'dog' | 'ride') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setSelectedTab(tab)
  }, [])

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch((error: any) => setExpoPushToken(`${error}`));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <GestureHandlerRootView
      style={{ flex: 1, paddingTop: insets.top, backgroundColor: 'white' }}
    >
      <View>
        <View style={{ paddingHorizontal: 16 }}>
          <HomeHeader scrollY={scrollY} />
        </View>
        <View
          style={{
            paddingTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <TabSwitcher
            selectedTab={selectedTab}
            onTabChange={onTabChange}
            language={i18n.locale as 'fr' | 'en'}
          />
          <Pressable onPress={handlePresentModalPress}>
            <Ionicons
              name='filter'
              size={21}
              color='black'
              style={{ height: 48, width: 48 }}
            />
          </Pressable>
        </View>
      </View>
      <Text>Your Expo push token: {expoPushToken}</Text>
      <GestureDetector gesture={gesture}>
        <View style={{ flex: 1 }}>
          {selectedTab === 'dog' ? <DogListing scrollY={scrollY}/> : <RideListing />}
        </View>
      </GestureDetector>
      <MapButton onPress={() => router.push('/map')}>
        <Small>{i18n.t('map')}</Small>
        <Ionicons name='map' size={18} color='white' />
      </MapButton>
      <FilterComponent
        bottomSheetModalRef={bottomSheetModalRef}
        handleSheetChanges={handleSheetChanges}
      />
    </GestureHandlerRootView>
  )
}
