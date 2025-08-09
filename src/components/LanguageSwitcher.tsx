"use client";

import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    const currentPath = pathname.replace(`/${locale}`, "");
    router.push(`/${newLocale}${currentPath}`);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size={"icon"} variant={"secondary"} onClick={switchLanguage}>
          <Languages className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{locale === "en" ? "العربية" : "English"}</TooltipContent>
    </Tooltip>
  );
};

export default LanguageSwitcher;
