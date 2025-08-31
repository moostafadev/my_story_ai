import React from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import LoginForm from "@/features/auth/login/Form";

const LoginPage = async () => {
  const t = await getTranslations("Login");

  return (
    <section className="min-h-[calc(100vh-5rem)] flex">
      <div className="container flex items-center justify-center flex-1 py-8">
        <div className="p-4 lg:p-10 w-full flex flex-col gap-8 lg:gap-10 bg-background-sub/10 lg:bg-background rounded-md shadow-md lg:shadow-none border-2 lg:border-0 border-primary/20">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl sm:text-3xl font-bold text-center text-primary-foreground">
              {t("title")}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground text-center">
              {t("description")}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <LoginForm />
            <p className="text-sm sm:text-base text-muted-foreground flex items-center gap-2">
              <span>{t("noAccount")}</span>
              <Link
                href="/register"
                className="text-primary hover:underline hover:underline-offset-4"
              >
                <Button variant={"link"} className="h-fit">
                  {t("registerNow")}
                </Button>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-gradient-to-b from-background via-background-accent to-background hidden lg:flex p-10 items-center justify-center shadow-sm">
        <Image
          src={"/logo.png"}
          alt="My Story AI Logo"
          width={300}
          height={300}
          className="max-h-full min-h-96 w-auto"
        />
      </div>
    </section>
  );
};

export default LoginPage;
