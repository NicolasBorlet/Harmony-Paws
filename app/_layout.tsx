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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getLocales } from 'expo-localization'
import { Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { I18n } from 'i18n-js'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'
import { SessionProvider } from './ctx'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export const i18n = new I18n(translations)

export default function RootLayout() {
  useMMKVDevTools();

  const queryClient = new QueryClient()

  useReactQueryDevTools(queryClient);

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
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SessionProvider>
          <BottomSheetModalProvider>
            <Slot />
          </BottomSheetModalProvider>
        </SessionProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  )
}