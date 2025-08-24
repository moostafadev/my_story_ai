import { ClientTranslationFunction } from "@/types/intl";
import { z } from "zod";

export const registerSchema = (t: ClientTranslationFunction) => {
  return z
    .object({
      firstName: z
        .string()
        .nonempty({ message: t("errors.required") })
        .min(2, { message: t("errors.firstNameMin", { min: 2 }) }),

      lastName: z
        .string()
        .nonempty({ message: t("errors.required") })
        .min(2, { message: t("errors.lastNameMin", { min: 2 }) }),

      emailOrPhone: z
        .string()
        .nonempty({ message: t("errors.required") })
        .superRefine((value, ctx) => {
          const emailRegex = /^\S+@\S+\.\S+$/;
          const phoneRegex = /^\+?[0-9]{7,15}$/;

          if (/^[0-9+]/.test(value)) {
            if (!phoneRegex.test(value)) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: t("errors.invalidPhone"),
              });
            }
          } else {
            if (!emailRegex.test(value)) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: t("errors.invalidEmail"),
              });
            }
          }
        }),

      password: z
        .string()
        .nonempty({ message: t("errors.required") })
        .min(8, { message: t("errors.passwordMin", { min: 8 }) }),

      confirmPassword: z.string().nonempty({ message: t("errors.required") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: t("errors.passwordMatch"),
    });
};

export type TRegisterSchema = z.infer<ReturnType<typeof registerSchema>>;
