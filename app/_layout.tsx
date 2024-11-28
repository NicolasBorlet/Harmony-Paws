import { translations } from '@/lib/utils/translations';
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
} from '@expo-google-fonts/montserrat';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { getLocales } from 'expo-localization';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SQLiteProvider, type SQLiteDatabase } from 'expo-sqlite';
import { I18n } from 'i18n-js';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SessionProvider } from './ctx';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "login",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const i18n = new I18n(translations);

export default function RootLayout() {
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
  });

  i18n.locale = getLocales()[0].languageCode ?? 'en';
  i18n.enableFallback = true;

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SQLiteProvider databaseName="harmonypaws.db" onInit={migrateDbIfNeeded}>
        <SessionProvider>
          <BottomSheetModalProvider>
            <Slot />
          </BottomSheetModalProvider>
        </SessionProvider>
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  try {
    // Create ENUM-like tables since SQLite doesn't support ENUMs
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS activity_visibility (
        value TEXT PRIMARY KEY
      );
      INSERT OR IGNORE INTO activity_visibility (value) VALUES ('private'), ('public');

      CREATE TABLE IF NOT EXISTS dog_sex (
        value TEXT PRIMARY KEY
      );
      INSERT OR IGNORE INTO dog_sex (value) VALUES ('male'), ('female');

      CREATE TABLE IF NOT EXISTS activity_type (
        value TEXT PRIMARY KEY
      );
      INSERT OR IGNORE INTO activity_type (value) VALUES ('forest'), ('city'), ('plage');

      CREATE TABLE IF NOT EXISTS dog_dominance (
        value TEXT PRIMARY KEY
      );
      INSERT OR IGNORE INTO dog_dominance (value) VALUES ('neutral'), ('dominant'), ('dominated');
    `);

    // Create main tables
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uid TEXT,
        role_id INTEGER,
        age INTEGER,
        place TEXT,
        description TEXT,
        first_name TEXT,
        last_name TEXT,
        onBoarding INTEGER,
        created_at TEXT,
        updated_at TEXT
      );

      CREATE TABLE IF NOT EXISTS user_formations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        formation_id INTEGER,
        created_at TEXT,
        updated_at TEXT
      );

      CREATE TABLE IF NOT EXISTS opinions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        formation_id INTEGER,
        grade INTEGER,
        description TEXT,
        created_at TEXT,
        updated_at TEXT
      );

      CREATE TABLE IF NOT EXISTS formations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        animator_name TEXT,
        price INTEGER,
        description TEXT,
        place TEXT,
        date TEXT,
        participant_limit INTEGER,
        duration INTEGER,
        created_at TEXT,
        updated_at TEXT
      );

      CREATE TABLE IF NOT EXISTS steps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        activity_id INTEGER,
        place TEXT,
        estimated_hour TEXT,
        created_at TEXT,
        updated_at TEXT
      );

      CREATE TABLE IF NOT EXISTS activities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        creator_id INTEGER,
        place TEXT,
        visibility TEXT,
        type TEXT,
        date TEXT,
        duration TEXT,
        created_at TEXT,
        updated_at TEXT,
        FOREIGN KEY (visibility) REFERENCES activity_visibility(value),
        FOREIGN KEY (type) REFERENCES activity_type(value)
      );

      CREATE TABLE IF NOT EXISTS user_activities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        activity_id INTEGER,
        created_at TEXT,
        updated_at TEXT
      );

      CREATE TABLE IF NOT EXISTS medical_form (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        dog_id INTEGER
      );

      CREATE TABLE IF NOT EXISTS dogs (
        id TEXT PRIMARY KEY,
        owner_id TEXT,
        name TEXT,
        breed TEXT,
        description TEXT,
        dominance TEXT,
        sex TEXT,
        age INTEGER,
        image TEXT,
        created_at TEXT,
        updated_at TEXT,
        FOREIGN KEY (dominance) REFERENCES dog_dominance(value),
        FOREIGN KEY (sex) REFERENCES dog_sex(value)
      );
    `);

    console.log('Database migration completed successfully');
  } catch (error) {
    console.error('Error during database migration:', error);
    throw error;
  }
}
