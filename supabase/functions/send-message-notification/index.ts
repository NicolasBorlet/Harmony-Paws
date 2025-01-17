import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

interface MessageNotificationPayload {
  conversationId: string;
  senderId: string;
  messageContent: string;
}

serve(async (req) => {
  try {
    const { conversationId, senderId, messageContent } = await req.json() as MessageNotificationPayload
    
    // Initialiser le client Supabase
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Récupérer les informations de l'expéditeur
    const { data: senderData, error: senderError } = await supabaseClient
      .from('users')
      .select('first_name, last_name')
      .eq('id', senderId)
      .single()

    if (senderError) throw senderError

    // Récupérer tous les participants de la conversation sauf l'expéditeur
    const { data: participants, error: participantsError } = await supabaseClient
      .from('conversation_participants')
      .select(`
        user:users (
          id,
          expo_push_token
        )
      `)
      .eq('conversation_id', conversationId)
      .neq('user_id', senderId)

    if (participantsError) throw participantsError

    // Envoyer les notifications
    const notifications = participants
      .filter(participant => participant.user?.expo_push_token)
      .map(async (participant) => {
        const message = {
          to: participant.user.expo_push_token,
          sound: 'default',
          title: `${senderData.first_name} ${senderData.last_name}`,
          body: messageContent,
          data: {
            conversationId,
            senderId,
          },
        }

        await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        })
      })

    await Promise.all(notifications)

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { 'Content-Type': 'application/json' } },
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}) 