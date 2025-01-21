import { observable } from '@legendapp/state'
import {
  configureSyncedSupabase,
  syncedSupabase,
} from '@legendapp/state/sync-plugins/supabase'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from '../supabase'

const generateId = () => uuidv4()
configureSyncedSupabase({
  generateId,
})

export const dogs$ = observable(
  syncedSupabase({
    supabase,
    collection: 'dogs',
    select: from => from.select('id,name,image'),
    filter: select => select.eq('owner_id', 1),
    actions: ['read', 'create', 'update'],
    realtime: true,
    persist: { name: 'dogs', retrySync: true },
    changesSince: 'last-sync',
  }),
)
