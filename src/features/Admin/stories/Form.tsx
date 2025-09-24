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
    imageAr: story?.imageArUrl || [], // array
    imageEn: story?.imageEnUrl || [],
    coverAr: story?.coverArUrl || "",
    coverEn: story?.coverEnUrl || "",
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
      coverArUrl: files.coverAr || undefined,
      coverEnUrl: files.coverEn || undefined,
      pdfArUrl: files.pdfAr || undefined,
      pdfEnUrl: files.pdfEn || undefined,
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
            <FormLabel>صورة الغلاف (بالعربي)</FormLabel>
            {files.coverAr && (
              <div className="relative w-fit">
                <Image
                  src={files.coverAr}
                  alt="Arabic cover"
                  width={400}
                  height={400}
                  className="rounded"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={() => setFiles((prev) => ({ ...prev, coverAr: "" }))}
                >
                  حذف
                </Button>
              </div>
            )}
            <CloudinaryInput
              setFilesURL={(url) =>
                setFiles((prev) => ({ ...prev, coverAr: url[0] }))
              }
              accept="image/*"
              lang="ar"
              maxFiles={1}
            />
          </FormItem>

          <FormItem className="w-full">
            <FormLabel>صورة الغلاف (بالانجليزي)</FormLabel>
            {files.coverEn && (
              <div className="relative w-fit">
                <Image
                  src={files.coverAr}
                  alt="English cover"
                  width={400}
                  height={400}
                  className="rounded"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={() => setFiles((prev) => ({ ...prev, coverEn: "" }))}
                >
                  حذف
                </Button>
              </div>
            )}
            <CloudinaryInput
              setFilesURL={(url) =>
                setFiles((prev) => ({ ...prev, coverEn: url[0] }))
              }
              accept="image/*"
              lang="ar"
              maxFiles={1}
            />
          </FormItem>
        </div>

        <FormItem className="w-full">
          <FormLabel>الصور (بالعربي)</FormLabel>
          {files.imageAr.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-2">
              {files.imageAr.map((img, idx) => (
                <div key={idx} className="relative">
                  <Image
                    src={img}
                    alt="Arabic image"
                    width={200}
                    height={200}
                    className="rounded"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      setFiles((prev) => ({
                        ...prev,
                        imageAr: prev.imageAr.filter((_, i) => i !== idx),
                      }))
                    }
                  >
                    حذف
                  </Button>
                </div>
              ))}
            </div>
          )}
          <CloudinaryInput
            setFilesURL={(urls) =>
              setFiles((prev) => ({ ...prev, imageAr: urls }))
            }
            accept="image/*"
            lang="ar"
            maxFiles={5}
          />
        </FormItem>

        <FormItem className="w-full">
          <FormLabel>الصور (بالانجليزي)</FormLabel>
          {files.imageEn.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-2">
              {files.imageEn.map((img, idx) => (
                <div key={idx} className="relative">
                  <Image
                    src={img}
                    alt="English image"
                    width={200}
                    height={200}
                    className="rounded"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      setFiles((prev) => ({
                        ...prev,
                        imageEn: prev.imageEn.filter((_, i) => i !== idx),
                      }))
                    }
                  >
                    حذف
                  </Button>
                </div>
              ))}
            </div>
          )}
          <CloudinaryInput
            setFilesURL={(urls) =>
              setFiles((prev) => ({ ...prev, imageEn: urls }))
            }
            accept="image/*"
            lang="en"
            maxFiles={5}
          />
        </FormItem>

        <div className="flex flex-col md:flex-row gap-4">
          <FormItem className="w-full">
            <FormLabel>ملف PDF (بالعربي)</FormLabel>
            {files.pdfAr && (
              <CloudinaryBtn
                fileUrl={files.pdfAr}
                className="w-fit mb-2"
                variant={"outline"}
              >
                تحميل القصة الحالية
              </CloudinaryBtn>
            )}
            <CloudinaryInput
              setFilesURL={(url) =>
                setFiles((prev) => ({ ...prev, pdfAr: url[0] }))
              }
              accept=".pdf"
              lang="ar"
              maxFiles={1}
            />
            {form.formState.errors.root?.pdfAr && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.root.pdfAr.message}
              </p>
            )}
          </FormItem>

          <FormItem className="w-full">
            <FormLabel>ملف PDF (بالانجليزي)</FormLabel>
            {files.pdfEn && (
              <CloudinaryBtn
                fileUrl={files.pdfEn}
                className="w-fit mb-2"
                variant={"outline"}
              >
                تحميل القصة الحالية
              </CloudinaryBtn>
            )}
            <CloudinaryInput
              setFilesURL={(url) =>
                setFiles((prev) => ({ ...prev, pdfEn: url[0] }))
              }
              accept=".pdf"
              lang="ar"
              maxFiles={1}
            />
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
