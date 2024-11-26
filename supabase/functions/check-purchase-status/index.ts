import { serve } from "https://deno.land/std@0.132.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { stripe } from "../_utils/stripe.ts";

console.log("check-purchase-status handler up and running!");

serve(async (req: Request) => {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const { productId, userId } = await req.json();
    
    if (!productId || !userId) {
      throw new Error("Missing productId or userId");
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Check if user has purchased the product
    const { data: purchase, error: purchaseError } = await supabaseClient
      .from('purchases')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .eq('status', 'completed')
      .single();

    if (purchaseError && purchaseError.code !== 'PGRST116') { // PGRST116 is "not found" error
      console.error('Error checking purchases:', purchaseError);
      throw new Error('Failed to check purchase status');
    }

    if (!purchase) {
      return new Response(
        JSON.stringify({
          hasPurchased: false,
          videoUrl: null
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // If purchase exists, get the product details from Stripe
    const product = await stripe.products.retrieve(productId);

    return new Response(
      JSON.stringify({
        hasPurchased: true,
        videoUrl: product.metadata?.videoUrl || null
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
