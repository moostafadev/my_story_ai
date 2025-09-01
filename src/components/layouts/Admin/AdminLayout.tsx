import React from "react";
import { SidebarProvider } from "@/providers/Sidebar";
import AdminLayoutClient from "./AdminLayoutClient";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </SidebarProvider>
  );
};

export default AdminLayout;
