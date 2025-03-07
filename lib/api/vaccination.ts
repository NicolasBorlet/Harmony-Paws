import { Database } from '@/database.types'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { defaultQueryOptions, handleSupabaseError, logDev } from './utils'

type Vaccination = Database['public']['Tables']['vaccinations']['Row']

const getDogVaccinations = async (dogId: string, limit?: number) => {
  console.log('dogId', dogId)
  try {
    let query = supabase
      .from('vaccinations')
      .select('*')
      .eq('dog_id', dogId)
      .order('date_administered', { ascending: false })

    if (limit && limit > 0) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) throw handleSupabaseError(error, 'dog vaccinations')
    return data as Vaccination[]
  } catch (error) {
    logDev('Error in getDogVaccinations:', error)
    throw error
  }
}

export const useDogVaccinations = (dogId: string, limit?: number) => {
  return useQuery({
    queryKey: ['dog_vaccinations', dogId, limit],
    queryFn: () => getDogVaccinations(dogId, limit),
    ...defaultQueryOptions,
  })
}
