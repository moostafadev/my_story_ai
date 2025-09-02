"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CustomSelect } from "@/components/custom/select";
import React, { useState } from "react";

interface StoryPriceInputProps {
  value: number;
  currency: string;
}
export const StoryPriceInput = React.memo(
  ({ value, currency }: StoryPriceInputProps) => {
    const [storyCreationPrice, setStoryCreationPrice] = useState(value ?? 0);
    const [storyCreationCurrency, setStoryCreationCurrency] = useState(
      currency ?? "USD"
    );

    return (
      <div className="flex flex-col gap-2">
        <Label htmlFor="creation-price">سعر انشاء القصة:</Label>
        <div className="flex gap-2">
          <Input
            id="creation-price"
            type="number"
            value={storyCreationPrice}
            onChange={(e) =>
              setStoryCreationPrice(parseFloat(e.target.value) || 0)
            }
            className="flex-1"
          />
          <CustomSelect
            value={storyCreationCurrency}
            onChange={setStoryCreationCurrency}
            options={[
              { value: "USD", label: "دولار" },
              { value: "EGP", label: "جنية" },
            ]}
            placeholder="العملة"
            className="min-w-[100px]"
          />
        </div>
      </div>
    );
  }
);
StoryPriceInput.displayName = "StoryPriceInput";

interface SupportEmailInputProps {
  value: string;
}
export const SupportEmailInput = React.memo(
  ({ value }: SupportEmailInputProps) => {
    const [supportEmail, setSupportEmail] = useState(value ?? "");

    return (
      <div className="flex flex-col gap-2">
        <Label htmlFor="support-email">ايميل الدعم:</Label>
        <Input
          id="support-email"
          type="email"
          value={supportEmail}
          onChange={(e) => setSupportEmail(e.target.value)}
        />
      </div>
    );
  }
);
SupportEmailInput.displayName = "SupportEmailInput";

interface SupportPhoneInputProps {
  value: string;
}
export const SupportPhoneInput = React.memo(
  ({ value }: SupportPhoneInputProps) => {
    const [supportPhone, setSupportPhone] = useState(value ?? "");

    return (
      <div className="flex flex-col gap-2">
        <Label htmlFor="support-phone">رقم هاتف الدعم:</Label>
        <Input
          id="support-phone"
          type="tel"
          value={supportPhone}
          onChange={(e) => setSupportPhone(e.target.value)}
        />
      </div>
    );
  }
);
SupportPhoneInput.displayName = "SupportPhoneInput";
