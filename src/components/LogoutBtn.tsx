"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { removeUserCookies } from "@/lib/cookies";

const LogoutBtn = ({
  title,
  className,
  children,
}: {
  title?: string;
  className?: string;
  children?: React.ReactNode;
}) => {
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
      {children ? children : title}
    </Button>
  );
};

export default LogoutBtn;
