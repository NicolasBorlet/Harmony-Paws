import { useQuery } from '@tanstack/react-query';
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
    return useQuery({
        queryKey: ['messages', conversationId],
        queryFn: () => getConversationMessages(conversationId),
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });
}
