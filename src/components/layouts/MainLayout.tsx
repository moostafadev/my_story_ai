import React from "react";
import Header from "./Header";
import ScrollToTopButton from "../ScrollToTopButton";
import { Toaster } from "sonner";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="mt-20 min-h-[calc(100dvh-5rem)]">{children}</main>
      <ScrollToTopButton />
      <Toaster />
    </>
  );
};

export default MainLayout;
