import { useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { defaultQueryOptions, handleSupabaseError } from './utils'

export const getLessonById = async (id: number) => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw handleSupabaseError(error, 'lessons')
  return data
}

export const useLessonById = (id: number) => {
  return useQuery({
    queryKey: ['lesson', id],
    queryFn: () => getLessonById(id),
    ...defaultQueryOptions,
  })
}
