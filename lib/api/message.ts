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
        // .order('conversation.messages.created_at', { foreignTable: 'conversation.messages', ascending: false })
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

                const formattedMessage: GiftedChatMessage = {
                    _id: newMessage.id,
                    text: newMessage.content,
                    createdAt: new Date(newMessage.created_at),
                    user: {
                        _id: newMessage.sender_id!,
                        name: newMessage.sender.first_name,
                    }
                };

                queryClient.setQueryData<GiftedChatMessage[]>(['messages', conversationId], (oldMessages = []) => {
                    const messageExists = oldMessages.some(msg => msg._id === formattedMessage._id);
                    if (messageExists) return oldMessages;
                    return [...oldMessages, formattedMessage];
                });
            })
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [conversationId, queryClient]);

    return query;
}

export async function sendMessage(
    conversationId: string, 
    content: string, 
    senderId: number
): Promise<GiftedChatMessage> {
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

    if (error) throw error;

    return {
        _id: data.id,
        text: data.content,
        createdAt: new Date(data.created_at),
        user: {
            _id: data.sender_id!,
            name: data.sender.first_name,
        }
    };
}
