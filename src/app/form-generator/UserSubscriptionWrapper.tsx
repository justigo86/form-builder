import { auth } from "@/auth";
import React from "react";
import { getUserSubscription } from "../actions/userSubscriptions";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { forms } from "@/db/schema";
import { MAX_FREE_FORMS } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

const UserSubscriptionWrapper = async (props: Props) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return null;
  }

  const subscription = await getUserSubscription({ userId });
  if (subscription) {
    return props.children;
  }

  const userForms = await db.query.forms.findMany({
    where: eq(forms.userId, userId),
  });
  const userFormsCount = userForms.length;

  //subscription has to be first for if statement due to possibly being undefined
  if (subscription || userFormsCount < MAX_FREE_FORMS) {
    return props.children;
  }

  return (
    <Button disabled>
      <Lock className="w-4 h-4 mr-2" />
      Upgrade account for more forms
    </Button>
  );
};

export default UserSubscriptionWrapper;
