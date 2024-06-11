import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { price, quantity = 1 } = await req.json();
  const userSession = await auth();
  const userId = userSession?.user?.id;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  // const userEmail = userSession?.user?.email;

  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  //customer information based on stripe api/customer docs
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
  let customer;
  if (user?.stripeCustomerId) {
    // customer created as object
    customer = { id: user.stripeCustomerId };
  } else {
    //if no user customer data, create with customerData
    const customerData = {
      metadata: {
        dbId: userId,
      },
      // email: userEmail,
    };
    const response = await stripe.customers.create(customerData);
    customer = { id: response.id };
    //update database users table with response data
    await db
      .update(users)
      .set({ stripeCustomerId: customer.id })
      .where(eq(users.id, userId));
  }

  try {
    //from Stripe docs for checkout-session
    // const stripe = require('stripe')([key]);
    const session = await stripe.checkout.sessions.create({
      success_url: `${baseUrl}/payment/success`,
      customer: customer.id,
      payment_method_types: ["card"],
      line_items: [
        {
          price,
          quantity,
        },
      ],
      mode: "subscription",
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
  } catch (err) {
    console.error("Error creating checkout session:", err);
  }
}
