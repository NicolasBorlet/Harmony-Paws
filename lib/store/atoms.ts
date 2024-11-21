import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a storage interface that uses AsyncStorage
const storage = createJSONStorage(() => AsyncStorage);

// Define your atoms here
export const userProfileAtom = atomWithStorage('userProfile', null, storage);
export const isLoadingAtom = atom(false);

// Example of a derived atom
export const userNameAtom = atom(
  (get) => get(userProfileAtom)?.username ?? '',
);
