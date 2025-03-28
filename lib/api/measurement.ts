import { useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { defaultQueryOptions, handleSupabaseError } from './utils'

export const getHeightMeasurementsByDogId = async (dogId: string) => {
  const { data, error } = await supabase
    .from('dog_measurements')
    .select('id, height, date')
    .eq('dog_id', dogId)
    .order('date', { ascending: false })

  if (error) throw handleSupabaseError(error, 'dog_measurements')
  return data
}

export const useMeasurementsByDogId = (dogId: string) => {
  return useQuery({
    queryKey: ['measurements', dogId],
    queryFn: () => getHeightMeasurementsByDogId(dogId),
    ...defaultQueryOptions,
  })
}

export const getWeightMeasurementsByDogId = async (dogId: string) => {
  const { data, error } = await supabase
    .from('dog_measurements')
    .select('id, weight, date')
    .eq('dog_id', dogId)
    .order('date', { ascending: false })

  if (error) throw handleSupabaseError(error, 'dog_measurements')
  return data
}

export const useWeightMeasurementsByDogId = (dogId: string) => {
  return useQuery({
    queryKey: ['weight_measurements', dogId],
    queryFn: () => getWeightMeasurementsByDogId(dogId),
    ...defaultQueryOptions,
  })
}
