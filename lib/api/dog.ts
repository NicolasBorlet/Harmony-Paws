import { Database } from '@/database.types'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { getImageUrl } from '../utils/get-image-url'
import {
  Behavior,
  DogDetailsResponse,
  DogListingInterface,
  DogUpdateInterface,
} from './types/interfaces'
import {
  defaultQueryOptions,
  formatDate,
  getAuthToken,
  handleSupabaseError,
  logDev,
} from './utils'

export const getDogsFromUserId = async (userId: string) => {
  logDev('Fetching dogs for userId:', userId)

  try {
    // Select only needed fields
    const { data, error } = await supabase
      .from('dogs')
      .select('id, created_at, updated_at')
      .eq('owner_id', userId)

    if (error) throw handleSupabaseError(error, 'dogs')
    if (!data || data.length === 0) return []

    // Process dog data with image URLs
    const dogsWithImages = await Promise.all(
      data.map(async dog => ({
        ...dog,
        // Utiliser Edge Function pour récupérer l'image
        image: await getImageUrl(dog.id.toString()),
        created_at: formatDate(dog.created_at),
        updated_at: formatDate(dog.updated_at),
      })),
    )

    return dogsWithImages as DogListingInterface[]
  } catch (error) {
    logDev('Error in getDogsFromUserId:', error)
    throw error
  }
}

// Hook with consistent query options
export const useDogsFromUserId = (userId: string) => {
  return useQuery({
    queryKey: ['dogs', userId],
    queryFn: () => getDogsFromUserId(userId),
    ...defaultQueryOptions,
  })
}

export const getPaginatedDogs = async (
  page: number = 0,
  pageSize: number = 10,
) => {
  try {
    const from = page * pageSize
    const to = from + pageSize - 1

    // Only select required fields
    const { data, error, count } = await supabase
      .from('dogs')
      .select('id, name, age, sex, created_at, updated_at', { count: 'exact' })
      .range(from, to)
      .order('created_at', { ascending: false })

    if (error) throw handleSupabaseError(error, 'dogs')
    if (!data || data.length === 0) {
      return {
        dogs: [],
        totalCount: 0,
        hasMore: false,
      }
    }

    // Process dogs with images - use Edge Functions for each dog
    const dogsWithImages = await Promise.all(
      data.map(async dog => ({
        ...dog,
        // Utiliser Edge Function pour récupérer l'image
        image: await getImageUrl(dog.id.toString()),
        created_at: formatDate(dog.created_at),
        updated_at: formatDate(dog.updated_at),
      })),
    )

    return {
      dogs: dogsWithImages as DogListingInterface[],
      totalCount: count || 0,
      hasMore: (count || 0) > to + 1,
    }
  } catch (error) {
    logDev('Error in getPaginatedDogs:', error)
    throw error
  }
}

// Hook with consistent options
export const usePaginatedDogs = (pageSize: number = 5) => {
  return useInfiniteQuery({
    queryKey: ['dogs', 'infinite'],
    queryFn: ({ pageParam = 0 }) => getPaginatedDogs(pageParam, pageSize),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) return undefined
      return allPages.length
    },
    initialPageParam: 0,
    ...defaultQueryOptions,
  })
}

export const getDogDetails = async (dogId: string) => {
  try {
    // Only select fields that are needed
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

    if (error) throw handleSupabaseError(error, 'dog')

    // Flatten the nested structure and ensure we match the Behavior interface
    const behaviors: Behavior[] =
      data.dog_behaviors?.map(item => ({
        id: item.behavior.id,
        name: item.behavior.name,
        // Convert strings to Date objects to match BaseEntity in Behavior
        created_at: formatDate(data.created_at),
        updated_at: formatDate(data.updated_at),
      })) || []

    return {
      ...data,
      // Revenir à l'utilisation de Edge Function sans spécifier le bucket
      image: await getImageUrl(dogId),
      behaviors,
      created_at: formatDate(data.created_at),
      updated_at: formatDate(data.updated_at),
    }
  } catch (error) {
    logDev('Error in getDogDetails:', error)
    throw error
  }
}

export const useDogDetails = (dogId: string) => {
  return useQuery({
    queryKey: ['dog', dogId],
    queryFn: () => getDogDetails(dogId),
    ...defaultQueryOptions,
  })
}

export const createDog = async (
  dog: Database['public']['Tables']['dogs']['Insert'],
) => {
  try {
    const now = new Date().toISOString()

    // Insérer le chien
    const { data: dogData, error: dogError } = await supabase
      .from('dogs')
      .insert({
        ...dog,
        created_at: now,
        updated_at: now,
      })
      .select()

    if (dogError) throw handleSupabaseError(dogError, 'dog')
    return dogData
  } catch (error) {
    logDev('Error in createDog:', error)
    throw error
  }
}

export const updateDog = async (dog: DogUpdateInterface) => {
  try {
    const { data, error } = await supabase
      .from('dogs')
      .update({
        ...dog,
        updated_at: new Date().toISOString(),
      })
      .eq('id', dog.id)
      .select()

    if (error) throw handleSupabaseError(error, 'dog')
    return data
  } catch (error) {
    logDev('Error in updateDog:', error)
    throw error
  }
}

export const deleteDog = async (dogId: string) => {
  try {
    const { data, error } = await supabase
      .from('dogs')
      .delete()
      .eq('id', dogId)
      .select()

    if (error) throw handleSupabaseError(error, 'dog')
    return data
  } catch (error) {
    logDev('Error in deleteDog:', error)
    throw error
  }
}

export const addDogBehaviors = async (dogId: number, behaviorIds: number[]) => {
  try {
    const behaviors = behaviorIds.map(behaviorId => ({
      dog_id: dogId,
      behavior_id: behaviorId,
    }))

    const { data, error } = await supabase
      .from('dog_behaviors')
      .insert(behaviors)
      .select()

    if (error) throw handleSupabaseError(error, 'dog behaviors')
    return data
  } catch (error) {
    logDev('Error in addDogBehaviors:', error)
    throw error
  }
}

export const uploadDogImage = async (dogId: number, imageUri: string) => {
  try {
    const formData = new FormData()
    formData.append('dogId', dogId.toString())

    // Pour les fichiers locaux sur mobile
    const filename = imageUri.split('/').pop() || 'image.jpeg'
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: filename,
    } as any)

    // Get token once and reuse
    const authToken = await getAuthToken()

    const { data, error } = await supabase.functions.invoke(
      'upload-dog-image',
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    )

    if (error) throw error
    return data
  } catch (error) {
    logDev('Error in uploadDogImage:', error)
    throw error
  }
}
