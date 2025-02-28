import { QueryClient } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { handleSupabaseError, logDev } from './utils'

/**
 * Utilitaire pour créer des requêtes paginées
 */
export const createPaginatedQuery = async <T>(
  table: string,
  page: number = 0,
  pageSize: number = 10,
  selectQuery: string = '*',
  filters: Record<string, any> = {},
  orderBy: { column: string; ascending: boolean } = {
    column: 'created_at',
    ascending: false,
  },
) => {
  try {
    const from = page * pageSize
    const to = from + pageSize - 1

    // Construire la requête
    let query = supabase
      .from(table)
      .select(selectQuery, { count: 'exact' })
      .range(from, to)
      .order(orderBy.column, { ascending: orderBy.ascending })

    // Appliquer les filtres
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value)
    })

    const { data, error, count } = await query

    if (error) throw handleSupabaseError(error, table)

    return {
      items: data || [],
      totalCount: count || 0,
      hasMore: (count || 0) > to + 1,
    }
  } catch (error) {
    logDev(`Error in createPaginatedQuery for ${table}:`, error)
    throw error
  }
}

/**
 * Utilitaire pour configurer un abonnement en temps réel
 */
export const setupRealtimeSubscription = (
  table: string,
  filterColumn: string,
  filterValue: string | number,
  queryKey: any[],
  queryClient: QueryClient,
) => {
  const subscription = supabase
    .channel(`${table}:${filterValue}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: table,
        filter: `${filterColumn}=eq.${filterValue}`,
      },
      async () => {
        // Invalider la requête concernée
        queryClient.invalidateQueries({
          queryKey: queryKey,
        })
      },
    )
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}

/**
 * Utilitaire pour des opérations CRUD génériques
 */
export const createCrudOperations = <T, U = any>(tableName: string) => {
  // Obtenir un élément par ID
  const getById = async (id: string | number): Promise<T | null> => {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .maybeSingle()

      if (error) throw handleSupabaseError(error, tableName)
      return data
    } catch (error) {
      logDev(`Error in getById for ${tableName}:`, error)
      throw error
    }
  }

  // Créer un nouvel élément
  const create = async (item: U): Promise<T> => {
    try {
      const now = new Date().toISOString()
      const { data, error } = await supabase
        .from(tableName)
        .insert({
          ...item,
          created_at: now,
          updated_at: now,
        })
        .select()
        .single()

      if (error) throw handleSupabaseError(error, tableName)
      return data
    } catch (error) {
      logDev(`Error in create for ${tableName}:`, error)
      throw error
    }
  }

  // Mettre à jour un élément
  const update = async (
    id: string | number,
    changes: Partial<U>,
  ): Promise<T> => {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .update({
          ...changes,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw handleSupabaseError(error, tableName)
      return data
    } catch (error) {
      logDev(`Error in update for ${tableName}:`, error)
      throw error
    }
  }

  // Supprimer un élément
  const remove = async (id: string | number): Promise<T> => {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id)
        .select()
        .single()

      if (error) throw handleSupabaseError(error, tableName)
      return data
    } catch (error) {
      logDev(`Error in remove for ${tableName}:`, error)
      throw error
    }
  }

  return {
    getById,
    create,
    update,
    remove,
  }
}

/**
 * Utilitaire pour gérer les relations many-to-many
 */
export const createRelationManager = (relationTable: string) => {
  // Ajouter une relation
  const addRelation = async (
    firstField: string,
    firstId: number,
    secondField: string,
    secondId: number,
  ) => {
    try {
      const { data, error } = await supabase
        .from(relationTable)
        .insert({
          [firstField]: firstId,
          [secondField]: secondId,
        })
        .select()

      if (error) throw handleSupabaseError(error, relationTable)
      return data
    } catch (error) {
      logDev(`Error adding relation in ${relationTable}:`, error)
      throw error
    }
  }

  // Supprimer une relation
  const removeRelation = async (
    firstField: string,
    firstId: number,
    secondField: string,
    secondId: number,
  ) => {
    try {
      const { data, error } = await supabase
        .from(relationTable)
        .delete()
        .eq(firstField, firstId)
        .eq(secondField, secondId)
        .select()

      if (error) throw handleSupabaseError(error, relationTable)
      return data
    } catch (error) {
      logDev(`Error removing relation in ${relationTable}:`, error)
      throw error
    }
  }

  // Obtenir toutes les relations pour une entité
  const getRelationsFor = async (field: string, id: number) => {
    try {
      const { data, error } = await supabase
        .from(relationTable)
        .select('*')
        .eq(field, id)

      if (error) throw handleSupabaseError(error, relationTable)
      return data || []
    } catch (error) {
      logDev(`Error getting relations in ${relationTable}:`, error)
      throw error
    }
  }

  return {
    addRelation,
    removeRelation,
    getRelationsFor,
  }
}
