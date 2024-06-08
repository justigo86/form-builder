import { auth } from "@/auth";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const { price, quantity = 1 } = await req.json();
  const userSession = await auth();
  const userId = userSession?.user?.id;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  //from Stripe docs for checkout-session
  // const stripe = require('stripe')([key]);
  const session = await stripe.checkout.sessions.create({
    success_url: `${baseUrl}/payment/success`,
    customer: userId,
    payment_method_types: ["card"],
    line_items: [
      {
        price,
        quantity,
      },
    ],
    mode: "payment",
  });

  if (session) {
    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
    });
  } else {
    return new Response(
      JSON.stringify({ error: "Failed to create checkout session" }),
      {
        status: 500,
      }
    );
  }
}
