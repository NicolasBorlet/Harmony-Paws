import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { Pressable, View, RefreshControl, Text } from "react-native";
import OpacityFadeIn from "../animate/opacity-fadeIn";
import DogItemListing from "./dog-item-listing";
import { useEffect, useState } from "react";
import { Dog, dogApi, dogLocalStorage } from "../../lib/api/dog";
import { useSession } from "../../app/ctx";
import * as SQLite from 'expo-sqlite';

export default function DogListing() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { session } = useSession();
  const db = SQLite.openDatabaseSync('harmonypaws.db');

  const loadDogsFromLocal = async () => {
    console.log('Loading local dogs...');

    try {
      if (!session?.user) return;
      const localDogs = await dogLocalStorage.getAllLocalDogs(db);
      if (localDogs && localDogs.length > 0) {
        console.log('Loaded local dogs:', localDogs);

        setDogs(localDogs);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error loading local dogs:', error);
      return false;
    }
  };

  const fetchDogsFromSupabase = async () => {
    console.log('Fetching dogs from Supabase...');

    try {
      if (!session?.user) return;
      setIsLoading(true);
      const supabaseDogs = await dogApi.getDogs();
      await dogLocalStorage.syncAllDogs(db);

      console.log('Fetched dogs from Supabase:', supabaseDogs);

      setDogs(supabaseDogs);
    } catch (error) {
      console.error('Error fetching dogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadInitialData = async () => {
    console.log('Loading initial data...');
    
    if (!session?.user) return;
    
    setIsLoading(true);
    try {
      const hasLocalData = await loadDogsFromLocal();
      if (!hasLocalData) {
        await fetchDogsFromSupabase();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    console.log('Refreshing...');

    if (!session?.user) return;

    setIsRefreshing(true);
    await fetchDogsFromSupabase();
    setIsRefreshing(false);
  };

  useEffect(() => {
    if (session?.user) {
      loadInitialData();
    }
  }, [session?.user?.id]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <OpacityFadeIn>
          <View>
            <Text>Loading...</Text>
          </View>
        </OpacityFadeIn>
      </View>
    );
  }

  return (
    <FlashList
      data={dogs}
      renderItem={({ item, index }) => (
        <Pressable onPress={() => router.push(`/dog/${item.id}`)}>
          <OpacityFadeIn delay={index * 200}>
            <DogItemListing dogCardData={item} />
          </OpacityFadeIn>
        </Pressable>
      )}
      estimatedItemSize={10}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
      }
    />
  );
}
