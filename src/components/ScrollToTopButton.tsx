"use client";
import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (scrollTop / docHeight) * 100;

      setVisible(scrollTop > 200);
      setProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 30;
  const circumference = 2 * Math.PI * radius;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-30 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center cursor-pointer duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      } shadow-[0_0_15px_rgba(143,223,213,0.6)] hover:shadow-[0_0_25px_rgba(143,223,213,0.85)]`}
      aria-label="Scroll to top"
    >
      <svg
        className="absolute inset-0 w-full h-full transform -rotate-90"
        viewBox="0 0 64 64"
        fill="none"
      >
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          className="opacity-20"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (progress / 100) * circumference}
          strokeLinecap="round"
        />
      </svg>
      <ArrowUp className="relative z-10 w-5 h-5" />
    </button>
  );
};

export default ScrollToTopButton;
