import { observable } from '@legendapp/state'
import { configureSyncedSupabase, syncedSupabase } from '@legendapp/state/sync-plugins/supabase'
import { v4 as uuidv4 } from "uuid"
import { supabase } from '../supabase'

// provide a function to generate ids locally
const generateId = () => uuidv4()
configureSyncedSupabase({
    generateId
})
const uid = ''

export const dogs$ = observable(syncedSupabase({
  supabase,
  collection: 'dogs',
  // Optional:
  // Select only id and text fields
  select: (from) => from.select('id,name,image'),
  // Filter by the current user
  filter: (select) => select.eq('user_id', uid),
  // Don't allow delete
  actions: ['read', 'create', 'update'],
  // Realtime filter by user_id
  realtime: true,
  // Persist data and pending changes locally
  persist: { name: 'dogs', retrySync: true },
  // Sync only diffs
  changesSince: 'last-sync'
}))
