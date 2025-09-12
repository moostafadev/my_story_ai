"use client";

import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-3xl font-bold text-green-600">
        ✅ Payment Successful!
      </h1>
      <p className="text-lg">Your payment has been confirmed.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
