import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CloudIcon, HeartIcon, MoonIcon, StarIcon } from "@/components/icons";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import StoriesSection from "@/features/home/Stories/Section";
import HeroVideo from "@/features/home/HeroVideo";

export default async function HomePage() {
  const t = await getTranslations("HomePage");
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden flex items-center">
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
            <rect width="100%" height="100%" fill="#ffffff" />

            {/* wave group 1 - nearest (stronger, faster) */}
            <g className="wave wave--1" style={{ filter: "url(#soft)" }}>
              <path
                d="M0 500 C 220 420 360 580 720 520 C 1020 470 1120 560 1440 500 L1440 800 L0 800 Z"
                fill="#ff6800"
                opacity="0.2"
              />
            </g>

            {/* wave group 2 - mid (softer) */}
            <g className="wave wave--2">
              <path
                d="M0 520 C 240 460 420 600 720 540 C 980 480 1180 610 1440 540 L1440 800 L0 800 Z"
                fill="#ff6800"
                opacity="0.17"
              />
            </g>

            {/* wave group 3 - far (very soft, slow) */}
            <g className="wave wave--3">
              <path
                d="M0 540 C 260 500 480 650 760 580 C 980 520 1240 660 1440 580 L1440 800 L0 800 Z"
                fill="#ff6800"
                opacity="0.15"
              />
            </g>

            {/* shimmer - tiny highlights */}
            <g className="wave wave--shine">
              <path
                d="M0 560 C 280 520 520 680 820 600 C 1060 540 1280 700 1440 620 L1440 800 L0 800 Z"
                fill="#ff6800"
                opacity="0.12"
              />
            </g>
          </svg>
        </div>

        <StarIcon className="absolute top-0 ltr:left-[5%] rtl:right-[5%] w-8 h-8" />
        <StarIcon className="absolute top-[5%] ltr:left-[13%] rtl:right-[13%] w-7 h-7" />
        <MoonIcon className="absolute top-[8%] ltr:left-[3%] rtl:right-[3%] w-10 h-10" />
        <HeartIcon className="absolute top-[5%] ltr:right-[5%] rtl:left-[5%] w-8 h-8 -z-10" />
        <CloudIcon className="absolute bottom-[5%] ltr:right-[2%] rtl:left-[2%] w-20 h-12" />
        <CloudIcon className="absolute bottom-[1%] ltr:right-[15%] rtl:left-[15%] w-24 h-16" />
        <CloudIcon className="absolute bottom-0 ltr:right-[5%] rtl:left-[5%] w-20 h-14" />

        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-16 h-fit lg:h-[480px] xl:h-[540px] 2xl:h-[580px] mx-auto lg:mx-0 py-6 lg:py-0">
          <div className="flex-[3] order-2 lg:order-1 relative h-full p-4 lg:p-0 flex items-center">
            <HeroVideo />
          </div>

          <div className="flex-[2] lg:py-10 text-center lg:text-start order-1 lg:order-2 gap-4 lg:gap-6 flex flex-col items-center lg:items-start justify-center">
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
              <Button
                asChild
                className="px-10 text-base font-semibold shadow-md hover:scale-105"
              >
                <Link href={"/createStory"}>{t("Hero.ctaPrimary")}</Link>
              </Button>
              <Button asChild variant={"outline"}>
                <Link href={"#features"}>{t("Hero.ctaSecondary")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="relative py-16 min-h-[calc(100dvh-4rem)] bg-background-sub"
        id="features"
      >
        <div className="container mx-auto flex flex-col gap-14 md:gap-16">
          {/* Section Header */}
          <div className="text-center mx-auto flex flex-col gap-4">
            <div className="flex items-center justify-center flex-col gap-1">
              <h2 className="text-4xl xl:text-6xl leading-normal font-bold bg-gradient-to-r from-foreground to-primary-foreground bg-clip-text text-transparent">
                {t("Features.title")}
              </h2>
              <h3 className="text-2xl xl:text-3xl font-semibold text-primary-foreground">
                {t("Features.subtitle")}
              </h3>
            </div>
            <p className="text-lg text-foreground leading-relaxed">
              {t("Features.description")}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mx-auto">
            {[1, 2, 3, 4, 5, 6].map((feat) => (
              <div
                className="group bg-background backdrop-blur-sm border border-border/50 rounded-md p-8 hover:bg-background/90 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-accent/30"
                key={feat}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-primary-foreground rounded-full mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src="/logo.png"
                    alt="Feature Icon"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
                <h4 className="text-xl font-bold text-card-foreground mb-4 text-center group-hover:text-primary-foreground transition-colors">
                  {t(`Features.feature${feat}.title`)}
                </h4>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {t(`Features.feature${feat}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <StoriesSection />
    </>
  );
}
