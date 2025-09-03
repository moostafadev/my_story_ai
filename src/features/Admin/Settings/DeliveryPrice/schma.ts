import * as z from "zod";

export const deliveryPriceSchema = z.object({
  nameAr: z.string().min(2, "اسم المدينة بالعربي مطلوب"),
  nameEn: z.string().min(2, "اسم المدينة بالإنجليزية مطلوب"),
  price: z.number().positive("السعر يجب أن يكون أكبر من 0"),
  currency: z.string().min(1, "يجب اختيار العملة"),
});

export type DeliveryPriceSchema = z.infer<typeof deliveryPriceSchema>;
