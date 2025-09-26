"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { addressSchema, TAddressSchema } from "./schema";
import { updateOrderAddressAction } from "./address.action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CustomSelect } from "@/components/custom/select";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import CitySelection from "@/components/CitySelection";
import { useState } from "react";
import { CustomInput } from "@/components/custom/input";
import { STORYTYPE } from "@prisma/client";
import { fetchCities } from "@/components/CitySelection/city.action";

type Props = {
  orderId: string;
  prices: { softPrice: number; hardPrice: number };
  storyType: STORYTYPE;
};

export default function AddressForm({
  orderId,
  prices: { hardPrice, softPrice },
  storyType,
}: Props) {
  const t = useTranslations("AddressForm");
  const [loading, setLoading] = useState(false);

  const form = useForm<TAddressSchema>({
    resolver: zodResolver(addressSchema(t)),
    defaultValues: {
      type: "COD",
    },
  });

  const onSubmit = async (values: TAddressSchema) => {
    setLoading(true);

    const cities = await fetchCities();
    const selectedCity = cities.find(
      (c) => c.nameAr === values.city || c.nameEn === values.city
    );

    const deliveryPrice = selectedCity ? selectedCity.price : 0;

    const res = await updateOrderAddressAction(orderId, {
      city: values.city,
      area: values.area,
      street: values.street,
      houseNumber: values.houseNumber,
      type: values.type,
      state: "STEP2",
      deliveryPrice,
      fPrice: deliveryPrice + (storyType === "SOFT" ? softPrice : hardPrice),
    });

    if (res.success) {
      toast.success(t("success"));
      redirect(
        `/profile/orders/${orderId}/checkout/continue?type=${
          form.getValues("type") === "VISA" ? "visa" : "cod"
        }`
      );
    } else {
      toast.error(res.message || t("errors.failed"));
    }

    setLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-4 border rounded-2xl shadow-sm"
      >
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("labels.city")}</FormLabel>
                <CitySelection
                  onChange={(value) => field.onChange(value)}
                  value={field.value || ""}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <CustomInput
            control={form.control}
            name="area"
            schema={addressSchema(t)}
            label="AddressForm.labels.area"
            placeholder="AddressForm.placeholders.area"
            required
          />
          <CustomInput
            control={form.control}
            name="street"
            schema={addressSchema(t)}
            label="AddressForm.labels.street"
            placeholder="AddressForm.placeholders.street"
            required
          />
        </div>

        <CustomInput
          control={form.control}
          name="houseNumber"
          schema={addressSchema(t)}
          label="AddressForm.labels.houseNumber"
          placeholder="AddressForm.placeholders.houseNumber"
          required
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("labels.payment")}</FormLabel>
              <CustomSelect
                value={field.value}
                onChange={field.onChange}
                className="w-full"
                options={[
                  { label: t("payment.cod"), value: "COD" },
                  { label: t("payment.visa"), value: "VISA" },
                ]}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" loading={loading}>
          {t("buttons.next")}
        </Button>
      </form>
    </Form>
  );
}
