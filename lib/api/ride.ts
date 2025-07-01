import { Database } from '@/database.types'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { rideFilters } from '../observables/filter-observable'
import { user$ } from '../observables/session-observable'
import { supabase } from '../supabase'
import { getRideImageUrl } from '../utils/get-image-url'
import { ActivityVisibility } from './types'
import { ActivityListingInterface } from './types/interfaces'
import {
  defaultMutationOptions,
  defaultQueryOptions,
  formatDate,
  handleSupabaseError,
  logDev,
} from './utils'

interface ActivityInterface {
  place: string | null
  date: string
  duration: string | null
  visibility: 'public' | 'private'
  type: 'forest' | 'city' | 'plage'
  creator_id?: number | null
}

type ActivityStatus = Database['public']['Enums']['activity_status']
type ActivityRow = Database['public']['Tables']['activities']['Row']

export const getPaginatedActivities = async (
  page: number = 0,
  pageSize: number = 10,
  excludeUserId?: number,
) => {
  try {
    const from = page * pageSize
    const to = from + pageSize - 1

    logDev(`Fetching activities from ${from} to ${to}`)

    // Créer la requête de base
    let query = supabase
      .from('activities')
      .select(
        'id, place, date, duration, created_at, updated_at, visibility, type',
        {
          count: 'exact',
        },
      )
      .eq('visibility', ActivityVisibility.PUBLIC)

    // Exclure les activités de l'utilisateur connecté
    if (excludeUserId) {
      query = query.neq('creator_id', excludeUserId)
    }

    // Appliquer les filtres
    const filters = rideFilters.get()
    if (filters.type) {
      query = query.eq('type', filters.type)
    }
    if (filters.date) {
      query = query.eq('date', filters.date)
    }
    if (filters.duration) {
      query = query.eq('duration', filters.duration)
    }

    // Ajouter le tri et la pagination
    const { data, error, count } = await query
      .range(from, to)
      .order('created_at', { ascending: false })

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

    // Process activities with images
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
  const filters = rideFilters.get()
  const userId = user$.get()?.id
  return useInfiniteQuery({
    queryKey: [
      'activities',
      'infinite',
      filters.type,
      filters.date,
      filters.duration,
      userId,
    ],
    queryFn: ({ pageParam = 0 }) =>
      getPaginatedActivities(pageParam, pageSize, userId),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) return undefined
      return allPages.length
    },
    initialPageParam: 0,
    ...defaultQueryOptions,
  })
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

export const createActivity = async (activity: ActivityInterface) => {
  const { data, error } = await supabase.from('activities').insert(activity)
  if (error) throw handleSupabaseError(error, 'activity')
  return data
}

export const useCreateActivity = () => {
  return useMutation({
    mutationFn: createActivity,
    ...defaultMutationOptions,
  })
}

export const getInProgressActivity = async (userId: number) => {
  const { data: userActivities, error: userActivitiesError } = await supabase
    .from('user_activities')
    .select('activity_id')
    .eq('user_id', userId)

  if (userActivitiesError) throw userActivitiesError
  if (!userActivities?.length) return null

  const activityIds = userActivities.map(ua => ua.activity_id)

  const { data: activities, error: activitiesError } = await supabase
    .from('activities')
    .select('*')
    .in('id', activityIds)
    .eq('status', 'in progress')
    .single()

  if (activitiesError) throw activitiesError
  return activities
}
