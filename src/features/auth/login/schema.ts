import { ClientTranslationFunction } from "@/types/intl";
import { z } from "zod";

export const loginUsernameSchema = (t: ClientTranslationFunction) => {
  return z.object({
    username: z.string().nonempty({ message: t("errors.required") }),

    password: z.string().nonempty({ message: t("errors.required") }),
  });
};

export const loginEmailOrPhoneNumberSchema = (t: ClientTranslationFunction) => {
  return z.object({
    emailOrPhone: z.string().nonempty({ message: t("errors.required") }),

    password: z.string().nonempty({ message: t("errors.required") }),
  });
};

export type TLoginUsernameSchema = z.infer<
  ReturnType<typeof loginUsernameSchema>
>;

export type TLoginEmailOrPhoneNumberSchema = z.infer<
  ReturnType<typeof loginEmailOrPhoneNumberSchema>
>;
