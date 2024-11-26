import { serve } from "https://deno.land/std@0.132.0/http/server.ts";
import { stripe } from "../_utils/stripe.ts";

console.log("get-products handler up and running!");

serve(async (req: Request) => {
  try {
    // Get the authorization header from the request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    // Fetch active products with their prices
    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price'],
    });

    // Format the products for our frontend
    const formattedProducts = products.data.map((product: any) => {
      const price = product.default_price;
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        priceId: price.id,
        price: price.unit_amount,
        currency: price.currency,
      };
    });

    return new Response(JSON.stringify(formattedProducts), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in get-products:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});
