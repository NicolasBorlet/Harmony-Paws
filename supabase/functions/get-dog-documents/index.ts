import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

serve(async req => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get the dogId from the request
    const { dogId } = await req.json()

    if (!dogId) {
      throw new Error('dogId is required')
    }

    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // List files in the documents folder for this dog
    const { data: files, error } = await supabaseClient.storage
      .from('dogs')
      .list(`${dogId}/documents/`)

    if (error) {
      throw error
    }

    // Sort files by created_at in descending order
    const sortedFiles = files.sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

    // Get signed URLs for each file
    const filesWithUrls = await Promise.all(
      sortedFiles.map(async file => {
        const { data: signedUrl } = await supabaseClient.storage
          .from('dogs')
          .createSignedUrl(`${dogId}/documents/${file.name}`, 3600) // URL valid for 1 hour

        return {
          name: file.name,
          created_at: file.created_at,
          url: signedUrl?.signedUrl,
        }
      }),
    )

    return new Response(JSON.stringify({ files: filesWithUrls }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
