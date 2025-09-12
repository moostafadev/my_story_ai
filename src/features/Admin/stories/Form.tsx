"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { storySchema, TStorySchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { CustomSelect } from "@/components/custom/select";
import {
  CloudinaryBtn,
  CloudinaryInput,
} from "@/components/custom/cloudinary-input";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { createStoryAction, updateStoryAction } from "./story.action";
import { StoryWithRelations } from "@/services/types";
import Image from "next/image";

interface StoryFormProps {
  mode?: "create" | "edit";
  story?: StoryWithRelations;
}

const StoryForm = ({ mode = "create", story }: StoryFormProps) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState({
    imageAr: story?.imageArUrl || "",
    imageEn: story?.imageEnUrl || "",
    pdfAr: story?.pdfArUrl || "",
    pdfEn: story?.pdfEnUrl || "",
  });

  const form = useForm<TStorySchema>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      titleAr: story?.titleAr || "",
      titleEn: story?.titleEn || "",
      miniDescAr: story?.miniDescAr || "",
      miniDescEn: story?.miniDescEn || "",
      descAr: story?.descAr || "",
      descEn: story?.descEn || "",
      state: story?.state || "PUBLISHED",
    },
  });

  async function onSubmit(values: TStorySchema) {
    let hasError = false;

    if (mode === "create") {
      if (!files.imageAr) {
        form.setError("root.imageAr", {
          type: "manual",
          message: "الصورة (بالعربي) مطلوبة",
        });
        hasError = true;
      }
      if (!files.imageEn) {
        form.setError("root.imageEn", {
          type: "manual",
          message: "الصورة (بالانجليزي) مطلوبة",
        });
        hasError = true;
      }
    }

    if (hasError) return;

    setLoading(true);

    const payload = {
      ...values,
      imageArUrl: files.imageAr,
      imageEnUrl: files.imageEn,
      pdfArUrl: files.pdfAr,
      pdfEnUrl: files.pdfEn,
    };

    let res;
    if (mode === "create") {
      res = await createStoryAction(payload);
    } else {
      res = await updateStoryAction(story?.id ?? "", payload);
    }

    setLoading(false);

    if (res.success) {
      toast.success(
        mode === "create"
          ? "✅ تم انشاء القصة بنجاح"
          : "✅ تم تحديث القصة بنجاح"
      );
      redirect("/admin/stories");
    } else {
      toast.error(
        (mode === "create" ? "❌ فشل انشاء القصة: " : "❌ فشل تحديث القصة: ") +
          res.message
      );
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="titleAr"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>العنوان (بالعربي)</FormLabel>
                <FormControl>
                  <Input placeholder="قصة انس" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="titleEn"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>العنوان (بالانجليزي)</FormLabel>
                <FormControl>
                  <Input placeholder="Anas Story" {...field} dir="ltr" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="miniDescAr"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>وصف صغير (بالعربي)</FormLabel>
                <FormControl>
                  <Textarea placeholder="وصف قصة انس" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="miniDescEn"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>وصف صغير (بالانجليزي)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Anas Story mini description"
                    dir="ltr"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="descAr"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>وصف (بالعربي)</FormLabel>
                <FormControl>
                  <Textarea placeholder="وصف قصة انس" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="descEn"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>وصف (بالانجليزي)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Anas Story description"
                    dir="ltr"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>حالة القصة</FormLabel>
              <FormControl>
                <CustomSelect
                  dir="rtl"
                  placeholder="اختر حالة القصة"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { label: "مسودة", value: "DRAFT" },
                    { label: "منشورة", value: "PUBLISHED" },
                    { label: "مؤرشفة", value: "ARCHIVED" },
                  ]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row gap-4">
          <FormItem className="w-full">
            <FormLabel>الصورة (بالعربي)</FormLabel>
            {mode === "create" ? (
              <CloudinaryInput
                setFilesURL={(url) =>
                  setFiles((prev) => ({ ...prev, imageAr: url[0] }))
                }
                accept="image/*"
                lang="ar"
                maxFiles={1}
              />
            ) : (
              files.imageAr && (
                <div className="relative">
                  <Image
                    src={files.imageAr}
                    alt="Arabic image"
                    className="rounded-md border min-h-fit"
                    width={400}
                    height={400}
                  />
                </div>
              )
            )}
            {form.formState.errors.root?.imageAr && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.root.imageAr.message}
              </p>
            )}
          </FormItem>

          <FormItem className="w-full">
            <FormLabel>الصورة (بالانجليزي)</FormLabel>
            {mode === "create" ? (
              <CloudinaryInput
                setFilesURL={(url) =>
                  setFiles((prev) => ({ ...prev, imageEn: url[0] }))
                }
                accept="image/*"
                lang="en"
                maxFiles={1}
              />
            ) : (
              files.imageEn && (
                <div className="relative">
                  <Image
                    src={files.imageEn}
                    alt="English image"
                    width={400}
                    height={400}
                    className="rounded-md border min-h-fit"
                  />
                </div>
              )
            )}
            {form.formState.errors.root?.imageEn && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.root.imageEn.message}
              </p>
            )}
          </FormItem>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <FormItem className="w-full">
            <FormLabel>ملف PDF (بالعربي)</FormLabel>
            {mode === "create" ? (
              <CloudinaryInput
                setFilesURL={(url) =>
                  setFiles((prev) => ({ ...prev, pdfAr: url[0] }))
                }
                accept=".pdf"
                lang="ar"
                maxFiles={1}
              />
            ) : (
              files.pdfAr && (
                <CloudinaryBtn
                  fileUrl={files.pdfAr}
                  className="w-fit"
                  variant={"outline"}
                >
                  تحميل القصة
                </CloudinaryBtn>
              )
            )}
            {form.formState.errors.root?.pdfAr && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.root.pdfAr.message}
              </p>
            )}
          </FormItem>

          <FormItem className="w-full">
            <FormLabel>ملف PDF (بالانجليزي)</FormLabel>
            {mode === "create" ? (
              <CloudinaryInput
                setFilesURL={(url) =>
                  setFiles((prev) => ({ ...prev, pdfEn: url[0] }))
                }
                accept=".pdf"
                lang="en"
                maxFiles={1}
              />
            ) : (
              files.pdfEn && (
                <CloudinaryBtn
                  fileUrl={files.pdfEn}
                  className="w-fit"
                  variant={"outline"}
                >
                  تحميل القصة
                </CloudinaryBtn>
              )
            )}
            {form.formState.errors.root?.pdfEn && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.root.pdfEn.message}
              </p>
            )}
          </FormItem>
        </div>

        <Button loading={loading} type="submit" size="lg" className="w-fit">
          {mode === "create" ? "إنشاء" : "تحديث"}
        </Button>
      </form>
    </Form>
  );
};

export default StoryForm;
