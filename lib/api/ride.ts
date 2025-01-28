import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { getRideImageUrl } from '../utils/get-image-url'
import { ActivityVisibility } from './types'
import { ActivityListingInterface } from './types/interfaces'

export const getPaginatedActivities = async (
  page: number = 0,
  pageSize: number = 10,
) => {
  try {
    const from = page * pageSize
    const to = from + pageSize - 1

    console.log(`Fetching activities from ${from} to ${to}`)

    const { data, error, count } = await supabase
      .from('activities')
      .select('id, place, date, duration, created_at, updated_at, visibility', {
        count: 'exact',
      })
      .range(from, to)
      .order('created_at', { ascending: false })
      .eq('visibility', ActivityVisibility.PUBLIC)

    if (error) {
      console.error('Supabase error:', error)
      throw new Error(`Failed to fetch activities: ${error.message}`)
    }

    console.log('Query parameters:', {
      from,
      to,
      visibility: ActivityVisibility.PUBLIC,
    })
    console.log('Raw response:', { data, count, error })

    if (!data) {
      console.warn('No data returned from Supabase')
      return {
        activities: [],
        totalCount: 0,
        hasMore: false,
      }
    } else {
      console.log('Data fetched successfully')
      console.log(data)
    }

    // Ajouter les images pour chaque activité
    const activitiesWithImages = await Promise.all(
      data?.map(async activity => ({
        ...activity,
        image: (await getRideImageUrl(activity.id.toString())) || '',
        date: activity.date ? new Date(activity.date) : new Date(),
        created_at: activity.created_at
          ? new Date(activity.created_at)
          : new Date(),
        updated_at: activity.updated_at
          ? new Date(activity.updated_at)
          : new Date(),
      })) || [],
    )

    return {
      activities: activitiesWithImages as ActivityListingInterface[],
      totalCount: count || 0,
      hasMore: (count || 0) > to + 1,
    }
  } catch (error) {
    console.error('Error in getPaginatedActivities:', error)
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
  })
}

export const getActivityById = async (id: number) => {
  const { data, error } = await supabase
    .from('activities')
    .select(
      `
      *,
      creator:creator_id (
        id,
        first_name,
        last_name,
        created_at,
        updated_at      
      ),
      steps (
        id,
        place,
        estimated_hour,
        created_at,
        updated_at
      ),
      user_activities (
        user:user_id (
          id,
          first_name,
          last_name,
          place,
          created_at,
          updated_at
        )
      )
    `,
    )
    .eq('id', id)
    .single()

  if (error) throw error

  // Transform dates and add image
  const transformedData = {
    ...data,
    image: await getRideImageUrl(data.id.toString()),
    date: data.date ? new Date(data.date) : new Date(),
    created_at: data.created_at ? new Date(data.created_at) : new Date(),
    updated_at: data.updated_at ? new Date(data.updated_at) : new Date(),
    // Add creator info
    creator: data.creator
      ? {
          ...data.creator,
          created_at: data.creator.created_at
            ? new Date(data.creator.created_at)
            : new Date(),
          updated_at: data.creator.updated_at
            ? new Date(data.creator.updated_at)
            : new Date(),
        }
      : null,
    // Flatten participants array and get their images
    participants: await Promise.all(
      data.user_activities?.map(async ua => ({
        ...ua.user,
        // image: (await getRideImageUrl(ua.user.id.toString())) || '',
        created_at: ua.user.created_at
          ? new Date(ua.user.created_at)
          : new Date(),
        updated_at: ua.user.updated_at
          ? new Date(ua.user.updated_at)
          : new Date(),
      })) || [],
    ),
    // Transform dates in steps
    steps:
      data.steps?.map(step => ({
        ...step,
        created_at: step.created_at ? new Date(step.created_at) : new Date(),
        updated_at: step.updated_at ? new Date(step.updated_at) : new Date(),
      })) || [],
  }

  return { data: transformedData, error: null }
}

export const useActivityById = (id: number) => {
  return useQuery({
    queryKey: ['activity', id],
    queryFn: () => getActivityById(id),
  })
}
