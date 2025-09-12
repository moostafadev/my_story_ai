"use client";

import React, { useEffect, useRef, useState } from "react";
import LanguageSwitcher from "../../LanguageSwitcher";
import { Button } from "../../ui/button";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { navData } from "./navData";
import { Link, usePathname } from "@/i18n/navigation";
import LinkNext from "next/link";
import { User } from "./types";
import { CircleUserRound } from "lucide-react";

const Header = ({ user }: { user: User }) => {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const pathName = usePathname();
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isRTL = locale === "ar";
  const loginLink = "/login";
  const isOnRegisterPage = pathName === "/login";
  const isOnProfilePage = pathName === "/profile";

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full duration-300",
        scrollY > 0 ? "bg-background/90 shadow-sm" : "bg-background"
      )}
    >
      <div
        className="absolute inset-0 h-full transition-all duration-75"
        style={{
          background: `linear-gradient(to ${
            isRTL ? "left" : "right"
          }, var(--background-accent) ${scrollProgress}%, transparent ${scrollProgress}%)`,
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
          {!isOnRegisterPage && !user.userId && (
            <Link href={loginLink} className="hidden lg:flex">
              <Button
                size={scrollY > 0 ? "sm" : "default"}
                title={t("header.signIn")}
                variant={"outlineSub"}
              >
                {t("header.signIn")}
              </Button>
            </Link>
          )}

          {user.userId && !isOnProfilePage && (
            <LinkNext
              href={`${isRTL ? "ar" : "en"}/profile`}
              className="hidden lg:flex"
            >
              <Button
                size={"icon"}
                title={t("header.profile")}
                variant={"outlineSub"}
                onClick={() => setMobileMenuOpen(false)}
              >
                <CircleUserRound className="!h-5 !w-5" />
              </Button>
            </LinkNext>
          )}

          <Button
            ref={buttonRef}
            className="lg:hidden relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            size={"icon"}
          >
            <span
              className={cn(
                "absolute top-[9px] left-[6px] w-6 h-[3px] bg-background rounded-xl duration-300",
                mobileMenuOpen ? "translate-y-2 rotate-45 left-1 w-7" : ""
              )}
            />
            <span
              className={cn(
                "absolute top-[17px] left-[6px] w-6 h-[3px] bg-background rounded-xl duration-300",
                mobileMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
              )}
            />
            <span
              className={cn(
                "absolute top-[25px] left-[6px] w-6 h-[3px] bg-background rounded-xl duration-300",
                mobileMenuOpen ? "-translate-y-2 -rotate-45 left-1 w-7" : ""
              )}
            />
          </Button>
        </div>
      </div>

      <div
        ref={menuRef}
        className={cn(
          "lg:hidden absolute top-full left-0 w-full bg-gradient-to-b from-background to-background/60 z-40 duration-300 overflow-hidden backdrop-blur-md",
          mobileMenuOpen
            ? scrollY > 0
              ? "h-[calc(100vh-4rem)]"
              : "h-[calc(100vh-5rem)]"
            : "h-0"
        )}
      >
        <div className="flex flex-col items-start p-4 gap-4">
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
          {!isOnRegisterPage && !user.userId && (
            <Link
              href={loginLink}
              onClick={() => setMobileMenuOpen(false)}
              className="self-end"
            >
              <Button variant={"secondary"} title={t("header.signIn")}>
                {t("header.signIn")}
              </Button>
            </Link>
          )}
          {user.userId && !isOnProfilePage && (
            <LinkNext
              href={`${isRTL ? "ar" : "en"}/profile`}
              className="flex lg:hidden self-end"
            >
              <Button
                size={"icon"}
                title={t("header.profile")}
                variant={"outlineSub"}
                onClick={() => setMobileMenuOpen(false)}
              >
                <CircleUserRound className="!h-5 !w-5" />
              </Button>
            </LinkNext>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
