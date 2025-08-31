"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { removeUserCookies } from "@/lib/cookies";

const LogoutBtn = ({ className }: { className?: string }) => {
  const t = useTranslations("HomePage.header");
  const [loading, setLoading] = useState(false);
  return (
    <Button
      variant={"destructive"}
      className={cn("self-end", className)}
      onClick={async () => {
        setLoading(true);
        await removeUserCookies();
        setLoading(false);
      }}
      loading={loading}
    >
      {t("logout")}
    </Button>
  );
};

export default LogoutBtn;
