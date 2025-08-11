import React from "react";
import Header from "./Header";
import ScrollToTopButton from "../ScrollToTopButton";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="mt-20 min-h-[calc(100vh-5rem)]">{children}</main>
      <ScrollToTopButton />
    </>
  );
};

export default MainLayout;
