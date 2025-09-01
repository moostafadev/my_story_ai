"use client";

import React from "react";
import { sidebarOpenCore, sidebarOpenToggle } from "./manageSidebar";
import Image from "next/image";
import { sidebarData } from "./data";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { SidebarToggleButton } from "./SidebarToggleButton";
import { SidebarOverlay } from "./SidebarOverlay";
import SidebarItemNav from "./SidebarItem";
import Link from "next/link";
import { useSidebar } from "@/contexts/SidebarContext";
import LogoutBtn from "@/components/LogoutBtn";

const SidebarCore = () => {
  const { isOpen } = useSidebar();

  return (
    <>
      <SidebarOverlay />

      <aside
        className={cn(
          "fixed top-0 right-0 h-full shadow-sm flex flex-col gap-4 bg-background duration-300 z-20",
          sidebarOpenCore(isOpen)
        )}
      >
        {/* Toggle button */}
        <SidebarToggleButton
          className={cn(
            "text-primary/60 hover:bg-primary/20 bg-primary/10 hover:text-primary/70 absolute top-3 w-10 h-10 flex items-center justify-center p-0 duration-300 transition-[right]",
            sidebarOpenToggle(isOpen)
          )}
        />

        {/* Header */}
        <Link
          href={"/"}
          className="flex items-center justify-center py-4 mx-1 md:mx-3 border-b border-b-gray-300"
        >
          <Image
            src={"/logo.png"}
            alt="Logo"
            width={40}
            height={40}
            priority
            className="max-w-20 w-full"
          />
        </Link>

        {/* Items */}
        <nav>
          <ul className="flex flex-col gap-2">
            {sidebarData.map((item) => (
              <li key={item.href} className="w-full">
                <SidebarItemNav item={item} />
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-2 md:px-4 absolute bottom-4 right-0 w-full h-fit">
          <LogoutBtn className="w-full text-red-600 hover:bg-red-50 bg-red-100 hover:text-red-700 flex items-center gap-2">
            <LogOut />
            {isOpen && <span>تسجيل خروج</span>}
          </LogoutBtn>
        </div>
      </aside>
    </>
  );
};

export default SidebarCore;
