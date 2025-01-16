import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from "../supabase";

export async function getAllUserConversations(userId: string) {
    console.log("Fetching conversations for user:", userId);

    const { data, error } = await supabase
        .from('conversation_participants')
        .select(`
            conversation_id,
            conversation:conversations!conversation_id(
                id,
                title
            )
        `)
        .eq('user_id', userId);

    if (error) {
        console.error("Supabase error:", error);
        throw error;
    }

    console.log("Raw response:", data);
    return data?.map(conv => conv.conversation) || [];
}

export const useUserConversations = (userId: string) => {
    return useQuery({
        queryKey: ['conversations', userId],
        queryFn: () => getAllUserConversations(userId),
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });
}

export async function getConversationMessages(conversationId: string) {
    const { data, error } = await supabase
        .from('messages')
        .select(`
            id,
            content,
            created_at,
            sender_id,
            sender:users!sender_id(
                id,
                first_name
            )
        `)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

    if (error) {
        console.error("Supabase error:", error);
        throw error;
    }

    const formattedMessages = (data || []).map(message => ({
        _id: message.id,
        text: message.content,
        createdAt: new Date(message.created_at),
        user: {
            _id: message.sender_id,
            name: message.sender.first_name,
            // avatar: message.sender.avatar // Si vous avez un champ avatar
        }
    }));

    return formattedMessages;
}

export const useConversationMessages = (conversationId: string) => {
    const queryClient = useQueryClient();

    // Initial fetch with useQuery
    const query = useQuery({
        queryKey: ['messages', conversationId],
        queryFn: () => getConversationMessages(conversationId),
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });

    // Set up realtime subscription
    useEffect(() => {
        const subscription = supabase
            .channel(`messages:${conversationId}`)
            .on('postgres_changes', {
                event: '*',  // ou 'INSERT' si vous voulez uniquement les nouveaux messages
                schema: 'public',
                table: 'messages',
                filter: `conversation_id=eq.${conversationId}`
            }, async (payload) => {
                // Récupérer le message complet avec les informations de l'expéditeur
                const { data: newMessage } = await supabase
                    .from('messages')
                    .select(`
                        id,
                        content,
                        created_at,
                        sender_id,
                        sender:users!sender_id(
                            id,
                            first_name
                        )
                    `)
                    .eq('id', payload.new.id)
                    .single();

                // Formater le nouveau message
                const formattedMessage = {
                    _id: newMessage.id,
                    text: newMessage.content,
                    createdAt: new Date(newMessage.created_at),
                    user: {
                        _id: newMessage.sender_id,
                        name: newMessage.sender.first_name,
                    }
                };

                // Mettre à jour le cache React Query
                queryClient.setQueryData(['messages', conversationId], (oldMessages: any) => {
                    // Éviter les doublons
                    const messageExists = oldMessages?.some((msg: any) => msg._id === formattedMessage._id);
                    if (messageExists) return oldMessages;
                    return [...(oldMessages || []), formattedMessage];
                });
            })
            .subscribe();

        // Cleanup subscription
        return () => {
            subscription.unsubscribe();
        };
    }, [conversationId, queryClient]);

    return query;
}

export async function sendMessage(conversationId: string, content: string, senderId: string) {
    const { data, error } = await supabase
        .from('messages')
        .insert([
            {
                conversation_id: conversationId,
                content,
                sender_id: senderId,
            }
        ])
        .select(`
            id,
            content,
            created_at,
            sender_id,
            sender:users!sender_id(
                id,
                first_name
            )
        `)
        .single();

    if (error) {
        console.error("Supabase error:", error);
        throw error;
    }

    return {
        _id: data.id,
        text: data.content,
        createdAt: new Date(data.created_at),
        user: {
            _id: data.sender_id,
            name: data.sender.first_name,
        }
    };
}
