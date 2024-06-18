import { getUserForms } from "@/app/actions/getUserForms";
import { MAX_FREE_FORMS } from "@/lib/utils";
import React from "react";
import ProgressBar from "../progressBar";
import SubscribeBtn from "@/app/subscription/SubscribeBtn";
import { getUserSubscription } from "@/app/actions/userSubscriptions";
import { auth } from "@/auth";

//upgrade button and account information for sidebar
const UpgradeAcctBtn = async () => {
  const session = await auth();
  const forms = await getUserForms();
  const formCount = forms.length;
  const percent = (formCount / MAX_FREE_FORMS) * 100;
  const userId = session?.user?.id;

  //if the user is subscribed or does not have an ID, do not show button
  if (!userId) {
    return null;
  }
  const subscription = await getUserSubscription({ userId });
  if (subscription) {
    return null;
  }

  return (
    <div className="p-4 mb-4 text-left text-xs">
      <ProgressBar value={percent} />
      <p>
        {formCount} out of {MAX_FREE_FORMS} forms generated
      </p>
      <p>
        <SubscribeBtn
          userId={userId}
          price={process.env.STRIPE_PRICE_API_KEY!}
        />{" "}
        for unlimited forms.
      </p>
    </div>
  );
};

export default UpgradeAcctBtn;
