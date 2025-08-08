import { BookOpen } from "lucide-react";
import { getTranslations } from "next-intl/server";
import React from "react";
import LanguageSwitcher from "../LanguageSwitcher";
import { Button } from "../ui/button";

const Header = async () => {
  const t = await getTranslations("HomePage");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className={`flex items-center gap-2`}>
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary-foreground flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
        </div>
        <nav className={`hidden md:flex items-center gap-6`}>
          <a
            href="#features"
            className="text-sm font-medium hover:text-primary-foreground duration-300"
          >
            {t("nav.features")}
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium hover:text-primary-foreground duration-300"
          >
            {t("nav.howItWorks")}
          </a>
          <a
            href="#stories"
            className="text-sm font-medium hover:text-primary-foreground duration-300"
          >
            {t("nav.stories")}
          </a>
          <a
            href="#testimonials"
            className="text-sm font-medium hover:text-primary-foreground duration-300"
          >
            {t("nav.testimonials")}
          </a>
        </nav>
        <div className={`flex items-center gap-2`}>
          <LanguageSwitcher />
          <Button size="sm">{t("header.signIn")}</Button>
          <Button className="bg-gradient-to-r from-accent to-accent-foreground text-white">
            {t("header.tryFree")}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
