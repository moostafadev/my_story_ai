"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, "");
    router.push(`/${newLocale}${currentPath}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant={"secondary"}>
          <Languages className="h-4 w-4" />
          <span className="ml-1 text-sm uppercase">{locale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => switchLanguage("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage("ar")}>
          العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
