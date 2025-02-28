import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { getRideImageUrl } from '../utils/get-image-url'
import { ActivityVisibility } from './types'
import { ActivityListingInterface } from './types/interfaces'
import {
  defaultQueryOptions,
  formatDate,
  handleSupabaseError,
  logDev,
} from './utils'

export const getPaginatedActivities = async (
  page: number = 0,
  pageSize: number = 10,
) => {
  try {
    const from = page * pageSize
    const to = from + pageSize - 1

    logDev(`Fetching activities from ${from} to ${to}`)

    // Only select fields we actually need
    const { data, error, count } = await supabase
      .from('activities')
      .select('id, place, date, duration, created_at, updated_at, visibility', {
        count: 'exact',
      })
      .range(from, to)
      .order('created_at', { ascending: false })
      .eq('visibility', ActivityVisibility.PUBLIC)

    if (error) {
      throw handleSupabaseError(error, 'activities')
    }

    if (!data || data.length === 0) {
      return {
        activities: [],
        totalCount: 0,
        hasMore: false,
      }
    }

    // Traiter les images individuellement avec Edge Functions
    const activitiesWithImages = await Promise.all(
      data.map(async activity => ({
        ...activity,
        image: await getRideImageUrl(activity.id.toString()),
        date: formatDate(activity.date),
        created_at: formatDate(activity.created_at),
        updated_at: formatDate(activity.updated_at),
      })),
    )

    return {
      activities: activitiesWithImages as ActivityListingInterface[],
      totalCount: count || 0,
      hasMore: (count || 0) > to + 1,
    }
  } catch (error) {
    logDev('Error in getPaginatedActivities:', error)
    throw error
  }
}

export const usePaginatedActivities = (pageSize: number = 5) => {
  return useInfiniteQuery({
    queryKey: ['activities', 'infinite'],
    queryFn: ({ pageParam = 0 }) => getPaginatedActivities(pageParam, pageSize),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) return undefined
      return allPages.length
    },
    initialPageParam: 0,
    ...defaultQueryOptions,
  })
}

// Définir des types corrects pour les entités
interface ActivityDetails {
  id: number
  place: string
  date: string
  duration: string
  created_at: string
  updated_at: string
  visibility: string
  type: string
  creator?: {
    id: number
    first_name: string
    last_name: string
    created_at: string
    updated_at: string
  }
  steps?: Array<{
    id: number
    place: string
    estimated_hour: string
    created_at: string
    updated_at: string
  }>
  user_activities?: Array<{
    user: {
      id: number
      first_name: string
      last_name: string
      place: string
      created_at: string
      updated_at: string
    }
  }>
}

export const getActivityById = async (id: number) => {
  try {
    // Only select necessary fields including creator_id
    const { data: activity, error } = await supabase
      .from('activities')
      .select(
        `
        id, place, date, duration, created_at, updated_at, visibility, type, creator_id
      `,
      )
      .eq('id', id)
      .single()

    if (error) throw handleSupabaseError(error, 'activity')

    // Get creator information if creator_id exists
    let creator = null
    if (activity.creator_id) {
      const { data: creatorData } = await supabase
        .from('users')
        .select('id, first_name, last_name, created_at, updated_at')
        .eq('id', activity.creator_id)
        .maybeSingle()

      creator = creatorData
    }

    // Get steps
    const { data: steps } = await supabase
      .from('steps')
      .select('id, place, estimated_hour, created_at, updated_at')
      .eq('activity_id', id)

    // Get participants
    const { data: userActivities } = await supabase
      .from('user_activities')
      .select('user_id')
      .eq('activity_id', id)

    // Get user details for participants
    const userIds = userActivities?.map(ua => ua.user_id) || []
    const { data: participants } = await supabase
      .from('users')
      .select('id, first_name, last_name, place, created_at, updated_at')
      .in('id', userIds.length > 0 ? userIds : [-1]) // Use -1 if no users to avoid empty array error

    // Transform dates and add image
    const transformedData = {
      ...activity,
      image: await getRideImageUrl(activity.id.toString()),
      date: formatDate(activity.date),
      created_at: formatDate(activity.created_at),
      updated_at: formatDate(activity.updated_at),
      // Add creator info
      creator: creator
        ? {
            ...creator,
            created_at: formatDate(creator.created_at),
            updated_at: formatDate(creator.updated_at),
          }
        : null,
      // Add participants
      participants: (participants || []).map(user => ({
        ...user,
        image: '', // Vous pouvez ajouter la récupération d'images ici si nécessaire
        created_at: formatDate(user.created_at),
        updated_at: formatDate(user.updated_at),
      })),
      // Transform dates in steps
      steps: (steps || []).map(step => ({
        ...step,
        created_at: formatDate(step.created_at),
        updated_at: formatDate(step.updated_at),
      })),
    }

    return { data: transformedData, error: null }
  } catch (error) {
    logDev('Error in getActivityById:', error)
    throw error
  }
}

export const useActivityById = (id: number) => {
  return useQuery({
    queryKey: ['activity', id],
    queryFn: () => getActivityById(id),
    ...defaultQueryOptions,
  })
}
