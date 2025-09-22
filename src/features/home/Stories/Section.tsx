import { StoryService } from "@/services/story.service";
import React from "react";
import { IResult } from "./types";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import StoryDetailsBtn from "./details";

const StoriesSection = async () => {
  const t = await getTranslations("HomePage");
  const locale = await getLocale();

  const stories = await StoryService.getPublishedStories(3);

  const data = () => {
    const result: IResult[] = [];

    if (locale === "ar") {
      const res: IResult[] = stories.map(
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
      const res: IResult[] = stories.map(
        ({
          id,
          titleEn,
          miniDescEn,
          descEn,
          pdfEnUrl,
          imageEnUrl,
          coverArUrl,
        }) => ({
          id,
          title: titleEn,
          miniDesc: miniDescEn,
          desc: descEn,
          pdf: pdfEnUrl,
          images: imageEnUrl,
          cover: coverArUrl,
        })
      );
      result.push(...res);
    }

    return result;
  };

  return (
    <section
      className="relative overflow-hidden py-16 min-h-[calc(100dvh-4rem)] bg-background"
      id="stories"
    >
      <div className="container flex flex-col gap-10">
        <h2 className="text-4xl xl:text-6xl leading-normal font-bold bg-gradient-to-r from-foreground to-primary-foreground bg-clip-text text-transparent w-fit mx-auto">
          {t("Stories.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {data().map(({ id, title, miniDesc, desc, pdf, images, cover }) => (
            <div
              key={id}
              className="flex flex-col border-2 border-primary bg-background-sub overflow-hidden shadow-sm hover:shadow-md duration-300 rounded-md"
            >
              <div className="flex !min-h-[400px] overflow-hidden">
                <Image
                  width={1000}
                  height={1000}
                  src={cover ?? ""}
                  alt={title}
                  className="object-cover !h-full"
                />
              </div>
              <div className="flex flex-col gap-2 p-3 sm:p-4 !h-full">
                <p className="text-lg sm:text-xl font-medium">{title}</p>
                <p className="text-sm sm:text-base text-card-foreground">
                  {miniDesc?.replaceAll('"', "")}
                </p>
                <StoryDetailsBtn
                  item={{ id, title, miniDesc, desc, pdf, cover, images }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
