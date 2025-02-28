import { useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { defaultQueryOptions, handleSupabaseError, logDev } from './utils'

export async function createUserInDB(uuid: string) {
  try {
    // Only select required fields from the response
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          role_id: 1,
          onBoarding: false,
          uid: uuid,
        },
      ])
      .select('id, role_id, onBoarding, uid')
      .single()

    if (error) throw handleSupabaseError(error, 'user creation')
    return data
  } catch (error) {
    logDev('Error in createUserInDB:', error)
    throw error
  }
}

export async function verifyUserInDB(uuid: string) {
  try {
    // Only select necessary fields
    const { data, error } = await supabase
      .from('users')
      .select('id, role_id, onBoarding, uid, expo_push_token')
      .eq('uid', uuid)
      .single()

    if (error) throw handleSupabaseError(error, 'user verification')
    return data
  } catch (error) {
    logDev('Error in verifyUserInDB:', error)
    throw error
  }
}

export async function updateUserPushToken(userId: string, pushToken: string) {
  try {
    // Only select necessary fields
    const { data, error } = await supabase
      .from('users')
      .update({ expo_push_token: pushToken })
      .eq('id', userId)
      .select('id, expo_push_token')
      .single()

    if (error) throw handleSupabaseError(error, 'push token update')
    return data
  } catch (error) {
    logDev('Error in updateUserPushToken:', error)
    throw error
  }
}

export async function getUser(userId: string) {
  try {
    // Select only the fields that will be used
    const { data, error } = await supabase
      .from('users')
      .select(
        'id, role_id, onBoarding, uid, first_name, last_name, place, description, age',
      )
      .eq('id', userId)
      .single()

    if (error) throw handleSupabaseError(error, 'user')
    return data
  } catch (error) {
    logDev('Error in getUser:', error)
    throw error
  }
}

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
    ...defaultQueryOptions,
  })
}

export async function getUserPicture(userId: string) {
  try {
    // Use a presigned URL instead of downloading the entire file
    const { data: signedUrlData, error: signedUrlError } =
      await supabase.storage
        .from('users')
        .createSignedUrl(`${userId}.jpg`, 3600) // 1 hour expiration

    if (signedUrlError) {
      // Fall back to direct download if signed URL fails
      const { data, error } = await supabase.storage
        .from('users')
        .download(`${userId}.jpg`)

      if (error) throw handleSupabaseError(error, 'user picture')
      return data
    }

    return signedUrlData.signedUrl
  } catch (error) {
    logDev('Error in getUserPicture:', error)
    throw error
  }
}

export const useUserPicture = (userId: string) => {
  return useQuery({
    queryKey: ['userPicture', userId],
    queryFn: () => getUserPicture(userId),
    ...defaultQueryOptions,
  })
}
