"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { IResult } from "./types";
import { CustomDialog } from "@/components/custom/dialog";
import Image from "next/image";
import { CloudinaryBtn } from "@/components/custom/cloudinary-input";

const StoryDetailsBtn = ({
  item: { title, miniDesc, desc, pdf, image },
}: {
  item: IResult;
}) => {
  const t = useTranslations("HomePage");
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        className="self-end w-fit mt-auto"
        variant={"outline"}
        size={"sm"}
        onClick={() => setOpen(true)}
      >
        {t("Stories.more")}
      </Button>
      <CustomDialog
        open={open}
        onOpenChange={setOpen}
        title={{
          text: title,
        }}
      >
        <div className="flex flex-col">
          <div className="flex">
            <Image
              width={1000}
              height={1000}
              src={image ?? ""}
              alt={title}
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-2 p-3 sm:p-4 flex-1 !h-full">
            <p className="text-sm sm:text-base text-card-foreground">
              {miniDesc?.replaceAll('"', "")}
            </p>
            <p className="text-sm sm:text-base text-card-foreground pt-2 border-t">
              {desc?.replaceAll('"', "")}
            </p>
            {pdf && (
              <CloudinaryBtn fileUrl={pdf} className="self-end">
                {t("Stories.downloadBtn")}
              </CloudinaryBtn>
            )}
          </div>
        </div>
      </CustomDialog>
    </>
  );
};

export default StoryDetailsBtn;
