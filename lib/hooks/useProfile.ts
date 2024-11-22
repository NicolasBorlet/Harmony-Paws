import { useAtom } from 'jotai';
import { userProfileAtom, isLoadingAtom } from '../store/atoms';
import { supabaseApi } from '../api/supabase';
import { useSession } from '@/app/ctx';
import { useEffect } from 'react';

export function useProfile() {
  const { session } = useSession();
  const [profile, setProfile] = useAtom(userProfileAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

  useEffect(() => {
    if (session?.user && !profile) {
      loadProfile();
    }
  }, [session?.user]);

  async function loadProfile() {
    try {
      setIsLoading(true);
      const data = await supabaseApi.profiles.getProfile(session!.user.id);
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateProfile(updates: any) {
    try {
      setIsLoading(true);
      await supabaseApi.profiles.updateProfile({
        id: session!.user.id,
        ...updates,
        updated_at: new Date(),
      });
      await loadProfile(); // Reload the profile after update
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    profile,
    isLoading,
    updateProfile,
    refreshProfile: loadProfile,
  };
}
