import { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import { UserService } from "@/services/user.service";
import { redirect } from "next/navigation";

import "@/styles/globals.css";
import AdminLayout from "@/components/layouts/Admin/AdminLayout";

const noto_sans_arabic = Noto_Sans_Arabic({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["arabic"],
  style: ["normal"],
  display: "swap",
  variable: "--font-noto-sans-arabic",
});

export const metadata: Metadata = {
  title: "My Story AI - admin",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value || null;

  const result = userId ? await UserService.getUserById(userId) : null;

  if (!result || result.role !== "ADMIN") {
    redirect("/");
  }
  return (
    <html lang={"ar"} dir={"rtl"}>
      <head>
        <meta name="apple-mobile-web-app-title" content="My Story AI" />
      </head>
      <body className={cn(noto_sans_arabic.className)}>
        <AdminLayout>{children}</AdminLayout>
      </body>
    </html>
  );
}
