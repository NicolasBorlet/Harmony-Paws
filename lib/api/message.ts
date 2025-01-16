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
