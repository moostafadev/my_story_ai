import { ClientTranslationFunction } from "@/types/intl";
import { z } from "zod";
import { checkUserExists } from "./create_user.action";

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

      email: z
        .string()
        .nonempty({ message: t("errors.required") })
        .email({ message: t("errors.invalidEmail") })
        .superRefine(async (value, ctx) => {
          const exists = await checkUserExists(value, "email");
          if (exists === "email") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: t("errors.emailExists"),
            });
          }
        }),

      phone: z
        .string()
        .nonempty({ message: t("errors.required") })
        .regex(/^\+?[0-9]{7,15}$/, { message: t("errors.invalidPhone") })
        .superRefine(async (value, ctx) => {
          const exists = await checkUserExists(value, "phone");
          if (exists === "phone") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: t("errors.phoneExists"),
            });
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
