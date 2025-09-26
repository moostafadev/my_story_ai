"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function PaymentCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const t = useTranslations("PaymentCallback"); // Assuming you have a PaymentCallback translation file

  useEffect(() => {
    const success = params.get("success");

    if (success === "true") {
      router.replace("/payment-success");
    } else {
      router.replace("/payment-failed");
    }
  }, [params, router]);

  return (
    <section className="flex items-center justify-center h-screen">
      <p className="text-lg">{t("processing_payment")}</p>
    </section>
  );
}
