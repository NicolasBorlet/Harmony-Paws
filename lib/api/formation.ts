import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { getFormationImageUrl } from '../utils/get-image-url'
import { FormationInterface } from './types/interfaces'

export const getFormations = async () => {
  const { data, error } = await supabase.from('formations').select('*')
  if (error) throw error
  return data
}

export const getPaginatedFormations = async (
  page: number = 0,
  pageSize: number = 5,
) => {
  const from = page * pageSize
  const to = from + pageSize - 1

  const { data, error, count } = await supabase
    .from('formations')
    .select('id, animator_name, name, created_at, updated_at', {
      count: 'exact',
    })
    .range(from, to)
    .order('created_at', { ascending: false })

  if (error) throw error

  const formationsWithImages = await Promise.all(
    data?.map(async formation => ({
      ...formation,
      image: (await getFormationImageUrl(formation.id.toString())) || '',
      created_at: formation.created_at
        ? new Date(formation.created_at)
        : new Date(),
      updated_at: formation.updated_at
        ? new Date(formation.updated_at)
        : new Date(),
    })) || [],
  )

  return {
    formations: formationsWithImages as FormationInterface[],
    totalCount: count || 0,
    hasMore: (count || 0) > to + 1,
  }
}

export const usePaginatedFormations = (pageSize: number = 5) => {
  return useInfiniteQuery({
    queryKey: ['formations', 'infinite'],
    queryFn: ({ pageParam = 0 }) => getPaginatedFormations(pageParam, pageSize),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) return undefined
      return allPages.length
    },
    initialPageParam: 0,
  })
}

export const getUserPaginatedFormations = async (
  page: number = 0,
  pageSize: number = 5,
  userId: number,
) => {
  const from = page * pageSize
  const to = from + pageSize - 1

  // First, get formation IDs from user_formations table
  const {
    data: userFormations,
    error: userFormationsError,
    count,
  } = await supabase
    .from('user_formations')
    .select('formation_id', { count: 'exact' })
    .eq('user_id', userId) // Use userId parameter instead of hardcoded 1
    .range(from, to)
    .order('created_at', { ascending: false })

  if (userFormationsError) throw userFormationsError

  // If no formations found, return empty result
  if (!userFormations || userFormations.length === 0) {
    console.log('No formations found')
    return {
      formations: [],
      totalCount: 0,
      hasMore: false,
    }
  }

  // Get formation details for the IDs we found
  const formationIds = userFormations.map(uf => uf.formation_id)
  const { data: formations, error: formationsError } = await supabase
    .from('formations')
    .select('id, animator_name, name, created_at, updated_at')
    .in('id', formationIds)
    .order('created_at', { ascending: false })

  if (formationsError) throw formationsError

  const formationsWithImages = await Promise.all(
    formations?.map(async formation => ({
      ...formation,
      image: (await getFormationImageUrl(formation.id.toString())) || '',
      created_at: formation.created_at
        ? new Date(formation.created_at)
        : new Date(),
      updated_at: formation.updated_at
        ? new Date(formation.updated_at)
        : new Date(),
    })) || [],
  )

  console.log('formationsWithImages', formationsWithImages)

  return {
    formations: formationsWithImages as FormationInterface[],
    totalCount: count || 0,
    hasMore: (count || 0) > to + 1,
  }
}

export const useUserPaginatedFormations = (
  pageSize: number = 5,
  userId?: number,
) => {
  return useInfiniteQuery({
    queryKey: ['userFormations', 'infinite', userId],
    queryFn: ({ pageParam = 0 }) =>
      getUserPaginatedFormations(pageParam, pageSize, userId as number),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) return undefined
      return allPages.length
    },
    initialPageParam: 0,
    enabled: !!userId, // Only run query when userId is available
  })
}

const getUserModuleProgress = async (userId: number, formationId: number) => {
  const { data, error } = await supabase
    .from('user_progress')
    .select('module_id, progress_percentage')
    .eq('user_id', userId)
    .eq('formation_id', formationId)
    .eq('content_type', 'module')

  if (error) throw error

  return data || []
}

export const getFormationById = async (id: number, userId?: number) => {
  // 1. Récupérer la formation
  const { data: formation, error: formationError } = await supabase
    .from('formations')
    .select('*')
    .eq('id', id)
    .single()

  if (formationError) throw formationError

  // 2. Récupérer les modules de cette formation
  const { data: modules, error: modulesError } = await supabase
    .from('modules')
    .select('*')
    .eq('formation_id', id)

  if (modulesError) throw modulesError

  // 3. Récupérer les avis de cette formation
  const { data: advices, error: advicesError } = await supabase
    .from('opinions')
    .select('*')
    .eq('formation_id', id)

  // 4. Récupérer les achats de l'utilisateur pour cette formation
  let hasPurchase = false
  let modulesPurchased: number[] = []

  if (userId) {
    const { data: userPurchases, error: purchasesError } = await supabase
      .from('user_purchases')
      .select('*')
      .eq('user_id', userId)
      .eq('formation_id', id)

    if (purchasesError) throw purchasesError

    if (userPurchases && userPurchases.length > 0) {
      // Vérifier si l'utilisateur a acheté la formation complète
      const formationPurchase = userPurchases.find(
        purchase => purchase.content_type === 'formation',
      )

      if (formationPurchase) {
        hasPurchase = true
      } else {
        // Si pas d'achat de formation complète, récupérer les modules achetés
        modulesPurchased = userPurchases
          .filter(purchase => purchase.content_type === 'module')
          .map(purchase => purchase.module_id)
          .filter((id): id is number => id !== null)
      }
    }
  }

  // 5. Ajouter les images et autres informations
  const formationWithImage = {
    ...formation,
    image: await getFormationImageUrl(formation.id.toString()),
    created_at: formation.created_at
      ? new Date(formation.created_at)
      : new Date(),
    updated_at: formation.updated_at
      ? new Date(formation.updated_at)
      : new Date(),
    hasPurchase,
    modulesPurchased,
  }

  const modulesWithImages = await Promise.all(
    modules.map(async module => ({
      ...module,
      image: await getFormationImageUrl(`${formation.id}/${module.id}`),
      created_at: module.created_at ? new Date(module.created_at) : new Date(),
      updated_at: module.updated_at ? new Date(module.updated_at) : new Date(),
    })),
  )

  let modulesWithProgress = modulesWithImages

  if (userId) {
    const userProgress = await getUserModuleProgress(userId, id)

    modulesWithProgress = modulesWithImages.map(module => ({
      ...module,
      progress:
        userProgress.find(p => p.module_id === module.id)?.progress_percentage ||
        0,
    }))
  }

  return {
    ...formationWithImage,
    modules: modulesWithProgress,
    advices,
  }
}

export const useFormationById = (id: number, userId?: number) => {
  return useQuery({
    queryKey: ['formation', id, userId],
    queryFn: () => getFormationById(id, userId),
  })
}
