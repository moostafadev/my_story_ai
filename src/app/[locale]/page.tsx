import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { CloudIcon, HeartIcon, MoonIcon, StarIcon } from "@/components/icons";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-10 min-h-[calc(100vh-5rem)] flex items-center">
        <div className="absolute inset-0 -bottom-6 -z-20 pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 800"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="seaGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#90dfd5" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#0284c7" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0.9" />
              </linearGradient>

              <filter id="soft" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="6" result="b" />
                <feBlend in="SourceGraphic" in2="b" />
              </filter>
            </defs>

            {/* static subtle gradient background */}
            <rect width="100%" height="100%" fill="#90dfd5" />

            {/* wave group 1 - nearest (stronger, faster) */}
            <g className="wave wave--1" style={{ filter: "url(#soft)" }}>
              <path
                d="M0 500 C 220 420 360 580 720 520 C 1020 470 1120 560 1440 500 L1440 800 L0 800 Z"
                fill="#ffffff"
                opacity="0.2"
              />
            </g>

            {/* wave group 2 - mid (softer) */}
            <g className="wave wave--2">
              <path
                d="M0 520 C 240 460 420 600 720 540 C 980 480 1180 610 1440 540 L1440 800 L0 800 Z"
                fill="#ffffff"
                opacity="0.17"
              />
            </g>

            {/* wave group 3 - far (very soft, slow) */}
            <g className="wave wave--3">
              <path
                d="M0 540 C 260 500 480 650 760 580 C 980 520 1240 660 1440 580 L1440 800 L0 800 Z"
                fill="#ffffff"
                opacity="0.15"
              />
            </g>

            {/* shimmer - tiny highlights */}
            <g className="wave wave--shine">
              <path
                d="M0 560 C 280 520 520 680 820 600 C 1060 540 1280 700 1440 620 L1440 800 L0 800 Z"
                fill="#ffffff"
                opacity="0.12"
              />
            </g>
          </svg>
        </div>

        <StarIcon className="absolute top-0 left-[5%] w-8 h-8" />
        <StarIcon className="absolute top-[5%] left-[13%] w-7 h-7" />
        <MoonIcon className="absolute top-[8%] left-[3%] w-10 h-10" />
        <HeartIcon className="absolute top-[5%] right-[5%] w-8 h-8 -z-10" />
        <CloudIcon className="absolute bottom-[5%] right-[2%] w-20 h-12" />
        <CloudIcon className="absolute bottom-[1%] right-[15%] w-24 h-16" />
        <CloudIcon className="absolute bottom-0 right-[5%] w-20 h-14" />

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

          <div className="flex-1 text-center md:text-start order-1 md:order-2 gap-4 md:gap-6 flex flex-col">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl xl:text-5xl sm:rtl:text-5xl font-bold text-primary-foreground relative w-fit mx-auto md:mx-0">
                <span className="shadow-child text-3xl xl:text-5xl sm:rtl:text-5xl">
                  {t("Hero.subTitle")}
                </span>{" "}
                <span className="text-2xl xl:text-4xl sm:rtl:text-4xl">
                  {t("Hero.title")}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-card-foreground max-w-lg">
                {t("Hero.description")}
              </p>
            </div>

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
      <section className="py-10 min-h-[calc(100vh-4rem)] bg-primary-sub">
        <div className="container"></div>
      </section>
    </>
  );
}
