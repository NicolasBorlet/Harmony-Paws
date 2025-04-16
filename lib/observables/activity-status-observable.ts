import { Database } from '@/database.types'
import { observable } from '@legendapp/state'
import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv'
import { syncedSupabase } from '@legendapp/state/sync-plugins/supabase'
import { supabase } from '../supabase'
import { user$ } from './session-observable'

type ActivityStatus = Database['public']['Enums']['activity_status']
type ActivityRow = Pick<
  Database['public']['Tables']['activities']['Row'],
  'id' | 'status'
>

// Create activity status observable
export const activityStatus$ = observable(
  syncedSupabase<typeof supabase, ActivityRow>({
    supabase,
    collection: 'activities' as const,
    select: query => query.select('id, status'),
    filter: async query => {
      const userId = user$.get()?.id
      if (!userId) return query

      const { data: userActivities } = await supabase
        .from('user_activities')
        .select('activity_id')
        .eq('user_id', userId)

      if (!userActivities) return query

      const activityIds = userActivities.map(ua => ua.activity_id)
      return query.in('id', activityIds)
    },
    transform: (data: Record<string, ActivityRow> | ActivityRow[] | null) => {
      if (!data) return {}
      if (Array.isArray(data)) {
        return data.reduce(
          (acc, activity) => {
            acc[activity.id] = activity.status
            return acc
          },
          {} as Record<number, ActivityStatus>,
        )
      }
      return {}
    },
    persist: {
      plugin: ObservablePersistMMKV,
      name: 'activity_status',
      retrySync: true,
    },
    changesSince: 'last-sync',
    fieldUpdatedAt: 'updated_at',
    fieldCreatedAt: 'created_at',
    fieldDeleted: 'deleted_at',
  }),
)

// Helper function to get activity status
export const getActivityStatus = (
  activityId: number,
): ActivityStatus | null => {
  return activityStatus$.get()?.[activityId] || null
}

// Helper function to watch activity status changes
export const watchActivityStatus = (
  activityId: number,
  callback: (status: ActivityStatus | null) => void,
) => {
  return activityStatus$.onChange(({ value }) => {
    callback(value?.[activityId] || null)
  })
}
