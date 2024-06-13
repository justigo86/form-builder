import { auth, signIn } from "@/auth";
import React from "react";
import ManageSubscription from "./ManageSubscription";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { db } from "@/db";

const page = async () => {
  const session = await auth();

  //using || due to overload errors with eq later
  if (!session || !session.user || !session.user.id) {
    signIn();
    return null;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, session?.user?.id),
  });

  const plan = user?.subscribed ? "premium" : "free";

  return (
    <div className="p-4 rounded-md">
      <h1 className="text-4xl mb-3">Subscription Details</h1>
      <p className="mb-3">You are currently on the {plan} plan</p>
      <ManageSubscription />
    </div>
  );
};

export default page;
