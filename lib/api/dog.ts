import { Database } from '@/database.types'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { getImageUrl } from '../utils/get-image-url'
import {
  Behavior,
  DogDetailsResponse,
  DogListingInterface,
} from './types/interfaces'

export const getDogsFromUserId = async (userId: string) => {
  console.log('userId', userId)

  const { data, error } = await supabase
    .from('dogs')
    .select('id, created_at, updated_at')
    .eq('owner_id', userId)

  if (error) throw error

  const dogsWithImages = await Promise.all(
    data?.map(async dog => ({
      ...dog,
      image: (await getImageUrl(dog.id.toString())) || '',
      created_at: dog.created_at ? new Date(dog.created_at) : new Date(),
      updated_at: dog.updated_at ? new Date(dog.updated_at) : new Date(),
    })),
  )

  return dogsWithImages as DogListingInterface[]
}

// Hook personnalisé pour TanStack Query
export const useDogsFromUserId = (userId: string) => {
  return useQuery({
    queryKey: ['dogs', userId],
    queryFn: () => getDogsFromUserId(userId),
    refetchOnMount: false, // Désactive le refetch auto au montage
    refetchOnWindowFocus: false,
  })
}

export const getPaginatedDogs = async (
  page: number = 0,
  pageSize: number = 10,
) => {
  const from = page * pageSize
  const to = from + pageSize - 1

  const { data, error, count } = await supabase
    .from('dogs')
    .select('id, name, age, sex, created_at, updated_at', { count: 'exact' })
    .range(from, to)
    .order('created_at', { ascending: false })

  if (error) throw error

  const dogsWithImages = await Promise.all(
    data?.map(async dog => ({
      ...dog,
      image: (await getImageUrl(dog.id.toString())) || '',
      created_at: dog.created_at ? new Date(dog.created_at) : new Date(),
      updated_at: dog.updated_at ? new Date(dog.updated_at) : new Date(),
    })),
  )

  return {
    dogs: dogsWithImages as DogListingInterface[],
    totalCount: count || 0,
    hasMore: (count || 0) > to + 1,
  }
}

// Hook avec pagination
export const usePaginatedDogs = (pageSize: number = 5) => {
  return useInfiniteQuery({
    queryKey: ['dogs', 'infinite'],
    queryFn: ({ pageParam = 0 }) => getPaginatedDogs(pageParam, pageSize),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) return undefined
      return allPages.length
    },
    initialPageParam: 0,
  })
}

export const getDogDetails = async (dogId: string) => {
  const { data, error } = (await supabase
    .from('dogs')
    .select(
      `
      id,
      name,
      age,
      sex,
      description,
      dominance,
      created_at,
      updated_at,
      owner:owner_id (
        id,
        first_name,
        last_name
      ),
      breed:breed_id (
        name
      ),
      dog_behaviors(
        id,
        behavior:behavior_id(
          id,
          name
        )
      )
    `,
    )
    .eq('id', dogId)
    .single()) as { data: DogDetailsResponse; error: any }

  if (error) throw error

  // Flatten the nested structure
  const behaviors: Behavior[] =
    data.dog_behaviors?.map(item => ({
      id: item.behavior.id,
      name: item.behavior.name,
    })) || []

  return {
    ...data,
    image: await getImageUrl(dogId),
    behaviors,
    created_at: data.created_at ? new Date(data.created_at) : new Date(),
    updated_at: data.updated_at ? new Date(data.updated_at) : new Date(),
  }
}

export const useDogDetails = (dogId: string) => {
  return useQuery({
    queryKey: ['dog', dogId],
    queryFn: () => getDogDetails(dogId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}

export const createDog = async (
  dog: Database['public']['Tables']['dogs']['Insert'],
) => {
  // Insérer le chien
  const { data: dogData, error: dogError } = await supabase
    .from('dogs')
    .insert({
      ...dog,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()

  if (dogError) throw dogError

  return dogData
}

export const updateDog = async dog => {
  const { data, error } = await supabase
    .from('dogs')
    .update(dog)
    .eq('id', dog.id)
  if (error) throw error
  return data
}

export const deleteDog = async (dogId: string) => {
  const { data, error } = await supabase.from('dogs').delete().eq('id', dogId)
  if (error) throw error
  return data
}

export const addDogBehaviors = async (dogId: number, behaviorIds: number[]) => {
  const behaviors = behaviorIds.map(behaviorId => ({
    dog_id: dogId,
    behavior_id: behaviorId,
  }))

  const { data, error } = await supabase
    .from('dog_behaviors')
    .insert(behaviors)
    .select()

  if (error) throw error
  return data
}

// Modifie la fonction uploadDogImage dans lib/api/dog.ts
export const uploadDogImage = async (dogId: number, imageUri: string) => {
  const formData = new FormData()
  formData.append('dogId', dogId.toString())

  // Pour les fichiers locaux sur mobile
  const filename = imageUri.split('/').pop() || 'image.jpeg'
  formData.append('image', {
    uri: imageUri,
    type: 'image/jpeg',
    name: filename,
  } as any)

  const { data, error } = await supabase.functions.invoke('upload-dog-image', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${(await supabase.auth.getSession())?.data.session?.access_token}`,
    },
  })

  if (error) throw error
  return data
}
