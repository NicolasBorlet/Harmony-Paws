import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { supabase } from '../supabase'
import { defaultQueryOptions, handleSupabaseError, logDev } from './utils'

export async function getFriendRequests(userId: number) {
  try {
    // Select only necessary fields
    const { data, error } = await supabase
      .from('friend_requests')
      .select(
        `
        id, created_at, updated_at, status, sender_id, recipient_id,
        sender:users!sender_id(
          first_name
        )
      `,
      )
      .eq('recipient_id', userId)
      .eq('status', 'pending')
      .order('created_at', { ascending: false })

    if (error) throw handleSupabaseError(error, 'friend requests')

    // Add type information for each request
    return (data || []).map(request => ({
      ...request,
      type: 'new_friend_request',
    }))
  } catch (error) {
    logDev('Error in getFriendRequests:', error)
    throw error
  }
}

export const useFriendRequests = (userId: number) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['friendRequests', userId],
    queryFn: () => getFriendRequests(userId),
    ...defaultQueryOptions,
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
          // Use query invalidation instead of manual cache updates
          queryClient.invalidateQueries({
            queryKey: ['friendRequests', userId],
          })
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
  try {
    if (senderId === receiverId) {
      throw new Error('Sender and receiver cannot be the same')
    }

    // Check if request already exists, using maybeSingle to handle not found
    const { data: existingRequest, error: requestError } = await supabase
      .from('friend_requests')
      .select('id')
      .eq('sender_id', senderId)
      .eq('recipient_id', receiverId)
      .maybeSingle()

    if (requestError)
      throw handleSupabaseError(requestError, 'friend request check')

    if (existingRequest) {
      throw new Error('Friend request already sent')
    }

    // Insert new request
    const { data, error } = await supabase
      .from('friend_requests')
      .insert([
        { sender_id: senderId, recipient_id: receiverId, status: 'pending' },
      ])
      .select()
      .single()

    if (error) throw handleSupabaseError(error, 'friend request')
    return data
  } catch (error) {
    logDev('Error in sendFriendRequest:', error)
    throw error
  }
}

export const acceptFriendRequest = async (
  senderId: number,
  receiverId: number,
) => {
  try {
    // Try to use RPC if available
    try {
      const { data, error } = await supabase.rpc('accept_friend_request', {
        sender_id: senderId,
        receiver_id: receiverId,
      })

      if (error) throw error
      return data
    } catch (rpcError) {
      // Fall back to client implementation
      logDev('Falling back to client implementation for acceptFriendRequest')

      const { data, error } = await supabase
        .from('friend_requests')
        .update({ status: 'accepted' })
        .eq('sender_id', senderId)
        .eq('recipient_id', receiverId)
        .select()
        .single()

      if (error) throw handleSupabaseError(error, 'friend request acceptance')
      return data
    }
  } catch (error) {
    logDev('Error in acceptFriendRequest:', error)
    throw error
  }
}

export const rejectFriendRequest = async (
  senderId: number,
  receiverId: number,
) => {
  try {
    const { data, error } = await supabase
      .from('friend_requests')
      .update({ status: 'rejected' })
      .eq('sender_id', senderId)
      .eq('recipient_id', receiverId)
      .select()
      .single()

    if (error) throw handleSupabaseError(error, 'friend request rejection')
    return data
  } catch (error) {
    logDev('Error in rejectFriendRequest:', error)
    throw error
  }
}
