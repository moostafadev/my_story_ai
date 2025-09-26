"use client";

import { Button } from "@/components/ui/button";
import { STORYTYPE } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

interface IProps {
  id: string;
  storyPrice: number;
  deliveryPrice: number;
  totalPrice: number;
  storyType: STORYTYPE;
}

const CheckoutSection = ({
  order: { deliveryPrice, storyPrice, storyType, totalPrice },
}: {
  order: IProps;
}) => {
  const t = useTranslations("CheackoutPage");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  console.log(searchParams.get("type"));

  const handlePay = async () => {
    setLoading(true);

    const res = await fetch("/api/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalPrice, currency: "EGP" }),
    });

    const data = await res.json();

    if (data.checkout_url) {
      window.location.href = data.checkout_url;
    } else {
      alert("Payment init failed");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
      <div className="flex flex-col gap-2">
        {storyType !== "PDF" && (
          <>
            <div className="flex items-center gap-1">
              <span>{t("priceCreateStory")} :</span>
              <span className="font-bold">{storyPrice} EGP</span>
            </div>
            <div className="flex items-center gap-1">
              <span>{t("priceShipping")} :</span>
              <span className="font-bold">{deliveryPrice} EGP</span>
            </div>
          </>
        )}
        <div className="flex items-center gap-1">
          <span>{t("totalPrice")} :</span>
          <span className="font-bold">{totalPrice} EGP</span>
        </div>
      </div>
      {searchParams.get("type") === "visa" && (
        <Button onClick={handlePay} loading={loading} variant={"secondarySub"}>
          {t("payButton")}
        </Button>
      )}
    </div>
  );
};

export default CheckoutSection;
