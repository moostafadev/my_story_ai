"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { sidebarSelectItem } from "./manageSidebar";
import { SidebarItem } from "./types";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/contexts/SidebarContext";

const SidebarItemNav = ({ item }: { item: SidebarItem }) => {
  const pathname = usePathname();
  const { isOpen } = useSidebar();

  return (
    <Link
      className={cn(
        "py-3 px-4 flex items-center gap-2 sm:text-lg font-semibold duration-300",
        isOpen ? "" : "justify-center",
        sidebarSelectItem(pathname, item.href)
      )}
      href={"/admin/" + item.href}
    >
      {item.icon}
      {isOpen ? <span>{item.label}</span> : null}
    </Link>
  );
};

export default SidebarItemNav;
