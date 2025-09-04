"use client";

import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";

export const SidebarToggleButton = ({ className }: { className?: string }) => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <Button
      onClick={toggleSidebar}
      size="icon"
      className={cn("duration-300", className)}
    >
      {isOpen ? <X className="!w-5 !h-5" /> : <Menu className="!w-5 !h-5" />}
    </Button>
  );
};
