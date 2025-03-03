import { Tables } from '@/database.types'
import { observable } from '@legendapp/state'
import { customSynced, supabase } from '../supabase'

console.log('Initializing formations$ observable...')

// Essayons d'abord directement avec l'API Supabase pour voir si ça fonctionne
async function fetchFormationsDirectly() {
  try {
    const { data, error } = await supabase.from('formations').select('*')
    console.log('Direct formations fetch result:', { data, error })
    if (data) {
      // Transformer les données pour être dans le format attendu par l'observable (objets indexés par id)
      const formattedData = data.reduce<Record<string, Tables<'formations'>>>(
        (acc, item) => {
          acc[item.id.toString()] = item
          return acc
        },
        {},
      )
      console.log('Formatted formations data:', formattedData)
      // Mettre à jour l'observable avec les données
      formations$.set(formattedData)
    }
  } catch (e) {
    console.error('Error fetching formations directly:', e)
  }
}

export const formations$ = observable(
  customSynced({
    supabase,
    collection: 'formations',
    select: from => {
      console.log('formations$ select function called')
      return from.select('*') // Changed from just 'id' to '*' to select all fields
    },
    actions: ['read', 'create', 'update', 'delete'],
    realtime: true,
    // Persist data and pending changes locally
    persist: {
      name: 'formations',
      retrySync: true, // Persist pending changes and retry
    },
    retry: {
      infinite: true, // Retry changes with exponential backoff
    },
    onError: error => {
      console.error('formations$ error:', error)
    },
  }),
)

// Log initial value
console.log('formations$ initial value:', formations$.peek())

// Setup event listener for changes
formations$.onChange(value => {
  console.log('formations$ changed:', value)
  console.log('formations$ keys:', Object.keys(value || {}))
  console.log('formations$ has data:', Object.keys(value || {}).length > 0)
})

// Déclencher un chargement direct des formations pour pallier aux problèmes de synchronisation
fetchFormationsDirectly()
