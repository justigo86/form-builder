import {
  createSubscription,
  deleteSubscription,
} from "@/app/actions/userSubscriptions";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

//customer/user events completed with /actions
const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export async function POST(req: Request) {
  const sig = req.headers.get("Stripe-Signature") as string;
  const body = await req.text();

  // if (!process.env.STRIPE_LOCAL_WEBHOOK_SECRET) {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not set");
  }
  if (!sig) {
    return null;
  }

  const event = stripe.webhooks.constructEvent(
    // await req.text(),
    body,
    sig,
    // process.env.STRIPE_LOCAL_WEBHOOK_SECRET
    process.env.STRIPE_WEBHOOK_SECRET
  );

  const data = event.data.object as Stripe.Subscription;
  // console.log(data);
  // console.log(event.type);

  //switch cases for customer events
  if (relevantEvents.has(event.type)) {
    switch (event.type) {
      case "customer.subscription.created": {
        await createSubscription({
          stripeCustomerId: data.customer as string,
        });
        break;
      }
      case "customer.subscription.deleted": {
        await deleteSubscription({
          stripeCustomerId: data.customer as string,
        });
        break;
      }
      default: {
        break;
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
