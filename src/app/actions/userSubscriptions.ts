import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createSubscription({
  stripeCustomerId,
}: {
  stripeCustomerId: string;
}) {
  console.log("Creating subscription");
  await db
    .update(users)
    .set({ subscribed: true })
    .where(eq(users.id, stripeCustomerId));
}

export async function deleteSubscription({
  stripeCustomerId,
}: {
  stripeCustomerId: string;
}) {
  console.log("Deleting subscription");
  await db
    .update(users)
    .set({ subscribed: false })
    .where(eq(users.id, stripeCustomerId));
}
