// FormationListing.tsx
import { Tables } from '@/database.types'
import { formations$ } from '@/lib/observables/formation-observable'
import { supabase } from '@/lib/supabase'
import { observer } from '@legendapp/state/react'
import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { Body } from '../ui/text'

const FormationListing = observer(() => {
  const formations = formations$.get()
  const isLoading = formations === undefined // Ajout d'un état de chargement
  const [fallbackData, setFallbackData] = useState<
    Tables<'formations'>[] | null
  >(null)
  const [fallbackLoading, setFallbackLoading] = useState(false)

  // Fonction pour charger les données directement depuis Supabase si l'observable ne fonctionne pas
  const loadFallbackData = async () => {
    if (formations !== undefined || fallbackData !== null) return

    try {
      setFallbackLoading(true)
      console.log('Loading fallback formations data directly from Supabase...')
      const { data, error } = await supabase.from('formations').select('*')

      if (error) {
        console.error('Fallback data loading error:', error)
        return
      }

      console.log('Fallback formations loaded:', data)
      setFallbackData(data)
    } catch (e) {
      console.error('Exception in fallback data loading:', e)
    } finally {
      setFallbackLoading(false)
    }
  }

  useEffect(() => {
    console.log('FormationListing rendered with formations:', formations)
    console.log('formations type:', typeof formations)
    console.log('isLoading:', isLoading)

    if (formations) {
      console.log('formations keys:', Object.keys(formations))
      console.log('formations has data:', Object.keys(formations).length > 0)

      if (Object.keys(formations).length > 0) {
        // Log the first formation to see its structure
        const firstFormation = Object.values(formations)[0]
        console.log('First formation example:', firstFormation)
        console.log('First formation keys:', Object.keys(firstFormation))
      }
    } else {
      // Si après 3 secondes les données ne sont toujours pas chargées, essayons de les charger directement
      const timer = setTimeout(() => {
        if (formations === undefined && !fallbackData && !fallbackLoading) {
          console.log(
            'Observable formations$ still undefined after timeout, loading fallback data',
          )
          loadFallbackData()
        }
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [formations, isLoading, fallbackData, fallbackLoading])

  if (isLoading && !fallbackData) {
    if (fallbackLoading) {
      console.log('Rendering fallback loading state...')
    } else {
      console.log('Rendering loading state...')
    }
    return (
      <View style={{ padding: 16, alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#007AFF' />
        <Body color='gray'>Loading formations...</Body>
      </View>
    )
  }

  const renderItem = ({ item: formation }: { item: Tables<'formations'> }) => {
    console.log('Rendering formation item:', formation.id)
    return (
      <View
        style={{
          padding: 12,
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 8,
          marginBottom: 8,
        }}
      >
        <Body color='black'>ID: {formation.id}</Body>
        {formation.name && <Body color='black'>Nom: {formation.name}</Body>}
        {formation.date && <Body color='black'>Date: {formation.date}</Body>}
        {formation.description && (
          <Body color='black'>Description: {formation.description}</Body>
        )}
        {formation.price !== null && (
          <Body color='black'>Prix: {formation.price}€</Body>
        )}
        {formation.place && <Body color='black'>Lieu: {formation.place}</Body>}
        {formation.duration !== null && (
          <Body color='black'>Durée: {formation.duration} minutes</Body>
        )}
      </View>
    )
  }

  // Utiliser les données de secours si l'observable ne contient pas de données
  let formationList: Tables<'formations'>[] = []

  if (formations && Object.keys(formations).length > 0) {
    formationList = Object.values(formations) as Tables<'formations'>[]
    console.log(
      'Using observable data, formation list length:',
      formationList.length,
    )
  } else if (fallbackData && fallbackData.length > 0) {
    formationList = fallbackData
    console.log(
      'Using fallback data, formation list length:',
      formationList.length,
    )
  }

  if (formationList.length > 0) {
    console.log(
      'Formation list keys:',
      formationList.map(f => f.id),
    )

    return (
      <FlatList
        data={formationList}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: 8 }}
      />
    )
  }

  console.log('Rendering empty state...')
  return (
    <View style={{ padding: 16, alignItems: 'center' }}>
      <Body color='gray'>No formations available</Body>
    </View>
  )
})

export default FormationListing
