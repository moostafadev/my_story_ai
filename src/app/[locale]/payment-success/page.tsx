"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { updateOrderStateAction } from "@/features/home/Checkout/address.action";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  const [isUpdated, setIsUpdated] = useState(false);
  const searchParams = useSearchParams();
  const t = useTranslations("PaymentSuccess");

  useEffect(() => {
    const updateOrder = async () => {
      const orderId = searchParams.get("order_id");

      if (orderId && !isUpdated) {
        try {
          await updateOrderStateAction(orderId, {
            state: "PAID",
          });
          setIsUpdated(true);
          console.log(`Order ${orderId} updated to PAID`);
        } catch (error) {
          console.error("Failed to update order:", error);
        }
      }
    };

    updateOrder();
  }, [searchParams, isUpdated]);

  return (
    <section className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-3xl font-bold text-green-600">
        ✅ {t("payment_successful")}
      </h1>
      <p className="text-lg">{t("payment_confirmation")}</p>
      <div className="flex gap-4">
        <Button asChild variant="secondarySub">
          <Link href="/">{t("go_to_homepage")}</Link>
        </Button>
      </div>
    </section>
  );
}
