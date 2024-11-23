import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { Pressable, View, RefreshControl, Text } from "react-native";
import OpacityFadeIn from "../animate/opacity-fadeIn";
import DogItemListing from "./dog-item-listing";
import { useEffect, useState } from "react";
import { Dog, dogApi, DogCardInterface, dogLocalStorage } from "../../lib/api/dog";
import { useSession } from "../../app/ctx";
import * as SQLite from 'expo-sqlite';

export default function DogListing() {
  const [dogs, setDogs] = useState<DogCardInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isLocalData, setIsLocalData] = useState(false);
  const { session } = useSession();
  const db = SQLite.openDatabaseSync('harmonypaws.db');

  const loadDogsFromLocal = async () => {
    console.log('Loading local dogs...');

    try {
      if (!session?.user) return false;
      const localDogs = await dogLocalStorage.getAllLocalDogs(db);
      if (localDogs && localDogs.length > 0) {
        console.log('Loaded local dogs:', localDogs.length);
        setDogs(localDogs);
        setIsLocalData(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error loading local dogs:', error);
      return false;
    }
  };

  const fetchDogsFromSupabase = async (page: number = 0, refresh: boolean = false) => {
    console.log('Fetching dogs from Supabase, page:', page);

    try {
      if (!session?.user) return;
      if (!refresh) {
        setLoadingMore(true);
      }
      const { dogs: newDogs, hasMore: moreAvailable } = await dogApi.getDogs(page);
      
      if (refresh) {
        console.log('Refreshing dogs...');
        console.log('New dogs:', newDogs);
        setDogs(newDogs);
        setIsLocalData(false);
        // Only sync to local storage on manual refresh
        await dogLocalStorage.syncAllDogs(db);
      } else {
        setDogs(prev => [...prev, ...newDogs]);
      }
      
      setHasMore(moreAvailable);
      console.log('Updated hasMore:', moreAvailable);
    } catch (error) {
      console.error('Error fetching dogs:', error);
      setHasMore(false);
    } finally {
      if (!refresh) {
        setLoadingMore(false);
      }
    }
  };

  const loadInitialData = async () => {
    console.log('Loading initial data...');
    
    if (!session?.user) return;
    
    setIsLoading(true);
    try {
      const hasLocalData = await loadDogsFromLocal();
      if (!hasLocalData) {
        // Only fetch from Supabase if no local data exists
        await fetchDogsFromSupabase(0, true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    console.log('Refreshing from Supabase...');

    if (!session?.user) return;

    setIsRefreshing(true);
    setCurrentPage(0);
    setIsLocalData(false); 
    setHasMore(true); 
    await fetchDogsFromSupabase(0, true);
    setIsRefreshing(false);
  };

  const handleLoadMore = async () => {
    // Only allow load more when we're showing Supabase data (not local)
    if (!hasMore || isLoading || isRefreshing || loadingMore || isLocalData) {
      return;
    }

    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    await fetchDogsFromSupabase(nextPage);
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
        <Pressable onPress={() => router.push({
          pathname: "/(auth)/dog/[id]" as const,
          params: { id: item.id.toString(), dogData: JSON.stringify(item) }
        })}>
          <OpacityFadeIn delay={Math.min(index * 200, 1000)}>
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
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loadingMore ? (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text>Loading more...</Text>
        </View>
      ) : null}
    />
  );
}
