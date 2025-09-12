"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { toast } from "sonner";

import { orderSchema, TOrderSchema } from "./schema";
import { createOrderAction } from "./order.action";
import { Input } from "@/components/ui/input";
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

const OrderFormStepOne = ({ userId }: { userId: string }) => {
  const t = useTranslations("CreateStory");
  const [loading, setLoading] = useState(false);
  const [childImage, setChildImage] = useState("");

  const form = useForm<TOrderSchema>({
    resolver: zodResolver(orderSchema(t)),
    defaultValues: {
      name: "",
      age: 0,
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.labels.name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("form.placeholders.name")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.labels.age")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={t("form.placeholders.age")}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.labels.language")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("form.placeholders.language")}
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

        <FormItem>
          <FormLabel>{t("form.labels.child_image")}</FormLabel>
          <CloudinaryInput
            setFilesURL={(url) => setChildImage(url[0])}
            accept="image/*"
            lang="ar"
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
            <h3 className="text-lg font-semibold">
              {t("form.additional_info")}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t("form.additional_info_note")}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="hair_color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.labels.hair_color")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form.placeholders.hair_color")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hair_style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.labels.hair_style")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form.placeholders.hair_style")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eye_color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.labels.eye_color")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form.placeholders.eye_color")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skin_tone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.labels.skin_tone")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form.placeholders.skin_tone")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clothing_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.labels.clothing_description")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("form.placeholders.clothing_description")}
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
                      placeholder={t("form.placeholders.accessory_description")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
