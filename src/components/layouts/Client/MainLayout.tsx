import React from "react";
import Header from "./Header";
import ScrollToTopButton from "../../ScrollToTopButton";
import { Toaster } from "sonner";
import { cookies } from "next/headers";
import { UserService } from "@/services/user.service";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value || null;
  const firstName = cookieStore.get("firstName")?.value || null;
  const lastName = cookieStore.get("lastName")?.value || null;

  const result = userId ? await UserService.getUserById(userId) : null;
  const isAdmin = result?.role === "ADMIN" ? true : false;

  const user = { userId, firstName, lastName, role: isAdmin };
  return (
    <>
      <Header user={user} isFree={result?.isFree ?? true} />
      <main className="mt-20 min-h-[calc(100dvh-5rem)]">{children}</main>
      <ScrollToTopButton />
      <Toaster />
    </>
  );
};

export default MainLayout;
