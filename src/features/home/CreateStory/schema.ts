import { z } from "zod";
import { GENDER } from "@prisma/client";
import { ClientTranslationFunction } from "@/types/intl";

export const orderSchema = (t: ClientTranslationFunction) => {
  return z.object({
    name: z.string().min(1, { message: t("errors.name_required") }),
    age: z
      .number({ error: t("errors.age_invalid") })
      .int()
      .positive({ message: t("errors.age_invalid") }),
    hobbies: z.string().min(1, { message: t("errors.hobbies_required") }),
    language: z.string().min(1, { message: t("errors.language_required") }),
    description: z
      .string()
      .min(1, { message: t("errors.description_required") }),
    gender: z.nativeEnum(GENDER, {
      message: t("errors.gender_required"),
    }),
    hair_color: z.string().optional(),
    hair_style: z.string().optional(),
    eye_color: z.string().optional(),
    skin_tone: z.string().optional(),
    clothing_description: z.string().optional(),
    accessory_description: z.string().optional(),
    personality_traits: z.string().optional(),
    moral_value: z.string().optional(),
    child_image: z.string().optional(),
  });
};

export type TOrderSchema = z.infer<ReturnType<typeof orderSchema>>;
