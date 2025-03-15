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

export const getLessonStepsById = async (id: number) => {
  const { data, error } = await supabase
    .from('lesson_steps')
    .select('*')
    .eq('lesson_id', id)
    .order('order', { ascending: true })

  if (error) throw handleSupabaseError(error, 'lesson_steps')
  return data
}

export const useLessonStepsById = (id: number) => {
  return useQuery({
    queryKey: ['lessonSteps', id],
    queryFn: () => getLessonStepsById(id),
    ...defaultQueryOptions,
  })
}

export const getStepById = async (id: number) => {
  const { data, error } = await supabase
    .from('lesson_steps')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw handleSupabaseError(error, 'lesson_steps')
  return data
}

export const useStepById = (id: number) => {
  return useQuery({
    queryKey: ['step', id],
    queryFn: () => getStepById(id),
    ...defaultQueryOptions,
  })
}

// Export count of steps by lesson id
export const getCountOfStepsByLessonId = async (id: number) => {
  const { count, error } = await supabase
    .from('lesson_steps')
    .select('*', { count: 'exact', head: true })
    .eq('lesson_id', id)

  if (error) throw handleSupabaseError(error, 'lesson_steps')
  return { count }
}

export const useCountOfStepsByLessonId = (id: number) => {
  return useQuery({
    queryKey: ['countOfSteps', id],
    queryFn: () => getCountOfStepsByLessonId(id),
    ...defaultQueryOptions,
  })
}
