import React, { Suspense } from "react";
import Header from "./Header";
import ScrollToTopButton from "../../ScrollToTopButton";
import { Toaster } from "sonner";
import { cookies } from "next/headers";
import { UserService } from "@/services/user.service";
import Loading from "@/app/[locale]/loading";
import Footer from "./Footer";
import { SettingsService } from "@/services/settings.service";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value || null;
  const firstName = cookieStore.get("firstName")?.value || null;
  const lastName = cookieStore.get("lastName")?.value || null;

  const result = userId ? await UserService.getUserById(userId) : null;
  const isAdmin = result?.role === "ADMIN" ? true : false;

  const settings = await SettingsService.getSettings();

  console.log(settings?.supportEmail);

  const user = { userId, firstName, lastName, role: isAdmin };
  return (
    <>
      <Header user={user} />
      <main className="mt-20 min-h-[calc(100dvh-5rem)]">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
      <Footer
        emailSupport={settings?.supportEmail ?? ""}
        phoneSupport={settings?.supportPhone ?? ""}
      />
      <ScrollToTopButton />
      <Toaster />
    </>
  );
};

export default MainLayout;
