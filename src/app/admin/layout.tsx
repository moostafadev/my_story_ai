import { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import { cn } from "@/lib/utils";

import "@/styles/globals.css";

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

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"ar"} dir={"rtl"}>
      <head>
        <meta name="apple-mobile-web-app-title" content="My Story AI" />
      </head>
      <body className={cn(noto_sans_arabic.className)}>{children}</body>
    </html>
  );
}
