"use client";

import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/contexts/SidebarContext";

export const SidebarToggleButton = ({ className }: { className?: string }) => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <Button onClick={toggleSidebar} size="icon" className={className}>
      {isOpen ? <X className="!w-5 !h-5" /> : <Menu className="!w-5 !h-5" />}
    </Button>
  );
};
