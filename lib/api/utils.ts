import { supabase } from '../supabase'

/**
 * Utility function for consistent date formatting
 * @param dateString Optional date string to format
 * @returns Formatted Date object
 */
export const formatDate = (dateString?: string | null): Date => {
  return dateString ? new Date(dateString) : new Date()
}

/**
 * Environment-aware logging utility
 * @param args Arguments to log
 */
export const logDev = (...args: any[]) => {
  if (__DEV__) {
    console.log(...args)
  }
}

/**
 * Standard error handler for Supabase queries
 * @param error The error object from Supabase
 * @param entityName Name of the entity being operated on (for better error messages)
 */
export const handleSupabaseError = (error: any, entityName = 'item') => {
  if (!error) return null

  if (error.code === 'PGRST116') {
    return { notFound: true, message: `${entityName} not found` }
  }

  // Log in development, but don't expose in production
  logDev('API Error:', error)

  throw new Error(`Database error: ${error.message || 'Unknown error'}`)
}

/**
 * Get cached auth token or retrieve a new one
 * @returns Promise with the auth token
 */
export const getAuthToken = async (): Promise<string | null> => {
  const { data } = await supabase.auth.getSession()
  return data.session?.access_token || null
}

/**
 * Common query options for React Query
 */
export const defaultQueryOptions = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  staleTime: 5 * 60 * 1000, // 5 minutes
}

/**
 * Common mutation options for React Query
 */
export const defaultMutationOptions = {
  onError: (error: any) => {
    logDev('Mutation Error:', error)
  },
}
