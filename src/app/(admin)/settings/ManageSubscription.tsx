"use client";
//useclient because will include a subscription button
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const ManageSubscription = () => {
  const router = useRouter();

  const redirectToCustomerPortal = async () => {
    try {
      const res = await fetch("api/stripe/create-portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { url } = await res.json();
      router.push(url.url);
    } catch (err) {
      console.error("Error redirecting to portal.", err);
    }
  };

  return (
    <Button onClick={redirectToCustomerPortal}>Change Subscription</Button>
  );
};

export default ManageSubscription;
