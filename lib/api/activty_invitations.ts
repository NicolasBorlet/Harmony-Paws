import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { supabase } from '../supabase'
import { defaultQueryOptions, handleSupabaseError, logDev } from './utils'

export async function getUserInvitations(userId: number) {
  logDev('getUserInvitations', userId)

  try {
    // Select only necessary fields
    const { data, error } = await supabase
      .from('activity_invitations')
      .select(
        `
        id, created_at, updated_at, status,
        sender:users!sender_id(
          id,
          first_name
        ),
        activity:activities!activity_id(
          id
        )
      `,
      )
      .eq('receiver_id', userId)
      .eq('status', 'pending')
      .order('created_at', { ascending: false })

    if (error) throw handleSupabaseError(error, 'invitations')

    return data || []
  } catch (error) {
    logDev('Error in getUserInvitations:', error)
    throw error
  }
}

export const useUserInvitations = (userId: number) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['userInvitations', userId],
    queryFn: () => getUserInvitations(userId),
    ...defaultQueryOptions,
  })

  useEffect(() => {
    const subscription = supabase
      .channel(`userInvitations:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'activity_invitations',
          filter: `receiver_id=eq.${userId}`,
        },
        async payload => {
          // Use query invalidation instead of manual cache manipulation
          queryClient.invalidateQueries({
            queryKey: ['userInvitations', userId],
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

export const acceptActivityInvitation = async (invitationId: number) => {
  logDev('acceptActivityInvitation', invitationId)

  try {
    // Use RPC to handle transaction on the server side
    const { data, error } = await supabase.rpc('accept_activity_invitation', {
      invitation_id: invitationId,
    })

    if (error) throw handleSupabaseError(error, 'invitation')
    return data
  } catch (error) {
    // If the RPC doesn't exist yet, fall back to client-side implementation
    logDev('Falling back to client implementation:', error)

    return await acceptInvitationClientSide(invitationId)
  }
}

// Fallback implementation if server-side function isn't available
const acceptInvitationClientSide = async (invitationId: number) => {
  try {
    // First, retrieve the invitation
    const { data: invitation, error: fetchError } = await supabase
      .from('activity_invitations')
      .select('*')
      .eq('id', invitationId)
      .single()

    if (fetchError) throw handleSupabaseError(fetchError, 'invitation')
    if (!invitation) throw new Error('Invitation not found')

    // Update status
    const { error: updateError } = await supabase
      .from('activity_invitations')
      .update({ status: 'accepted' })
      .eq('id', invitationId)

    if (updateError) throw handleSupabaseError(updateError, 'invitation status')

    // Add user to activity
    const { error: userActivityError } = await supabase
      .from('user_activities')
      .insert([
        {
          user_id: invitation.receiver_id,
          activity_id: invitation.activity_id,
        },
      ])

    if (userActivityError)
      throw handleSupabaseError(userActivityError, 'user activity')

    return invitation
  } catch (error) {
    logDev('Error in acceptInvitationClientSide:', error)
    throw error
  }
}

export const rejectActivityInvitation = async (invitationId: number) => {
  try {
    const { data, error } = await supabase
      .from('activity_invitations')
      .update({ status: 'rejected' })
      .eq('id', invitationId)
      .select()
      .single()

    if (error) throw handleSupabaseError(error, 'invitation')
    return data
  } catch (error) {
    logDev('Error in rejectActivityInvitation:', error)
    throw error
  }
}

export const sendActivityInvitation = async (invitation: {
  senderId: number
  receiverId: number
  activityId: number
}) => {
  try {
    if (invitation.senderId === invitation.receiverId) {
      throw new Error('Sender and receiver cannot be the same')
    }

    // Check if invitation already exists
    const { data: existingRequest, error: requestError } = await supabase
      .from('activity_invitations')
      .select('id')
      .eq('sender_id', invitation.senderId)
      .eq('receiver_id', invitation.receiverId)
      .eq('activity_id', invitation.activityId)
      .maybeSingle()

    if (requestError)
      throw handleSupabaseError(requestError, 'invitation check')

    if (existingRequest) {
      throw new Error('Invitation already sent')
    }

    // Insert new invitation
    const { data, error } = await supabase
      .from('activity_invitations')
      .insert([
        {
          sender_id: invitation.senderId,
          receiver_id: invitation.receiverId,
          activity_id: invitation.activityId,
          status: 'pending',
        },
      ])
      .select()
      .single()

    if (error) throw handleSupabaseError(error, 'invitation creation')
    return data
  } catch (error) {
    logDev('Error in sendActivityInvitation:', error)
    throw error
  }
}
