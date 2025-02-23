import { useMutation, useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { Behavior } from './types'

/**
 * Get all behaviors
 * @returns {Promise<Behavior[]>}
 */
export const getBehaviors = async () => {
  const { data, error } = await supabase.from('behavior').select('*')
  if (error) throw error
  return data
}

export const useBehaviors = () => {
  return useQuery({
    queryKey: ['behaviors'],
    queryFn: getBehaviors,
  })
}

/**
 * Get a behavior by id
 * @param {number} id - The id of the behavior
 * @returns {Promise<Behavior>}
 */
export const getBehaviorById = async (id: number) => {
  const { data, error } = await supabase
    .from('behavior')
    .select('*')
    .eq('id', id)
  if (error) throw error
  return data
}

export const useBehaviorById = (id: number) => {
  return useQuery({
    queryKey: ['behavior', id],
    queryFn: () => getBehaviorById(id),
  })
}

/**
 * Create a behavior
 * @param {Behavior} behavior - The behavior to create
 * @returns {Promise<Behavior>}
 */
export const createBehavior = async (behavior: Behavior) => {
  const { data, error } = await supabase.from('behavior').insert(behavior)
  if (error) throw error
  return data
}

export const useCreateBehavior = () => {
  return useMutation({
    mutationFn: createBehavior,
  })
}

/**
 * Link a behavior to a dog
 * @param {number} dogId - The id of the dog
 * @param {number} behaviorId - The id of the behavior
 * @returns {Promise<Behavior>}
 */
export const linkBehaviorToDog = async (dogId: number, behaviorId: number) => {
  const { data, error } = await supabase.from('dog_behaviors').insert({
    dog_id: dogId,
    behavior_id: behaviorId,
  })
  if (error) throw error
  return data
}

export const useLinkBehaviorToDog = () => {
  return useMutation({
    mutationFn: linkBehaviorToDog,
  })
}
