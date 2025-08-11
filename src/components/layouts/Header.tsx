"use client";

import React, { useEffect, useState } from "react";
import LanguageSwitcher from "../LanguageSwitcher";
import { Button } from "../ui/button";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { navData } from "./navData";
import { Link } from "@/i18n/navigation";

const Header = () => {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isRTL = locale === "ar";

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScroll / scrollHeight) * 100;
      setScrollY(currentScroll);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full border-b backdrop-blur-md duration-300",
        scrollY > 0 ? "bg-white/80 shadow-sm" : "bg-background"
      )}
    >
      <div
        className="absolute inset-0 h-full transition-all duration-75"
        style={{
          background: `linear-gradient(to ${
            isRTL ? "left" : "right"
          }, var(--background) ${scrollProgress}%, transparent ${scrollProgress}%)`,
          zIndex: 0,
        }}
      />

      <div
        className={cn(
          "container mx-auto flex items-center justify-between px-4 duration-300 relative z-10",
          scrollY > 0 ? "h-16" : "h-20"
        )}
      >
        <Link
          href={"/"}
          className="flex items-center justify-center"
          title="My Story AI"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={120}
            className={cn("duration-300", scrollY > 0 ? "w-14" : "w-16")}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navData.map(({ title, href }, idx) => (
            <Link
              href={`/${href}`}
              title={t(title)}
              key={idx + href}
              className={cn(
                "font-medium hover:text-primary-foreground duration-300",
                scrollY > 0 ? "text-sm" : "text-base"
              )}
            >
              {t(title)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button
            size={scrollY > 0 ? "sm" : "default"}
            className="hidden lg:block"
            title={t("header.signIn")}
          >
            {t("header.signIn")}
          </Button>
          <Button
            className="bg-gradient-to-r from-accent to-accent-foreground text-white transition hover:from-accent-foreground hover:to-accent"
            size={scrollY > 0 ? "sm" : "default"}
            title={t("header.tryFree")}
          >
            {t("header.tryFree")}
          </Button>

          <Button
            className="lg:hidden relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            size={"icon"}
          >
            <span
              className={cn(
                "absolute top-[9px] left-[6px] w-6 h-[3px] bg-primary-foreground rounded-xl duration-300",
                mobileMenuOpen ? "translate-y-2 rotate-45 left-1 w-7" : ""
              )}
            />
            <span
              className={cn(
                "absolute top-[17px] left-[6px] w-6 h-[3px] bg-primary-foreground rounded-xl duration-300",
                mobileMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
              )}
            />
            <span
              className={cn(
                "absolute top-[25px] left-[6px] w-6 h-[3px] bg-primary-foreground rounded-xl duration-300",
                mobileMenuOpen ? "-translate-y-2 -rotate-45 left-1 w-7" : ""
              )}
            />
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden absolute top-full left-0 w-full bg-gradient-to-b from-background to-background/95 backdrop-blur-md shadow-md z-40 duration-300 overflow-hidden",
          mobileMenuOpen
            ? scrollY > 0
              ? "h-[calc(100vh-4rem)]"
              : "h-[calc(100vh-5rem)]"
            : "h-0"
        )}
      >
        <div className="flex flex-col items-start p-4 space-y-4">
          {navData.map(({ title, href }, idx) => (
            <Link
              href={`/${href}`}
              title={t(title)}
              key={idx + href}
              className="w-full text-start py-2 hover:text-primary-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t(title)}
            </Link>
          ))}
          <Button
            className="w-full"
            onClick={() => setMobileMenuOpen(false)}
            title={t("header.signIn")}
          >
            {t("header.signIn")}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
