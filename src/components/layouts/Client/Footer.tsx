"use client";
import React from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Mail,
  Phone,
  Twitter,
  Instagram,
  Facebook,
  ArrowUpRight,
} from "lucide-react";

interface FooterProps {
  emailSupport: string;
  phoneSupport: string;
  className?: string;
}

export default function Footer({
  className = "",
  emailSupport,
  phoneSupport,
}: FooterProps) {
  const t = useTranslations("HomePage.Footer");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const year = new Date().getFullYear();

  const sections = [
    { key: "nav.features", href: "#features" },
    { key: "nav.stories", href: "#stories" },
    { key: "nav.faqs", href: "#faqs" },
  ];

  return (
    <footer
      className={`relative bg-secondary text-secondary-foreground overflow-hidden ${className} select-none`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Main footer */}
      <div className="relative container mx-auto pt-12 pb-10 px-6 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-6 items-center md:flex-[3] mx-auto">
            <Link
              href="/"
              className="group flex items-center gap-3 transition-all duration-300 hover:scale-105 w-fit mx-auto"
            >
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt={t("logoAlt")}
                  width={160}
                  height={160}
                  priority
                  className="transition-all duration-300 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg opacity-0 group-hover:opacity-80 transition-opacity duration-300 blur-lg" />
              </div>
            </Link>

            <div className="space-y-3">
              <p className="max-w-md leading-relaxed">
                {t("taglineLine1")} <br />
                <span className="font-semibold bg-gradient-to-r from-primary-foreground to-accent-foreground bg-clip-text text-transparent">
                  {t("taglineLine2")}
                </span>
              </p>

              {/* Social links with enhanced styling */}
              <div className="flex items-center gap-4 mt-6 justify-center">
                {[
                  {
                    href: "https://twitter.com",
                    icon: Twitter,
                    label: "twitter",
                    color: "hover:text-blue-400",
                  },
                  {
                    href: "https://instagram.com",
                    icon: Instagram,
                    label: "instagram",
                    color: "hover:text-pink-400",
                  },
                  {
                    href: "https://facebook.com",
                    icon: Facebook,
                    label: "facebook",
                    color: "hover:text-blue-500",
                  },
                ].map(({ href, icon: Icon, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`group relative p-2 rounded-full bg-secondary-foreground/90 text-secondary backdrop-blur-sm border border-slate-700/50 transition-all duration-300 hover:scale-110 hover:shadow-lg ${color} hover:border-current/30`}
                  >
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />
                    <div className="absolute inset-0 rounded-full bg-current opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links sections */}
          <div className="flex flex-col gap-4 md:flex-[2]">
            <h4 className="font-semibold text-lg flex items-center gap-2 text-foreground">
              {t("sections.title")}
            </h4>
            <ul className="flex flex-col gap-3">
              {sections.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="group flex items-center gap-2 hover:text-foreground transition-all duration-300 hover:translate-x-1"
                  >
                    <span>{t(s.key)}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact section */}
          <div className="flex flex-col gap-4 md:flex-[2]">
            <h4 className="font-semibold text-lg text-foreground">
              {t("contact.title")}
            </h4>
            <ul className="space-y-5">
              {[
                {
                  icon: Mail,
                  title: t("contact.emailTitle"),
                  content: emailSupport,
                  isLink: true,
                  href: `mailto:${emailSupport}`,
                  color: "text-secondary",
                },
                {
                  icon: Phone,
                  title: t("contact.phoneTitle"),
                  content: `+20 ${phoneSupport.slice(
                    1,
                    4
                  )} ${phoneSupport.slice(4, 7)} ${phoneSupport.slice(7)}`,
                  isLink: true,
                  href: `tel:+20${phoneSupport.slice(1)}`,
                  color: "text-white",
                },
              ].map(
                (
                  { icon: Icon, title, content, isLink, href, color },
                  index
                ) => (
                  <li key={index} className="group flex items-start gap-4">
                    <div
                      className={`p-2 rounded-lg bg-secondary-foreground/90 ${color} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="font-medium text-foreground">{title}</div>
                      {isLink ? (
                        <a
                          href={href}
                          className="block  hover:text-foreground transition-colors duration-300 hover:underline"
                          dir="ltr"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="">{content}</div>
                      )}
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Enhanced footer bottom */}
      <div className="relative border-t border-secondary-foreground/50 bg-secondary-foreground backdrop-blur-sm">
        <div className="container mx-auto flex items-center py-4 px-4 gap-2 justify-center">
          <p className="text-xs text-white">© {t("rightsReserved")}</p>
          <p className="text-white flex items-center gap-2 text-sm">
            <span>
              {t("copyrightText", { year: "" }).replace(/^\d+\s*/, "")}
            </span>
            <span>{year}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
