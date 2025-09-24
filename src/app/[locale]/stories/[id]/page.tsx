import { CloudinaryBtn } from "@/components/custom/cloudinary-input";
import { cn } from "@/lib/utils";
import { StoryService } from "@/services/story.service";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

interface IStory {
  id: string;
  title: string;
  miniDesc: string | null;
  desc: string;
  pdf: string | null;
  cover: string | null;
  images: string[] | null;
}

const StoryPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const locale = await getLocale();
  const t = await getTranslations("HomePage");

  const story = await StoryService.getStoryById(id);

  if (!story) {
    redirect("/stories");
  }

  const localizedStory: IStory = {
    id: story.id,
    title: locale === "ar" ? story.titleAr : story.titleEn,
    miniDesc: locale === "ar" ? story.miniDescAr : story.miniDescEn,
    desc: locale === "ar" ? story.descAr : story.descEn,
    pdf: locale === "ar" ? story.pdfArUrl : story.pdfEnUrl,
    cover: locale === "ar" ? story.coverArUrl : story.coverEnUrl,
    images: locale === "ar" ? story.imageArUrl : story.imageEnUrl,
  };

  return (
    <section className="min-h-[calc(100dvh-5rem)] py-12 md:py-16">
      <div className="container flex flex-col gap-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary-foreground">
          {localizedStory.title}
        </h1>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="md:flex-1 md:order-2 mx-auto max-w-[300px] md:max-w-full border-b border-b-foreground md:border-0 pb-4 md:pb-0">
            <Image
              width={595}
              height={842}
              src={localizedStory.cover || "https://placehold.co/595x842.png"}
              alt={localizedStory.title || "Story Cover"}
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="md:flex-[2] md:order-1 flex flex-col gap-4">
            {localizedStory.images && localizedStory.images.length > 0 && (
              <div
                className={cn("grid gap-4", {
                  "grid-cols-1": localizedStory.images.length === 1,
                  "md:grid-cols-2": localizedStory.images.length === 2,
                  "md:grid-cols-3": localizedStory.images.length >= 3,
                })}
              >
                {localizedStory.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-full rounded-lg overflow-hidden mx-auto max-w-[300px] md:max-w-full"
                  >
                    <Image
                      src={image}
                      alt={`Story image ${index + 1}`}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover object-center rounded-md shadow-lg"
                    />
                  </div>
                ))}
              </div>
            )}

            <p className="text-lg text-card-foreground">
              {localizedStory.miniDesc}
            </p>

            <p>{localizedStory.desc}</p>

            {/* PDF Link */}
            {localizedStory.pdf && (
              <CloudinaryBtn fileUrl={localizedStory.pdf}>
                {t("Stories.downloadBtn")}
              </CloudinaryBtn>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryPage;
