"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-10 min-h-[calc(100vh-5rem)] flex items-center">
        <svg
          className="absolute top-0 left-[5%] w-8 h-8 star"
          viewBox="0 0 24 24"
          fill="gold"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2l2.39 7.26H22l-6.17 4.48 2.39 7.26L12 16.52l-6.22 4.48 2.39-7.26L2 9.26h7.61L12 2z" />
        </svg>
        <svg
          className="absolute top-[5%] left-[13%] w-7 h-7 star"
          viewBox="0 0 24 24"
          fill="gold"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2l2.39 7.26H22l-6.17 4.48 2.39 7.26L12 16.52l-6.22 4.48 2.39-7.26L2 9.26h7.61L12 2z" />
        </svg>

        <svg
          className="absolute top-[8%] left-[3%] w-10 h-10 moon"
          viewBox="0 0 24 24"
          fill="#f6e58d"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21 12.79A9 9 0 0111.21 3 7 7 0 1021 12.79z" />
        </svg>

        <svg
          className="absolute top-[5%] right-[5%] w-8 h-8 heart -z-10"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gradHeart" x1="0" x2="1">
              <stop offset="0%" stopColor="#ff9a9e" />
              <stop offset="100%" stopColor="#ff6b81" />
            </linearGradient>
          </defs>
          <path
            fill="url(#gradHeart)"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
               2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
               1.09-1.28 2.76-2.09 4.5-2.09
               3.08 0 5.5 2.42 5.5 5.5
               0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>

        <svg
          className="absolute bottom-[5%] right-[2%] w-20 h-12 cloud"
          viewBox="0 0 64 64"
          fill="#d7c9d3"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M48,32a12,12,0,0,0-11.8-12A9,9,0,0,0,20,21a9,9,0,0,0-1,17.94V39H48A12,12,0,0,0,48,32Z" />
        </svg>
        <svg
          className="absolute bottom-[1%] right-[15%] w-24 h-16 cloud"
          viewBox="0 0 64 64"
          fill="#d7c9d3"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M48,32a12,12,0,0,0-11.8-12A9,9,0,0,0,20,21a9,9,0,0,0-1,17.94V39H48A12,12,0,0,0,48,32Z" />
        </svg>
        <svg
          className="absolute bottom-0 right-[5%] w-20 h-14 cloud"
          viewBox="0 0 64 64"
          fill="#d7c9d3"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M48,32a12,12,0,0,0-11.8-12A9,9,0,0,0,20,21a9,9,0,0,0-1,17.94V39H48A12,12,0,0,0,48,32Z" />
        </svg>

        <div className="container mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="flex-1 flex justify-center order-2 md:order-1">
            <Image
              src={"/logo.png"}
              alt={t("Hero.title")}
              width={400}
              height={400}
              className="max-w-[400px] w-full drop-shadow-lg"
              priority
            />
          </div>

          {/* النصوص */}
          <div className="flex-1 text-center md:text-start order-1 md:order-2 gap-4 md:gap-6 flex flex-col">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl xl:text-5xl sm:rtl:text-5xl font-bold text-foreground relative w-fit mx-auto md:mx-0">
                <span className="shadow-child text-3xl xl:text-5xl sm:rtl:text-5xl">
                  {t("Hero.subTitle")}
                </span>{" "}
                <span className="text-2xl xl:text-4xl sm:rtl:text-4xl">
                  {t("Hero.title")}
                </span>
                {/* <span className="absolute -bottom-2 left-2 xl:rtl:right-2 rtl:w-20 w-32 xl:w-52 sm:rtl:w-24 bg-secondary-foreground h-1.5 sm:h-2 rounded-full" /> */}
              </h1>
              <p className="text-lg sm:text-xl text-card-foreground max-w-lg">
                {t("Hero.description")}
              </p>
            </div>

            {/* الأزرار */}
            <div className="flex items-center gap-2 sm:gap-4 justify-center md:justify-start">
              <Button className="px-10 text-base font-semibold shadow-md hover:scale-105">
                {t("Hero.ctaPrimary")}
              </Button>
              <Button variant={"outline"}>{t("Hero.ctaSecondary")}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section className="py-10 min-h-[calc(100vh-4rem)] bg-background-sub">
        <div className="container"></div>
      </section>
    </>
  );
}
