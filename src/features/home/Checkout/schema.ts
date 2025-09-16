import { z } from "zod";
import { ORDERTYPE } from "@prisma/client";
import { ClientTranslationFunction } from "@/types/intl";

export const addressSchema = (t: ClientTranslationFunction) =>
  z
    .object({
      useGeo: z.boolean(),
      city: z.string().optional(),
      area: z.string().optional(),
      street: z.string().optional(),
      houseNumber: z.string().optional(),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
      type: z
        .nativeEnum(ORDERTYPE)
        .refine((val) => val === "COD" || val === "VISA", {
          message: t("errors.payment_required"),
        }),
    })
    .refine(
      (data) =>
        data.useGeo
          ? data.latitude !== undefined && data.longitude !== undefined
          : !!(data.city && data.street && data.houseNumber),
      {
        message: t("errors.address_required"),
        path: ["city"],
      }
    );

export type TAddressSchema = z.infer<ReturnType<typeof addressSchema>>;
