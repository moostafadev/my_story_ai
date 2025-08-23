import RegisterFrom from "@/features/auth/register/From";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

const RegisterPage = async () => {
  const t = await getTranslations("Register");
  return (
    <section className="min-h-[calc(100vh-5rem)] flex">
      <div className="container flex items-center justify-center flex-1">
        <div className="lg:p-10 w-full flex flex-col gap-8 md:gap-10">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold text-center text-primary-foreground">
              {t("title")}
            </h1>
            <p className="text-muted-foreground text-center">
              {t("description")}
            </p>
          </div>
          <RegisterFrom />
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

export default RegisterPage;
