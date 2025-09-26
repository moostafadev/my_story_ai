"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { deliveryPriceSchema, DeliveryPriceSchema } from "./schma";
import { upsertDeliveryPriceAction } from "../settings.action";
import { CustomSelect } from "@/components/custom/select";
import { cn } from "@/lib/utils";

const PricingDeliveryForm = ({
  defaultValues,
  setEditDialogOpen,
}: {
  defaultValues?: DeliveryPriceSchema;
  setEditDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<DeliveryPriceSchema>({
    resolver: zodResolver(deliveryPriceSchema),
    defaultValues: defaultValues || {
      nameAr: "",
      nameEn: "",
      price: 0,
      currency: "EGP",
    },
  });

  const onSubmit = async (values: DeliveryPriceSchema) => {
    try {
      setLoading(true);
      const res = await upsertDeliveryPriceAction(
        values.nameAr,
        values.nameEn,
        values.price,
        values.currency
      );

      if (res.success) {
        toast.success("تمت إضافة سعر التوصيل بنجاح ✅");
        if (defaultValues && setEditDialogOpen) {
          setEditDialogOpen(false);
        }
        form.reset();
      } else {
        toast.error(res.error || "حدث خطأ أثناء الإضافة ❌");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء الإضافة ❌");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "bg-white text-foreground flex flex-col gap-4",
          defaultValues && setEditDialogOpen
            ? ""
            : "p-3 md:p-4 rounded-md shadow-sm"
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nameAr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم المدينة (عربي)</FormLabel>
                <FormControl>
                  <Input placeholder="ادخل اسم المدينة بالعربي" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nameEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم المدينة (بالإنجليزية)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ادخل اسم المدينة بالإنجليزية"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>السعر</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          variant="outline"
          className="flex self-end w-fit"
          loading={loading}
        >
          {defaultValues && setEditDialogOpen ? "تعديل" : "إضافة"}
        </Button>
      </form>
    </Form>
  );
};

export default PricingDeliveryForm;
