import { useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { defaultQueryOptions, handleSupabaseError, logDev } from './utils'

interface Breed {
  id: number
  name: string
  created_at?: string | null
  updated_at?: string | null
}

export const getBreeds = async (): Promise<Breed[]> => {
  try {
    // Only select needed fields
    const { data, error } = await supabase
      .from('breeds')
      .select('id, name')
      .order('name', { ascending: true })

    if (error) throw handleSupabaseError(error, 'breeds')
    return data || []
  } catch (error) {
    logDev('Error in getBreeds:', error)
    throw error
  }
}

export const useBreeds = () => {
  return useQuery({
    queryKey: ['breeds'],
    queryFn: getBreeds,
    ...defaultQueryOptions,
  })
}

export const getBreedById = async (id: number): Promise<Breed | null> => {
  try {
    const { data, error } = await supabase
      .from('breeds')
      .select('id, name')
      .eq('id', id)
      .maybeSingle()

    if (error) throw handleSupabaseError(error, 'breed')
    return data
  } catch (error) {
    logDev('Error in getBreedById:', error)
    throw error
  }
}

export const useBreedById = (id: number) => {
  return useQuery({
    queryKey: ['breed', id],
    queryFn: () => getBreedById(id),
    ...defaultQueryOptions,
  })
}
