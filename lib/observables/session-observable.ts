import { Database } from '@/database.types'
import { observable } from '@legendapp/state'
import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv'
import { syncedSupabase } from '@legendapp/state/sync-plugins/supabase'
import { supabase } from '../supabase'

// Définir l'interface User
export interface User {
  age: number | null
  created_at: string | null
  description: string | null
  expo_push_token: string | null
  first_name: string | null
  id: number
  last_name: string | null
  onBoarding: boolean
  place: string | null
  role_id: number | null
  uid: string
  updated_at: string | null
}

type UserRow = Database['public']['Tables']['users']['Row']

// Create user observable
export const user$ = observable(
  syncedSupabase<typeof supabase, UserRow>({
    supabase,
    collection: 'users',
    select: query => query.select('*'),
    filter: query => {
      const {
        data: { user },
      } = supabase.auth.getUser()
      if (!user) return query
      return query.eq('uid', user.id)
    },
    // Retirez la propriété primaryKey pour éviter le mapping par id
    transform: (data: Record<string, UserRow> | UserRow[] | null) => {
      if (!data) return null
      if (Array.isArray(data)) {
        return data[0] as User
      }
      if (typeof data === 'object') {
        return Object.values(data)[0] as User
      }
      return null
    },
    persist: {
      plugin: ObservablePersistMMKV,
      name: 'user',
      retrySync: true,
    },
    changesSince: 'last-sync',
    fieldUpdatedAt: 'updated_at',
    fieldCreatedAt: 'created_at',
    fieldDeleted: 'deleted_at',
  }),
)

// Create session observable with only local persistence
export const session$ = observable({
  id: '',
  email: '',
  created_at: '',
  last_sign_in_at: '',
  access_token: '',
})
