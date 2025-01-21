import { serve } from 'https://deno.land/std@0.132.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { stripe } from '../_utils/stripe.ts'
import { createOrRetrieveCustomer } from '../_utils/supabase.ts'

console.log('payment-sheet handler up and running!')

serve(async (req: Request) => {
  try {
    // Get the authorization header from the request.
    const authHeader = req.headers.get('Authorization')
    console.log('Auth header:', authHeader ? 'Present' : 'Missing')

    if (!authHeader) {
      throw new Error('No authorization header')
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Get the user ID from the auth header
    const token = authHeader.replace('Bearer ', '')
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser(token)

    if (userError || !user) {
      throw new Error('Failed to get user from token')
    }

    // Retrieve the logged in user's Stripe customer ID
    console.log('Retrieving customer...')
    const customer = await createOrRetrieveCustomer(authHeader)
    console.log('Customer retrieved:', customer)

    // Get the product ID from the request body
    const { priceId } = await req.json()
    if (!priceId) {
      throw new Error('No priceId provided')
    }

    // Get the product details from Stripe
    const price = await stripe.prices.retrieve(priceId)
    if (!price.product) {
      throw new Error('No product associated with this price')
    }

    // Create an ephermeralKey
    console.log('Creating ephemeral key...')
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer },
      { apiVersion: '2020-08-27' },
    )
    console.log('Ephemeral key created')

    // Create a PaymentIntent
    console.log('Creating payment intent...')
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price.unit_amount || 0,
      currency: price.currency,
      customer: customer,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        userId: user.id,
        productId:
          typeof price.product === 'string' ? price.product : price.product.id,
      },
    })
    console.log('Payment intent created')

    // Check if purchase already exists
    const { data: existingPurchase } = await supabaseClient
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .eq(
        'product_id',
        typeof price.product === 'string' ? price.product : price.product.id,
      )
      .single()

    if (existingPurchase) {
      // If purchase exists and is completed, return error
      if (existingPurchase.status === 'completed') {
        throw new Error('You have already purchased this product')
      }
      // If purchase exists but is pending, update it
      const { error: updateError } = await supabaseClient
        .from('purchases')
        .update({
          payment_intent_id: paymentIntent.id,
          status: 'pending',
        })
        .eq('id', existingPurchase.id)

      if (updateError) {
        console.error('Error updating purchase:', updateError)
        throw new Error('Failed to update purchase')
      }
    } else {
      // Create new purchase if it doesn't exist
      const { error: purchaseError } = await supabaseClient
        .from('purchases')
        .insert({
          user_id: user.id,
          product_id:
            typeof price.product === 'string'
              ? price.product
              : price.product.id,
          price_id: priceId,
          payment_intent_id: paymentIntent.id,
          status: 'pending',
        })

      if (purchaseError) {
        console.error('Error recording purchase:', purchaseError)
        throw new Error('Failed to record purchase')
      }
    }

    const stripe_pk = Deno.env.get('PUBLIC_STRIPE_PUBLISHABLE_KEY')
    if (!stripe_pk) {
      throw new Error('Missing PUBLIC_STRIPE_PUBLISHABLE_KEY')
    }

    const res = {
      stripe_pk,
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer,
    }
    return new Response(JSON.stringify(res), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error in payment-sheet:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
