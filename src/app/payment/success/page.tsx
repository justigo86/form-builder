import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

//copied template from /forms/[formId]/success page
const page = () => {
  return (
    <Alert>
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        Your account has been updated.
        <Link href="/view-forms" className="underline">
          Account Dashboard
        </Link>
      </AlertDescription>
    </Alert>
  );
};

export default page;
