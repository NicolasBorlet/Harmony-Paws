import { useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'
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

    return {
      activities: data.map(ride => ({
        ...ride,
        date: ride.date ? new Date(ride.date) : new Date(),
        created_at: ride.created_at ? new Date(ride.created_at) : new Date(),
        updated_at: ride.updated_at ? new Date(ride.updated_at) : new Date(),
      })) as ActivityListingInterface[],
      totalCount: count || 0,
      hasMore: (count || 0) > to + 1,
    }
  } catch (error) {
    console.error('Error in getPaginatedActivities:', error)
    throw error
  }
}

export const usePaginatedActivities = (
  page: number = 0,
  pageSize: number = 10,
) => {
  return useQuery({
    queryKey: ['activities', 'paginated', page, pageSize],
    queryFn: () => getPaginatedActivities(page, pageSize),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}
