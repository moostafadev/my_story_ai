"use client";

import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import { updatePhoneNumber } from "./user.action";
import { toast } from "sonner";
import { CustomDialog } from "@/components/custom/dialog";
import { CustomInput } from "@/components/custom/input";
import { cn } from "@/lib/utils";

const EditPhoneNumber = ({
  userId,
  phoneNumber,
}: {
  userId: string;
  phoneNumber: string;
}) => {
  const t = useTranslations("Profile");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(phoneNumber);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await updatePhoneNumber(userId, value, locale);
      toast.success(t("SuccessEditPhone"));
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(t("ErrorEditPhone"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant={"outline"}
        size={"sm"}
        title={t("EditPhone")}
        className={cn(locale === "ar" ? "mr-auto" : "ml-auto")}
      >
        <Pen />
      </Button>
      <CustomDialog
        onOpenChange={setOpen}
        open={open}
        title={{
          text: t("EditPhone"),
        }}
      >
        <div className="flex flex-col gap-4">
          <CustomInput
            label="Profile.Phone"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            type="tel"
          />
          <Button loading={loading} onClick={handleSubmit}>
            {t("DoneEditPhone")}
          </Button>
        </div>
      </CustomDialog>
    </>
  );
};

export default EditPhoneNumber;
