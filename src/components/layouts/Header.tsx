"use client";

import React, { useEffect, useState } from "react";
import LanguageSwitcher from "../LanguageSwitcher";
import { Button } from "../ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { navData } from "./navData";
import { Link } from "@/i18n/navigation";

const Header = () => {
  const t = useTranslations("HomePage");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
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
        className={cn(
          "container mx-auto flex items-center justify-between px-4 duration-300",
          scrollY > 0 ? "h-16" : "h-20"
        )}
      >
        <Link
          href={"/"}
          className={`flex items-center justify-center`}
          title="My Story AI"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={120}
            className={cn("duration-300", scrollY > 0 ? "w-14" : "w-16")}
          />
        </Link>
        <nav className={`hidden md:flex items-center gap-6`}>
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
        <div className={`flex items-center gap-2`}>
          <LanguageSwitcher />
          <Button
            size={scrollY > 0 ? "sm" : "default"}
            title={t("header.signIn")}
          >
            {t("header.signIn")}
          </Button>
          <Button
            className="bg-gradient-to-r from-accent to-accent-foreground text-white transition-colors hover:from-accent-foreground hover:to-accent"
            size={scrollY > 0 ? "sm" : "default"}
            title={t("header.tryFree")}
          >
            {t("header.tryFree")}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
