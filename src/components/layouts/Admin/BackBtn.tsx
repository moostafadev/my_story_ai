"use client";

import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import React from "react";

const BackBtn = () => {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/admin" || pathname === "/admin/") {
    return null;
  }

  const parts = pathname.split("/").filter(Boolean);
  parts.pop();
  const parentPath = "/" + parts.join("/");

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => router.push(parentPath || "/")}
      className="order-1 sm:order-2 self-end"
    >
      <ArrowLeft className="w-4 h-4" />
    </Button>
  );
};

export default BackBtn;
