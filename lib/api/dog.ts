import { supabase } from '../supabase'
import { DogListingInterface } from './types/interfaces'

export const getDogsFromUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from('dogs')
    .select('id, name, age, sex, image, created_at, updated_at')
    .eq('owner_id', userId)

  if (error) throw error

  return data?.map(dog => ({
    ...dog,
    created_at: dog.created_at ? new Date(dog.created_at) : new Date(),
    updated_at: dog.updated_at ? new Date(dog.updated_at) : new Date(),
  })) as DogListingInterface[]
}

// Hook personnalisé pour TanStack Query
import { useQuery } from '@tanstack/react-query'

export const useDogsFromUserId = (userId: string) => {
  return useQuery({
    queryKey: ['dogs', userId],
    queryFn: () => getDogsFromUserId(userId),
  })
}