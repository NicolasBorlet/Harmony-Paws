import CustomSplashScreen from '@/components/splash-screen'
import { ActivityStatusProvider } from '@/lib/context/ActivityStatusContext'
import { NotificationProvider } from '@/lib/context/NotificationContext'
import { darkTheme, lightTheme } from '@/lib/theme'
import { translations } from '@/lib/utils/translations'
import { useMMKVDevTools } from '@dev-plugins/react-native-mmkv'
import { useReactQueryDevTools } from '@dev-plugins/react-query'
import {
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
  useFonts,
} from '@expo-google-fonts/montserrat'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getLocales } from 'expo-localization'
import { Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { I18n } from 'i18n-js'
import { useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'
import { SessionProvider } from './ctx'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

// vexo('');

export const i18n = new I18n(translations)

export default function RootLayout() {
  useMMKVDevTools()
  const colorScheme = useColorScheme()
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme
  const [isReady, setIsReady] = useState(false)

  const queryClient = new QueryClient()

  useReactQueryDevTools(queryClient)

  const [loaded, error] = useFonts({
    RoundsBlack: require('../assets/fonts/RoundsBlack.ttf'),
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
  })

  i18n.locale = getLocales()[0].languageCode ?? 'en'
  i18n.enableFallback = true

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      // Wait for 2 seconds to show the splash screen
      setTimeout(() => {
        setIsReady(true)
        SplashScreen.hideAsync()
      }, 2000)
    }
  }, [loaded])

  if (!loaded || !isReady) {
    return <CustomSplashScreen />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer theme={theme}>
            <SessionProvider>
              <BottomSheetModalProvider>
                <ActivityStatusProvider>
                  <Slot />
                </ActivityStatusProvider>
              </BottomSheetModalProvider>
            </SessionProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      </NotificationProvider>
    </QueryClientProvider>
  )
}
