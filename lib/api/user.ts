import { useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'

export async function createUserInDB(uuid: string) {
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        role_id: 1,
        onBoarding: false,
        uid: uuid,
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function verifyUserInDB(uuid: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('uid', uuid)
    .single()

  if (error) throw error
  return data
}

export async function updateUserPushToken(userId: string, pushToken: string) {
  const { data, error } = await supabase
    .from('users')
    .update({ expo_push_token: pushToken })
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUser(userId: string) {
  console.log('userId', userId)
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}

export async function getUserPicture(userId: string) {
  // Recup from storage supabase from folder users and file userId.jpg
  const { data, error } = await supabase.storage
    .from('users')
    .download(userId + '.jpg')

  if (error) throw error
  return data
}

export const useUserPicture = (userId: string) => {
  return useQuery({
    queryKey: ['userPicture', userId],
    queryFn: () => getUserPicture(userId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}
