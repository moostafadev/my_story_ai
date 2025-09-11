"use client";

import { useState } from "react";

const ContinuePage = () => {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);

    const res = await fetch("/api/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 100, currency: "EGP" }),
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
    <div className="flex flex-col items-center gap-4 p-10">
      <h1 className="text-2xl font-bold">Checkout Page</h1>
      <button
        onClick={handlePay}
        disabled={loading}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700"
      >
        {loading ? "Processing..." : "Pay 100 EGP"}
      </button>
    </div>
  );
};

export default ContinuePage;
