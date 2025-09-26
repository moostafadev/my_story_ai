import { z } from "zod";
import { ORDERTYPE } from "@prisma/client";
import { ClientTranslationFunction } from "@/types/intl";

export const addressSchema = (t: ClientTranslationFunction) =>
  z.object({
    city: z.string({ error: t("errors.required") }),
    area: z.string({ error: t("errors.required") }),
    street: z.string({ error: t("errors.required") }),
    houseNumber: z.string({
      error: t("errors.required"),
    }),
    type: z
      .nativeEnum(ORDERTYPE)
      .refine((val) => val === "COD" || val === "VISA", {
        message: t("errors.payment_required"),
      }),
  });

export type TAddressSchema = z.infer<ReturnType<typeof addressSchema>>;
