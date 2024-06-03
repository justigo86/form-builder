import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const page = () => {
  return (
    <Alert>
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        You have submitted the form successfully.
      </AlertDescription>
    </Alert>
  );
};

export default page;
