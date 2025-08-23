"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;

    const scrolled = (scrollTop / (fullHeight - windowHeight)) * 100;

    setVisible(scrollTop > 100);
    setProgress(Math.min(Math.max(scrolled, 0), 100));
  }, []);

  useEffect(() => {
    const options = { passive: true };

    window.addEventListener("scroll", handleScroll, options);
    window.addEventListener("touchmove", handleScroll, options);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [handleScroll]);

  const scrollToTop = useCallback(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isSafari || isIOS) {
      const scrollToTopSmooth = () => {
        const currentScroll =
          window.scrollY || document.documentElement.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(scrollToTopSmooth);
          window.scrollTo(0, currentScroll - currentScroll / 8);
        }
      };
      scrollToTopSmooth();
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

  const radius = 30;
  const circumference = 2 * Math.PI * radius;

  const dashOffset = Number.isFinite(progress)
    ? circumference - (progress / 100) * circumference
    : circumference;

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-4 right-4 z-50 
        w-12 h-12 sm:w-14 sm:h-14
        rounded-full 
        bg-primary hover:primary/80 active:bg-primary/70
        text-white 
        flex items-center justify-center 
        transition-all duration-300 ease-in-out
        transform hover:scale-110 active:scale-95
        ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }
        shadow-lg hover:shadow-xl
        touch-manipulation
        select-none
        focus:outline-none focus:ring-4 focus:ring-primary/50
        cursor-pointer
      `}
      aria-label="العودة للأعلى"
      type="button"
      style={{
        WebkitTapHighlightColor: "transparent",
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full transform -rotate-90"
        viewBox="0 0 64 64"
        fill="none"
        style={{ pointerEvents: "none" }}
      >
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="currentColor"
          strokeWidth="3"
          className="opacity-20"
          fill="none"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          className="transition-all duration-150 ease-out"
          fill="none"
        />
      </svg>

      <ArrowUp
        className="relative z-10 w-6 h-6 sm:w-5 sm:h-5"
        strokeWidth={2.5}
      />
    </button>
  );
};

export default ScrollToTopButton;
