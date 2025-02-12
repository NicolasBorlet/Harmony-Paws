import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "../supabase";

export async function getUserInvitations(userId: number) {
  console.log('getUserInvitations', userId)
  const { data, error } = await supabase
    .from('activity_invitations')
    .select(
      `
      *,
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

  if (error) throw error

  console.log('data', data)
  return data
}

export const useUserInvitations = (userId: number) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['userInvitations', userId],
    queryFn: () => getUserInvitations(userId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    const subscription = supabase
      .channel(`userInvitations:${userId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'activity_invitations', filter: `receiver_id=eq.${userId}` }, async payload => {
        if (payload.eventType === 'INSERT') {
          queryClient.setQueryData(
            ['userInvitations', userId],
            (oldData = []) => [...oldData, payload.new],
          )
        } else if (payload.eventType === 'DELETE') {
          queryClient.setQueryData(
            ['userInvitations', userId],
            (oldData = []) => oldData.filter(invitation => invitation.id !== payload.old.id),
          )
        }
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [queryClient, userId])

  return query
}

export const acceptActivityInvitation = async (invitationId: number) => {
  const { data, error } = await supabase
    .from('activity_invitations')
    .update({ status: 'accepted' })
    .eq('id', invitationId)
    .select()
    .single()

  if (error) throw error
  return data
}

export const useAcceptActivityInvitation = (invitationId: number) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['acceptActivityInvitation', invitationId],
    queryFn: () => acceptActivityInvitation(invitationId),
  })

  return query
}

export const rejectActivityInvitation = async (invitationId: number) => {
  const { data, error } = await supabase
    .from('activity_invitations')
    .update({ status: 'rejected' })
    .eq('id', invitationId)
    .select()
    .single()

  if (error) throw error
  return data
}

export const useRejectActivityInvitation = (invitationId: number) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['rejectActivityInvitation', invitationId],
    queryFn: () => rejectActivityInvitation(invitationId),
  })

  return query
}

export const sendActivityInvitation = async (invitation: {
  senderId: number
  receiverId: number
  activityId: number
}) => {
  if (invitation.senderId === invitation.receiverId) {
    throw new Error('Sender and receiver cannot be the same')
  }

  // Vérifier si une demande d'invitation a déjà été envoyée
  const { data: existingRequest, error: requestError } = await supabase
    .from('activity_invitations')
    .select('*')
    .eq('sender_id', invitation.senderId)
    .eq('receiver_id', invitation.receiverId)
    .eq('activity_id', invitation.activityId)
    .single()

  if (existingRequest) {
    throw new Error('Invitation already sent')
  }

  const { data, error } = await supabase.from('activity_invitations').insert([
    {
      sender_id: invitation.senderId,
      receiver_id: invitation.receiverId,
      activity_id: invitation.activityId,
      status: 'pending',
    },
  ]).select().single()

  if (error) throw error
  return data
}

export const useSendActivityInvitation = (invitation: {
  senderId: number
  receiverId: number
  activityId: number
}) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['sendActivityInvitation', invitation],
    queryFn: () => sendActivityInvitation(invitation),
  })

  return query
}
