import { serve } from "https://deno.land/std@0.132.0/http/server.ts";
import { stripe } from "../_utils/stripe.ts";
import { createOrRetrieveCustomer } from "../_utils/supabase.ts";

console.log("payment-sheet handler up and running!");
serve(async (req: any) => {
  try {
    // Get the authorization header from the request.
    const authHeader = req.headers.get("Authorization");
    console.log("Auth header:", authHeader ? "Present" : "Missing");
    
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    // Retrieve the logged in user's Stripe customer ID
    console.log("Retrieving customer...");
    const customer = await createOrRetrieveCustomer(authHeader);
    console.log("Customer retrieved:", customer);

    // Create an ephermeralKey
    console.log("Creating ephemeral key...");
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer },
      { apiVersion: "2020-08-27" }
    );
    console.log("Ephemeral key created");

    // Create a PaymentIntent
    console.log("Creating payment intent...");
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: "usd",
      customer: customer,
    });
    console.log("Payment intent created");

    const stripe_pk = Deno.env.get("PUBLIC_STRIPE_PUBLISHABLE_KEY");
    if (!stripe_pk) {
      throw new Error("Missing PUBLIC_STRIPE_PUBLISHABLE_KEY");
    }

    const res = {
      stripe_pk,
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer,
    };
    return new Response(JSON.stringify(res), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in payment-sheet:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});