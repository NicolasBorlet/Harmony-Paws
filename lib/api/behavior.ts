import { useMutation, useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { defaultQueryOptions, handleSupabaseError, logDev } from './utils'

// Define the correct Behavior type for the database
interface BehaviorInput {
  name: string
}

interface BehaviorOutput {
  id: number
  name: string
  created_at: string | null
  updated_at: string | null
}

interface DogBehaviorLink {
  id: number
  dog_id: number
  behavior_id: number
  created_at: string | null
  updated_at: string | null
}

/**
 * Get all behaviors
 * @returns {Promise<BehaviorOutput[]>}
 */
export const getBehaviors = async () => {
  try {
    // Only select fields we need
    const { data, error } = await supabase
      .from('behavior')
      .select('id, name, created_at, updated_at')

    if (error) throw handleSupabaseError(error, 'behaviors')
    return data || []
  } catch (error) {
    logDev('Error in getBehaviors:', error)
    throw error
  }
}

export const useBehaviors = () => {
  return useQuery({
    queryKey: ['behaviors'],
    queryFn: getBehaviors,
    ...defaultQueryOptions,
  })
}

/**
 * Get a behavior by id
 * @param {number} id - The id of the behavior
 * @returns {Promise<BehaviorOutput>}
 */
export const getBehaviorById = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from('behavior')
      .select('id, name, created_at, updated_at')
      .eq('id', id)
      .maybeSingle()

    if (error) throw handleSupabaseError(error, 'behavior')
    if (!data) throw new Error(`Behavior with id ${id} not found`)

    return data
  } catch (error) {
    logDev('Error in getBehaviorById:', error)
    throw error
  }
}

export const useBehaviorById = (id: number) => {
  return useQuery({
    queryKey: ['behavior', id],
    queryFn: () => getBehaviorById(id),
    ...defaultQueryOptions,
  })
}

/**
 * Create a behavior
 * @param {BehaviorInput} behavior - The behavior to create
 * @returns {Promise<BehaviorOutput>}
 */
export const createBehavior = async (behavior: BehaviorInput) => {
  try {
    const { data, error } = await supabase
      .from('behavior')
      .insert(behavior)
      .select()
      .single()

    if (error) throw handleSupabaseError(error, 'behavior creation')
    return data
  } catch (error) {
    logDev('Error in createBehavior:', error)
    throw error
  }
}

export const useCreateBehavior = () => {
  return useMutation({
    mutationFn: createBehavior,
  })
}

/**
 * Link a behavior to a dog
 * @param {Object} params - The parameters object
 * @param {number} params.dogId - The id of the dog
 * @param {number} params.behaviorId - The id of the behavior
 * @returns {Promise<DogBehaviorLink>}
 */
export const linkBehaviorToDog = async ({
  dogId,
  behaviorId,
}: {
  dogId: number
  behaviorId: number
}) => {
  try {
    const { data, error } = await supabase
      .from('dog_behaviors')
      .insert({
        dog_id: dogId,
        behavior_id: behaviorId,
      })
      .select()
      .single()

    if (error) throw handleSupabaseError(error, 'behavior link')
    return data
  } catch (error) {
    logDev('Error in linkBehaviorToDog:', error)
    throw error
  }
}

export const useLinkBehaviorToDog = () => {
  return useMutation({
    mutationFn: linkBehaviorToDog,
  })
}
