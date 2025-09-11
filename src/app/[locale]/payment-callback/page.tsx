"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const success = params.get("success");

    if (success === "true") {
      router.replace("/payment-success");
    } else {
      router.replace("/payment-failed");
    }
  }, [params, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg">Processing your payment result...</p>
    </div>
  );
}
