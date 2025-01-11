// esm.sh is used to compile stripe-node to be compatible with ES modules.
import Stripe from "https://esm.sh/stripe@11.1.0?target=deno";

export const stripe = Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  // This is needed to use the Fetch API rather than relying on the Node http
  // package.
  httpClient: Stripe.createFetchHttpClient(),
  apiVersion: "2024-06-20",
});