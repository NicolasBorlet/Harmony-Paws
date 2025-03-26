import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

serve(async req => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { userId } = await req.json()

    if (!userId) {
      throw new Error('userId is required')
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Essayer d'abord avec .jpeg
    let { data: signedUrlData, error: signedUrlError } =
      await supabaseClient.storage
        .from('users')
        .createSignedUrl(`${userId}.jpeg`, 3600)

    // Si ça échoue, essayer avec .jpg
    if (signedUrlError) {
      const jpgResult = await supabaseClient.storage
        .from('users')
        .createSignedUrl(`${userId}.jpg`, 3600)

      signedUrlData = jpgResult.data
      signedUrlError = jpgResult.error
    }

    // Si les deux tentatives échouent, retourner null
    if (signedUrlError) {
      return new Response(JSON.stringify({ url: null }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200, // On retourne 200 même si pas d'image
      })
    }

    return new Response(JSON.stringify({ url: signedUrlData.signedUrl }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
