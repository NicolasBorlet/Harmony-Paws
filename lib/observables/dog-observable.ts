import { observable } from '@legendapp/state'
import { syncedSupabase } from '@legendapp/state/sync-plugins/supabase'
import { supabase } from '../supabase'

export const dogs$ = observable(syncedSupabase({
  supabase,
  collection: 'dogs',
  // Optional:
  // Select only id and text fields
  select: (from) => from.select('id,name,image'),
  // Filter by the current user
  // filter: (select) => select.eq('user_id', uid),
  // Don't allow delete
  actions: ['read', 'create', 'update'],
  // Realtime filter by user_id
  realtime: true,
  // Persist data and pending changes locally
  persist: { name: 'dogs', retrySync: true },
  // Sync only diffs
  changesSince: 'last-sync'
}))
