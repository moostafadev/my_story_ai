import Image from "next/image";
import React from "react";
import { IStoryCard } from "./types";
import { Button } from "../ui/button";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const StoryCard = async ({
  story: { cover, miniDesc, title, id },
}: {
  story: IStoryCard;
}) => {
  const t = await getTranslations("HomePage");

  return (
    <div className="flex flex-col border-2 border-primary bg-background-sub overflow-hidden shadow-sm hover:shadow-md duration-300 rounded-md min-h-[500px] max-w-[350px] h-full">
      <div className="flex !min-w-full min-h-fit overflow-hidden">
        <Image
          src={cover || "https://placehold.co/595x842.png"}
          alt={title}
          width={297}
          height={421}
          className="w-full"
          layout="intrinsic"
        />
      </div>
      <div className="flex flex-col gap-2 p-3 sm:p-4 !h-full">
        <p className="text-lg sm:text-xl font-medium">{title}</p>
        <p className="text-sm sm:text-base text-card-foreground">
          {miniDesc?.replaceAll('"', "")}
        </p>
        <Button
          className="self-end w-fit mt-auto"
          variant={"outline"}
          size={"sm"}
          asChild
        >
          <Link href={`/stories/${id}`}>{t("Stories.more")}</Link>
        </Button>
      </div>
    </div>
  );
};

export default StoryCard;
