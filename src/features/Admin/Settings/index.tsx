"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "@prisma/client";
import { updateSettingsAction } from "./settings.action";
import { toast } from "sonner";
import Link from "next/link";

const SettingsFeature = ({ data }: { data: Settings | null }) => {
  const [storyCreationPricePDF, setStoryCreationPricePDF] = useState(
    data?.storyCreationPricePDF ?? 0
  );
  const [storyCreationPriceSoft, setStoryCreationPriceSoft] = useState(
    data?.storyCreationPriceSoft ?? 0
  );
  const [storyCreationPriceHard, setStoryCreationPriceHard] = useState(
    data?.storyCreationPriceHard ?? 0
  );
  const [supportEmail, setSupportEmail] = useState(data?.supportEmail ?? "");
  const [supportPhone, setSupportPhone] = useState(data?.supportPhone ?? "");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const result = await updateSettingsAction({
        storyCreationPricePDF,
        storyCreationPriceSoft,
        storyCreationPriceHard,
        supportEmail,
        supportPhone,
      });

      if (result.success) {
        toast.success("تم حفظ الاعدادات ✅");
      } else {
        toast.error(result.error || "خطأ غير متوقع");
      }
    } catch (error) {
      toast.error("حصل خطأ أثناء الحفظ ❌");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="creation-price">سعر انشاء القصة (PDF):</Label>
          <Input
            id="creation-price"
            type="number"
            value={storyCreationPricePDF}
            onChange={(e) =>
              setStoryCreationPricePDF(parseFloat(e.target.value))
            }
            className="flex-1"
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="creation-price">سعر انشاء القصة (SOFT + PDF):</Label>
          <Input
            id="creation-price"
            type="number"
            value={storyCreationPriceSoft}
            onChange={(e) =>
              setStoryCreationPriceSoft(parseFloat(e.target.value))
            }
            className="flex-1"
            disabled={isLoading}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="creation-price">سعر انشاء القصة (HARD + PDF):</Label>
          <Input
            id="creation-price"
            type="number"
            value={storyCreationPriceHard}
            onChange={(e) =>
              setStoryCreationPriceHard(parseFloat(e.target.value))
            }
            className="flex-1"
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>اسعار التوصيل:</Label>
          <Link href={"/admin/settings/deliveryPricing"} className="w-fit">
            <Button size={"lg"} variant={"outline"} className="w-fit">
              هنا
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email-support">ايميل الدعم:</Label>
          <Input
            id="email-support"
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
            type="email"
            disabled={isLoading}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone-support">رقم هاتف الدعم:</Label>
          <Input
            id="phone-support"
            value={supportPhone}
            onChange={(e) => setSupportPhone(e.target.value)}
            type="tel"
            disabled={isLoading}
          />
        </div>
      </div>

      <Button
        size={"lg"}
        className="w-fit"
        onClick={handleSubmit}
        loading={isLoading}
      >
        حفظ الاعدادات
      </Button>
    </div>
  );
};

export default SettingsFeature;
