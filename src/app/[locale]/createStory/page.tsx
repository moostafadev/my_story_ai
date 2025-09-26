import OrderFormStepOne from "@/features/home/CreateStory/Form";
import { getUserFromCookies } from "@/lib/cookies";
import { SettingsService } from "@/services/settings.service";
import { UserService } from "@/services/user.service";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const CreateStoryPage = async () => {
  const userId = await getUserFromCookies();
  if (!userId?.userId) {
    redirect("/login");
  }
  const result = await UserService.getUserById(userId.userId);
  if (!result?.id) {
    redirect("/login");
  }

  const settings = await SettingsService.getSettings();

  if (!settings) {
    redirect("/");
  }

  const t = await getTranslations("CreateStory");

  return (
    <section className="min-h-[calc(100vh-5rem)] flex">
      {/* Form Section */}
      <div className="flex-[3] py-10 px-4 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-4xl font-bold">{t("title")}</h1>
          <p className="sm:text-lg font-medium text-muted-foreground">
            {t("desc")}
          </p>
        </div>
        <OrderFormStepOne
          userId={userId.userId}
          prices={{
            pdfPrice: settings.storyCreationPricePDF,
            softPrice: settings.storyCreationPriceSoft,
            hardPrice: settings.storyCreationPriceHard,
          }}
        />
      </div>

      {/* Image Section */}
      <div className="flex-[2] bg-background-sub hidden lg:block p-10 relative shadow-sm">
        <div className="flex justify-center min-h-[calc(100vh-5rem)] h-full">
          <Image
            src="/logo.png"
            alt="My Story AI Logo"
            width={300}
            height={300}
            className="sticky top-[250px] h-auto max-h-[400px] w-auto object-contain mt-[50%] -translate-y-1/2"
          />
        </div>
      </div>
    </section>
  );
};

export default CreateStoryPage;
