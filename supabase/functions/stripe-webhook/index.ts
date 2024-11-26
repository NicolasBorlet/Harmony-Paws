import { serve } from "https://deno.land/std@0.132.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { stripe } from "../_utils/stripe.ts";

const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

serve(async (req: Request) => {
  try {
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const body = await req.text();
    const sig = req.headers.get('stripe-signature');

    if (!sig || !endpointSecret) {
      throw new Error('Missing stripe signature or webhook secret');
    }

    // Verify the webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Handle the event
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      
      // Update the purchase status to completed
      const { error: updateError } = await supabaseClient
        .from('purchases')
        .update({ status: 'completed' })
        .eq('payment_intent_id', paymentIntent.id);

      if (updateError) {
        console.error('Error updating purchase status:', updateError);
        return new Response('Error updating purchase status', { status: 500 });
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error in stripe-webhook:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
