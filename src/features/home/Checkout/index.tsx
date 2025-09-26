"use client";
import { Button } from "@/components/ui/button";
import { STORYTYPE } from "@prisma/client";
import { useTranslations } from "next-intl";
import { redirect, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { updateOrderStateAction } from "./address.action";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface IProps {
  id: string;
  storyPrice: number;
  deliveryPrice: number;
  totalPrice: number;
  storyType: STORYTYPE;
}

const CheckoutSection = ({
  order: { deliveryPrice, storyPrice, storyType, totalPrice, id },
}: {
  order: IProps;
}) => {
  const t = useTranslations("CheackoutPage");
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");
  const searchParams = useSearchParams();

  const handlePay = async () => {
    setLoading(true);

    try {
      await updateOrderStateAction(id, {
        cNote: note,
      });

      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPrice,
          currency: "EGP",
          note,
          orderId: id,
        }),
      });

      const data = await res.json();

      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        toast("Payment init failed");
        setLoading(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast("Payment initialization failed");
      setLoading(false);
    }
  };

  const handleCOD = async () => {
    setLoading(true);
    const res = await updateOrderStateAction(id, {
      state: "PAID", // For COD, we can immediately set to PAID
      cNote: note,
    });

    if (res.success) {
      redirect("/profile");
    }
    setLoading(false);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "EGP",
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center bg-gray-50 p-6 rounded-lg shadow-lg w-full md:max-w-[1000px]">
      <div className="flex flex-col gap-4 w-full">
        {storyType !== "PDF" && (
          <>
            <div className="flex justify-between">
              <span className="text-sm text-gray-700">
                {t("priceCreateStory")}:
              </span>
              <span className="font-bold text-gray-900">
                {formatPrice(storyPrice)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-700">
                {t("priceShipping")}:
              </span>
              <span className="font-bold text-gray-900">
                {formatPrice(deliveryPrice)}
              </span>
            </div>
          </>
        )}
        <div className="flex justify-between border-t pt-4">
          <span className="text-base text-gray-800">{t("totalPrice")}:</span>
          <span className="font-bold text-xl text-gray-900">
            {formatPrice(totalPrice)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <Textarea
          placeholder={t("notePlaceholder")}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-4 border rounded-lg shadow-md text-gray-800"
          rows={4}
        />

        {searchParams.get("type") === "visa" && (
          <Button
            onClick={handlePay}
            loading={loading}
            variant={"secondarySub"}
            className="w-full py-3 text-lg"
          >
            {t("payButton")}
          </Button>
        )}
        {searchParams.get("type") === "cod" && (
          <Button
            onClick={handleCOD}
            loading={loading}
            variant={"secondarySub"}
            className="w-full py-3 text-lg"
          >
            {t("submit")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CheckoutSection;
