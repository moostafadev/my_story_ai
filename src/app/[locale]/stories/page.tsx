import StoryCard from "@/components/StoryCard";
import { IStoryCard } from "@/components/StoryCard/types";
import { StoryService } from "@/services/story.service";
import { getLocale, getTranslations } from "next-intl/server";
import React from "react";

const StoriesPage = async () => {
  const t = await getTranslations("HomePage");
  const locale = await getLocale();
  const stories = await StoryService.getPublishedStories();

  const data = () => {
    const result: IStoryCard[] = [];

    if (locale === "ar") {
      const res: IStoryCard[] = stories.map(
        ({
          id,
          titleAr,
          miniDescAr,
          descAr,
          pdfArUrl,
          imageArUrl,
          coverArUrl,
        }) => ({
          id,
          title: titleAr,
          miniDesc: miniDescAr,
          desc: descAr,
          pdf: pdfArUrl,
          images: imageArUrl,
          cover: coverArUrl,
        })
      );
      result.push(...res);
    } else {
      const res: IStoryCard[] = stories.map(
        ({ id, titleEn, miniDescEn, coverArUrl }) => ({
          id,
          title: titleEn,
          miniDesc: miniDescEn,
          cover: coverArUrl,
        })
      );
      result.push(...res);
    }

    return result;
  };

  return (
    <>
      <section className="min-h-[calc(100dvh-5rem)] py-8 md:py-12">
        <div className="container flex flex-col gap-10">
          <h2 className="text-4xl xl:text-6xl leading-normal font-bold bg-gradient-to-r from-foreground to-primary-foreground bg-clip-text text-transparent w-fit mx-auto">
            {t("Stories.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {data().map(({ id, title, miniDesc, cover }) => (
              <StoryCard key={id} story={{ id, cover, miniDesc, title }} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default StoriesPage;
