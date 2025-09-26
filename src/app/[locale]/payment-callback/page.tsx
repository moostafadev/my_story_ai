"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { updateOrderStateAction } from "@/features/home/Checkout/address.action";

export default function PaymentCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const t = useTranslations("PaymentCallback");
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processPayment = async () => {
      const success = params.get("success");
      const orderId = params.get("order_id");

      if (success === "true" && orderId) {
        try {
          const updateResult = await updateOrderStateAction(orderId, {
            state: "PAID",
          });

          if (updateResult.success) {
            console.log(`Order ${orderId} updated to PAID successfully`);
            router.replace("/payment-success");
          } else {
            console.error("Failed to update order state:", updateResult);
            router.replace("/payment-success");
          }
        } catch (error) {
          console.error("Error updating order state:", error);
          router.replace("/payment-success");
        }
      } else {
        router.replace("/payment-failed");
      }

      setIsProcessing(false);
    };

    const timer = setTimeout(() => {
      processPayment();
    }, 1000);

    return () => clearTimeout(timer);
  }, [params, router]);

  if (isProcessing) {
    return (
      <section className="flex flex-col items-center justify-center h-screen gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-lg">{t("processing_payment")}</p>
      </section>
    );
  }

  return null;
}
