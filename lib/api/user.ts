import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase';

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
  console.log('userId', userId);
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
    refetchOnWindowFocus: false
  })
}

export const sendFriendRequest = async (senderId: number, receiverId: number) => {
  if (senderId === receiverId) {
    throw new Error('Sender and receiver cannot be the same')
  }

  // Vérifier si une demande d'ami a déjà été envoyée
  const { data: existingRequest, error: requestError } = await supabase
    .from('friend_requests')
    .select('*')
    .eq('sender_id', senderId)
    .eq('recipient_id', receiverId)
    .single()

  if (requestError && requestError.code !== 'PGRST116') { // PGRST116 signifie qu'aucune ligne n'a été trouvée
    throw requestError
  }

  if (existingRequest) {
    throw new Error('Friend request already sent')
  }

  const { data, error } = await supabase
    .from('friend_requests')
    .insert([{ sender_id: senderId, recipient_id: receiverId, status: 'pending' }])
    .select()
    .single()

  if (error) throw error
  return data
}

export const acceptFriendRequest = async (senderId: number, receiverId: number) => {
  const { data, error } = await supabase
    .from('friend_requests')
    .update({ status: 'accepted' })
    .eq('sender_id', senderId)
    .eq('recipient_id', receiverId)
    .select()
    .single()

  if (error) throw error
  return data
}

export const useAcceptFriendRequest = (senderId: number, receiverId: number) => {
  return useQuery({
    queryKey: ['acceptFriendRequest', senderId, receiverId],
    queryFn: () => acceptFriendRequest(senderId, receiverId),
  })
}

export const rejectFriendRequest = async (senderId: number, receiverId: number) => {
  const { data, error } = await supabase
    .from('friend_requests')
    .update({ status: 'rejected' })
    .eq('sender_id', senderId)
    .eq('recipient_id', receiverId)
    .select()
    .single()

  if (error) throw error
  return data
}

export const useRejectFriendRequest = (senderId: number, receiverId: number) => {
  return useQuery({
    queryKey: ['rejectFriendRequest', senderId, receiverId],
    queryFn: () => rejectFriendRequest(senderId, receiverId),
  })
}