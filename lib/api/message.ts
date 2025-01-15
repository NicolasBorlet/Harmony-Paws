import { supabase } from "../supabase";

export async function getAllUserConversations(userId: string) {
    const { data: conversations, error } = await supabase
        .from('conversation_participants')
        .select(`
            conversation_id,
            conversations:conversation_id (
                id,
                title,
                conversation_participants (
                    user_id,
                    users:user_id (
                        id,
                        email
                    )
                )
            )
        `)
        .eq('user_id', userId);

    if (error) {
        throw error;
    }

    return conversations?.map(conv => conv.conversations) || [];
}
