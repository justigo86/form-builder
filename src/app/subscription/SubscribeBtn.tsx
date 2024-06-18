"use client";
import { getStripe } from "@/lib/stripe-client";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  userId?: string;
  price: string;
};

const SubscribeBtn = ({ userId, price }: Props) => {
  const router = useRouter();

  const handleCheckout = async (price: string) => {
    if (!userId) {
      router.push("/login");
    }

    try {
      const { sessionId } = await fetch("api/stripe/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }),
      }).then((res) => res.json());

      // console.log("sessionId:", sessionId);
      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (err) {
      console.log("Error:", err);
    }
  };
  return (
    <button className="underline" onClick={() => handleCheckout(price)}>
      Upgrade your plan
    </button>
  );
};

export default SubscribeBtn;
