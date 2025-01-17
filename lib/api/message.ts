import { Conversation, GiftedChatMessage } from '@/types/message';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from "../supabase";

export async function getAllUserConversations(userId: number): Promise<Conversation[]> {
    const { data, error } = await supabase
        .from('conversation_participants')
        .select(`
            conversation_id,
            conversation:conversations!conversation_id(
                id,
                title,
                last_message:messages(
                    id,
                    content,
                    created_at
                )
            )
        `)
        .eq('user_id', userId)
        .limit(1, { foreignTable: 'conversation.messages' });

    if (error) throw error;
    return data?.map(conv => conv.conversation) || [];
}


export const useUserConversations = (userId: number) => {
    return useQuery({
        queryKey: ['conversations', userId],
        queryFn: () => getAllUserConversations(userId),
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });
}

export async function getConversationMessages(conversationId: string): Promise<GiftedChatMessage[]> {
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

    if (error) throw error;

    return (data || []).map(message => ({
        _id: message.id,
        text: message.content,
        createdAt: new Date(message.created_at),
        user: {
            _id: message.sender_id!,
            name: message.sender.first_name,
        }
    }));
}

export const useConversationMessages = (conversationId: string) => {
    const queryClient = useQueryClient();

    const query = useQuery<GiftedChatMessage[]>({
        queryKey: ['messages', conversationId],
        queryFn: () => getConversationMessages(conversationId),
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        const subscription = supabase
            .channel(`messages:${conversationId}`)
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'messages',
                filter: `conversation_id=eq.${conversationId}`
            }, async (payload) => {
                if (payload.eventType === 'INSERT') {
                    queryClient.setQueryData<GiftedChatMessage[]>(
                        ['messages', conversationId], 
                        (oldMessages = []) => {
                            const messageExists = oldMessages.some(msg => msg._id === payload.new.id);
                            if (messageExists) {
                                return oldMessages;
                            }

                            const newMessage: GiftedChatMessage = {
                                _id: payload.new.id,
                                text: payload.new.content,
                                createdAt: new Date(payload.new.created_at),
                                user: {
                                    _id: payload.new.sender_id,
                                    name: payload.new.sender?.first_name || '',
                                }
                            };

                            return [...oldMessages, newMessage];
                        }
                    );
                }
            })
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [conversationId, queryClient]);

    return query;
}

export async function sendMessage(conversationId: string, content: string, senderId: string) {
    // Envoyer le message
    const { data: insertedMessage, error: insertError } = await supabase
        .from('messages')
        .insert([
            {
                conversation_id: conversationId,
                content,
                sender_id: senderId,
            },
        ])
        .select('id')
        .single()

    if (insertError) throw insertError

    // Récupérer le message avec toutes les relations
    const { data: messageData, error: messageError } = await supabase
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
        .eq('id', insertedMessage.id)
        .single()

    if (messageError) throw messageError

    // Déclencher l'edge function pour les notifications
    const { error: notificationError } = await supabase.functions.invoke(
        'send-message-notification',
        {
            body: {
                conversationId,
                senderId,
                messageContent: content,
            },
        }
    )

    if (notificationError) {
        console.error('Error sending notification:', notificationError)
    }

    // Retourner le message au format GiftedChat
    return {
        _id: messageData.id,
        text: messageData.content,
        createdAt: new Date(messageData.created_at),
        user: {
            _id: messageData.sender_id,
            name: messageData.sender.first_name,
        }
    }
}
