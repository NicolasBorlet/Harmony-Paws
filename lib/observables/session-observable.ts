import { observable } from '@legendapp/state'
import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv'
import { syncedSupabase } from '@legendapp/state/sync-plugins/supabase'
import { supabase } from '../supabase'

// Create user observable
export const user$ = observable(
  syncedSupabase({
    supabase,
    collection: 'users',
    select: from => from.select('id, email, token, created_at, last_sign_in_at'),
    // Persist locally
    filter: select => select.eq('uid', session$.get().id),
    persist: {
      plugin: ObservablePersistMMKV,
      name: 'user',
      retrySync: true, // Retry sync after reload
    },
    changesSince: 'last-sync', // Sync only diffs
    fieldUpdatedAt: 'updated_at',
    fieldCreatedAt: 'created_at',
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
