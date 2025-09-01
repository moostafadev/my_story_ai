"use client";

import { SidebarContext } from "@/contexts/SidebarContext";
import { ReactNode, useState } from "react";

interface SidebarProviderProps {
  children: ReactNode;
  defaultOpen?: boolean;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const setSidebarOpen = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar, setSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};
