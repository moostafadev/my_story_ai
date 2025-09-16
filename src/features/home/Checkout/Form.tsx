"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

import { addressSchema, TAddressSchema } from "./schema";
import { updateOrderAddressAction } from "./address.action";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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

type Props = {
  orderId: string;
};

export default function AddressForm({ orderId }: Props) {
  const t = useTranslations("AddressForm");
  const [loadingLocation, setLoadingLocation] = useState(false);

  const form = useForm<TAddressSchema>({
    resolver: zodResolver(addressSchema(t)),
    defaultValues: {
      useGeo: false,
      type: "COD",
    },
  });

  const handleGetLocation = async () => {
    if (!navigator.geolocation) {
      alert(t("errors.geo_not_supported"));
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        form.setValue("latitude", lat);
        form.setValue("longitude", lng);

        setLoadingLocation(false);
      },
      (err) => {
        console.error("Error getting location:", err);
        alert(t("errors.geo_failed"));
        setLoadingLocation(false);
      }
    );
  };

  const onSubmit = async (values: TAddressSchema) => {
    const mapsLink =
      values.latitude && values.longitude
        ? `https://www.google.com/maps?q=${values.latitude},${values.longitude}`
        : null;

    const res = await updateOrderAddressAction(orderId, {
      city: values.city,
      area: values.area,
      street: values.street,
      houseNumber: values.houseNumber,
      latitude: values.latitude,
      longitude: values.longitude,
      mapsLink,
      type: values.type,
    });

    if (res.success) {
      toast.success(t("success"));
      if (form.getValues("type") === "VISA") {
        redirect(`/profile/orders/${orderId}/checkout/continue`);
      }
    } else {
      toast.error(res.message || t("errors.failed"));
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-4 border rounded-2xl shadow-sm"
      >
        {/* اختيار الطريقة */}
        <FormField
          control={form.control}
          name="useGeo"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>{t("geo")}</FormLabel>
              <Switch
                checked={field.value}
                onCheckedChange={(v) => field.onChange(v)}
                dir="ltr"
              />
            </FormItem>
          )}
        />

        {/* العنوان اليدوي */}
        {!form.watch("useGeo") && (
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.city")}</FormLabel>
                  <Input placeholder={t("placeholders.city")} {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.area")}</FormLabel>
                  <Input placeholder={t("placeholders.area")} {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.street")}</FormLabel>
                  <Input placeholder={t("placeholders.street")} {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {/* الموقع الجغرافي */}
        {form.watch("useGeo") && (
          <div className="space-y-2">
            <Button
              type="button"
              variant="secondary"
              onClick={handleGetLocation}
              disabled={loadingLocation}
            >
              {loadingLocation ? t("loading") : t("buttons.use_location")}
            </Button>
          </div>
        )}

        {/* تفاصيل إضافية */}
        <FormField
          control={form.control}
          name="houseNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("labels.houseNumber")}</FormLabel>
              <Input placeholder={t("placeholders.houseNumber")} {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* طريقة الدفع */}
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

        <Button type="submit" className="w-full">
          {form.watch("type") === "COD"
            ? t("buttons.submit")
            : t("buttons.next")}
        </Button>
      </form>
    </Form>
  );
}
