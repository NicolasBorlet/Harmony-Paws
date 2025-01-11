import { observable } from '@legendapp/state'
import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv'
import { syncedSupabase } from '@legendapp/state/sync-plugins/supabase'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'

// Create user observable
export const user$ = observable(
  syncedSupabase({
    supabase,
    collection: 'users',
    select: from => from.select('id, role_id, first_name, last_name, created_at, last_sign_in_at'),
    filter: (query) => query.eq('uid', session$.get().id),
    persist: {
      plugin: ObservablePersistMMKV,
      name: 'user',
      retrySync: true,
    },
    changesSince: 'last-sync',
    fieldUpdatedAt: 'updated_at',
    fieldCreatedAt: 'created_at',
    fieldDeleted: 'deleted_at' // Ajout de ce champ
  }),
)

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => user$.get(),
  })
}

// Create session observable with only local persistence
export const session$ = observable({
  id: '',
  email: '',
  created_at: '',
  last_sign_in_at: '',
  access_token: '',
})
