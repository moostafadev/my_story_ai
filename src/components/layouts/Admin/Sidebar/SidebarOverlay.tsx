"use client";

import { cn } from "@/lib/utils";
import { sidebarOpenOverlay } from "./manageSidebar";
import { useSidebar } from "@/contexts/SidebarContext";

export const SidebarOverlay = () => {
  const { isOpen, setSidebarOpen } = useSidebar();

  const handleClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div
      className={cn(
        "md:hidden fixed h-full bg-gray-100 z-10 left-0 top-0 duration-300 w-[20%]",
        sidebarOpenOverlay(isOpen)
      )}
      onClick={handleClose}
    />
  );
};
