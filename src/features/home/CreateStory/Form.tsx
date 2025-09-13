"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { toast } from "sonner";

import { orderSchema, TOrderSchema } from "./schema";
import { createOrderAction } from "./order.action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CustomSelect } from "@/components/custom/select";
import { CloudinaryInput } from "@/components/custom/cloudinary-input";
import { CustomInput } from "@/components/custom/input";
import { Lang } from "@/components/custom/cloudinary-input/types";

const OrderFormStepOne = ({ userId }: { userId: string }) => {
  const t = useTranslations("CreateStory");
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [childImage, setChildImage] = useState("");

  const form = useForm<TOrderSchema>({
    resolver: zodResolver(orderSchema(t)),
    defaultValues: {
      name: "",
      age: 3,
      hobbies: "",
      language: "",
      description: "",
      gender: "MALE",
      child_image: "",
      hair_color: "",
      hair_style: "",
      eye_color: "",
      skin_tone: "",
      clothing_description: "",
      accessory_description: "",
      personality_traits: "",
      moral_value: "",
    },
  });

  async function onSubmit(values: TOrderSchema) {
    if (!childImage) {
      form.setError("child_image", {
        type: "manual",
        message: t("errors.child_image_required"),
      });
      return;
    }

    setLoading(true);

    const payload = {
      ...values,
      child_image: childImage,
      userId,
    };

    const res = await createOrderAction(payload);

    setLoading(false);

    if (res.success) {
      toast.success("✅ تم إنشاء الطلب بنجاح");
      redirect(`/profile/orders/${res?.order?.id}/checkout`);
    } else {
      toast.error("❌ فشل إنشاء الطلب: " + res.message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          <CustomInput
            control={form.control}
            name="name"
            schema={orderSchema(t)}
            label="CreateStory.form.labels.name"
            placeholder="CreateStory.form.placeholders.name"
            required
          />
          <CustomInput
            control={form.control}
            name="age"
            schema={orderSchema(t)}
            label="CreateStory.form.labels.age"
            placeholder="CreateStory.form.placeholders.age"
            type="number"
            onChange={(e) => form.setValue("age", Number(e.target.value))}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="hobbies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.labels.hobbies")}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("form.placeholders.hobbies")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.labels.description")}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("form.placeholders.description")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          <CustomInput
            control={form.control}
            name="language"
            schema={orderSchema(t)}
            label="CreateStory.form.labels.language"
            placeholder="CreateStory.form.placeholders.language"
            required
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.labels.gender")}</FormLabel>
                <FormControl>
                  <CustomSelect
                    value={field.value}
                    onChange={field.onChange}
                    className="w-full"
                    options={[
                      { label: t("form.gender.male"), value: "MALE" },
                      { label: t("form.gender.female"), value: "FEMALE" },
                    ]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormItem>
          <FormLabel>{t("form.labels.child_image")}</FormLabel>
          <CloudinaryInput
            setFilesURL={(url) => setChildImage(url[0])}
            accept="image/*"
            lang={locale as Lang}
            maxFiles={1}
          />
          {form.formState.errors.child_image && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.child_image.message}
            </p>
          )}
        </FormItem>

        <div className="border-t pt-4 mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl sm:text-3xl font-semibold">
              {t("form.additional_info")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              {t("form.additional_info_note")}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              <CustomInput
                control={form.control}
                name="hair_color"
                schema={orderSchema(t)}
                label="CreateStory.form.labels.hair_color"
                placeholder="CreateStory.form.placeholders.hair_color"
                required
              />
              <CustomInput
                control={form.control}
                name="hair_style"
                schema={orderSchema(t)}
                label="CreateStory.form.labels.hair_style"
                placeholder="CreateStory.form.placeholders.hair_style"
                required
                type="number"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              <CustomInput
                control={form.control}
                name="eye_color"
                schema={orderSchema(t)}
                label="CreateStory.form.labels.eye_color"
                placeholder="CreateStory.form.placeholders.eye_color"
                required
              />
              <CustomInput
                control={form.control}
                name="skin_tone"
                schema={orderSchema(t)}
                label="CreateStory.form.labels.skin_tone"
                placeholder="CreateStory.form.placeholders.skin_tone"
                required
                type="number"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="clothing_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("form.labels.clothing_description")}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t(
                          "form.placeholders.clothing_description"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accessory_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("form.labels.accessory_description")}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t(
                          "form.placeholders.accessory_description"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="personality_traits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.labels.personality_traits")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("form.placeholders.personality_traits")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="moral_value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.labels.moral_value")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("form.placeholders.moral_value")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Button
          loading={loading}
          type="submit"
          size="lg"
          className="w-fit self-end"
        >
          {t("form.buttons.submit")}
        </Button>
      </form>
    </Form>
  );
};

export default OrderFormStepOne;
