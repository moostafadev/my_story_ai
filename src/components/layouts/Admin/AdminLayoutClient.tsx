"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/SidebarContext";
import SidebarCore from "./Sidebar/SidebarCore";
import { Toaster } from "sonner";

const AdminLayoutClient = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useSidebar();

  return (
    <>
      <SidebarCore />
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-10 h-16 p-4 pr-14 flex bg-white shadow-sm duration-300",
          isOpen ? "md:mr-64" : "md:mr-20"
        )}
      ></header>
      <main
        className={cn(
          "!mr-16 m-2 mt-[72px] p-3 md:p-4 space-y-4 md:space-y-8 rounded-md shadow-sm hover:shadow-md bg-white min-h-[calc(100vh-72px-8px)] transition-[margin-right] duration-300",
          isOpen ? "md:!mr-[264px]" : "md:!mr-[88px]"
        )}
      >
        {children}
      </main>
      <Toaster />
    </>
  );
};

export default AdminLayoutClient;
