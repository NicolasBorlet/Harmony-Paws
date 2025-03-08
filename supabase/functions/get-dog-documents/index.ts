import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface StorageFile {
  name: string
  created_at: string
  id?: string
  last_accessed_at?: string
  metadata?: Record<string, any>
  updated_at?: string
}

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
    const currentDate = new Date()
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    ).toISOString()
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    ).toISOString()

    const { data: files, error } = await supabaseClient.storage
      .from('dogs')
      .list(`${dogId}/documents/`, {
        sortBy: { column: 'created_at', order: 'desc' },
        filter: {
          created_at: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
      })

    if (error) {
      throw error
    }

    // Get signed URLs for each file
    const filesWithUrls = await Promise.all(
      files.map(async (file: StorageFile) => {
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
