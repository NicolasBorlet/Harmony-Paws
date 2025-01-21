import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { supabase } from '../supabase'

export async function getFriendRequests(userId: number) {
  const { data, error } = await supabase
    .from('friend_requests')
    .select(
      `
      *,
      sender:users!sender_id(
        first_name
      )
    `,
    )
    .eq('recipient_id', userId)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  if (error) throw error
  // For eacch data, add type="new_friend_request"
  return data.map(request => ({ ...request, type: 'new_friend_request' }))
}

export const useFriendRequests = (userId: number) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['friendRequests', userId],
    queryFn: () => getFriendRequests(userId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    const subscription = supabase
      .channel(`friend_requests:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'friend_requests',
          filter: `recipient_id=eq.${userId}`,
        },
        async payload => {
          if (payload.eventType === 'INSERT') {
            queryClient.setQueryData(
              ['friendRequests', userId],
              (oldData = []) => {
                const requestExists = oldData.some(
                  req => req.id === payload.new.id,
                )
                if (requestExists) {
                  return oldData
                }

                return [...oldData, payload.new]
              },
            )
          } else if (payload.eventType === 'DELETE') {
            queryClient.setQueryData(
              ['friendRequests', userId],
              (oldData = []) =>
                oldData.filter(req => req.id !== payload.old.id),
            )
          }
        },
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [queryClient, userId])

  return query
}

export const sendFriendRequest = async (
  senderId: number,
  receiverId: number,
) => {
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

  if (requestError && requestError.code !== 'PGRST116') {
    // PGRST116 signifie qu'aucune ligne n'a été trouvée
    throw requestError
  }

  if (existingRequest) {
    throw new Error('Friend request already sent')
  }

  const { data, error } = await supabase
    .from('friend_requests')
    .insert([
      { sender_id: senderId, recipient_id: receiverId, status: 'pending' },
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

export const acceptFriendRequest = async (
  senderId: number,
  receiverId: number,
) => {
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

export const rejectFriendRequest = async (
  senderId: number,
  receiverId: number,
) => {
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
