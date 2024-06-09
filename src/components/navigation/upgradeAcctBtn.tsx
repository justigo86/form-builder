import { getUserForms } from "@/app/actions/getUserForms";
import { MAX_FREE_FORMS } from "@/lib/utils";
import React from "react";
import ProgressBar from "../progressBar";
import SubscribeBtn from "@/app/subscription/SubscribeBtn";
import { auth } from "@/auth";
import { env } from "process";

//upgrade button and account information for sidebar
const UpgradeAcctBtn = async () => {
  const session = await auth();
  const forms = await getUserForms();
  const formCount = forms.length;
  const percent = (formCount / MAX_FREE_FORMS) * 100;
  const userId = session?.user?.id;

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
