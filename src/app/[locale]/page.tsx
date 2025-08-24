import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { CloudIcon, HeartIcon, MoonIcon, StarIcon } from "@/components/icons";
import { Link } from "@/i18n/navigation";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const steps = [
    {
      key: "step1",
      colors: "from-primary to-primary-foreground",
      arrowColor: "text-primary/60",
    },
    {
      key: "step2",
      colors: "from-secondary to-secondary-foreground",
      arrowColor: "text-secondary/60",
    },
    {
      key: "step3",
      colors: "from-accent to-accent-foreground",
      arrowColor: null,
      stars: true,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-10 min-h-[calc(100dvh-5rem)] flex items-center">
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

        <StarIcon className="absolute top-0 left-[5%] w-8 h-8" />
        <StarIcon className="absolute top-[5%] left-[13%] w-7 h-7" />
        <MoonIcon className="absolute top-[8%] left-[3%] w-10 h-10" />
        <HeartIcon className="absolute top-[5%] right-[5%] w-8 h-8 -z-10" />
        <CloudIcon className="absolute bottom-[5%] right-[2%] w-20 h-12" />
        <CloudIcon className="absolute bottom-[1%] right-[15%] w-24 h-16" />
        <CloudIcon className="absolute bottom-0 right-[5%] w-20 h-14" />

        <div className="container mx-auto flex flex-col md:flex-row items-center gap-0 md:gap-8">
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
              <Link href={"#features"}>
                <Button variant={"outline"}>{t("Hero.ctaSecondary")}</Button>
              </Link>
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

      {/* How It Works Section */}
      <section
        className="relative overflow-hidden py-16 min-h-[calc(100dvh-4rem)] bg-background"
        id="how-it-works"
      >
        {/* <div className="container mx-auto relative z-10">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <div className="flex items-center justify-center flex-col gap-2 mb-6">
              <h2 className="text-4xl xl:text-6xl leading-normal font-bold bg-gradient-to-r from-foreground to-primary-foreground bg-clip-text text-transparent">
                {t("HowItWorks.title")}
              </h2>
              <h3 className="text-2xl xl:text-3xl font-semibold text-primary-foreground">
                {t("HowItWorks.subtitle")}
              </h3>
            </div>
            <p className="text-lg text-foreground leading-relaxed mb-4">
              {t("HowItWorks.description")}
            </p>
            <div className="flex items-center gap-2 w-fit mx-auto bg-secondary/50 backdrop-blur-sm border border-foreground/30 rounded-full px-6 py-2">
              <span className="text-secondary-foreground font-semibold">
                {t("HowItWorks.processTime")}
              </span>
            </div>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full transform -translate-y-1/2 z-0" />

            <div
              className={`grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative z-10 ${
                isRTL ? "lg:flex-row-reverse" : ""
              }`}
            >
              {(isRTL ? [...steps].reverse() : steps).map((step, index) => (
                <div
                  key={step.key}
                  className="flex flex-col items-center group"
                >
                  <div className="relative mb-8">
                    <div
                      className={`w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br ${step.colors} rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500 border-4 border-white/20`}
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Image
                          src="/logo.png"
                          alt={t(`HowItWorks.${step.key}.title`)}
                          width={48}
                          height={48}
                          className="w-10 h-10 sm:w-12 sm:h-12"
                        />
                      </div>
                    </div>

                    <div className="absolute -top-4 -right-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-accent to-accent-foreground rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-base sm:text-lg">
                        {index + 1}
                      </span>
                    </div>

                    {step.arrowColor && (
                      <div
                        className={`hidden lg:block absolute top-1/2 -right-16 transform -translate-y-1/2`}
                      >
                        <svg
                          className={`w-10 h-6 sm:w-12 sm:h-8 ${step.arrowColor}`}
                          viewBox="0 0 24 12"
                          fill="currentColor"
                        >
                          <path
                            d="M20 6H4m12-4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="text-center max-w-sm">
                    <div className="mb-3">
                      <span
                        className={`${
                          step.colors.includes("primary")
                            ? "text-primary"
                            : step.colors.includes("secondary")
                            ? "text-secondary"
                            : "text-accent"
                        } font-semibold text-sm uppercase tracking-wide`}
                      >
                        {t(`HowItWorks.${step.key}.stepNumber`)}
                      </span>
                    </div>
                    <h4 className="text-2xl font-bold text-card-foreground mb-4 group-hover:text-white transition-colors">
                      {t(`HowItWorks.${step.key}.title`)}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`HowItWorks.${step.key}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </section>
    </>
  );
}
