"use client";

import { useEffect, useState } from "react";

export function useOTPManager(length: number = 6, expiry: number = 15) {
  const [value, setValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(expiry * 60); // expiry in minutes

  // countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const reset = () => {
    setValue("");
    setTimeLeft(expiry * 60);
  };

  return {
    value,
    setValue,
    timeLeft,
    reset,
    length,
  };
}
