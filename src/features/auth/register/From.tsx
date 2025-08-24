"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, TRegisterSchema } from "./schema";
import { CustomInput } from "@/components/custom/input";
import { useTranslations } from "next-intl";
import { registerUser } from "./create_user.action";
import hashPassword from "@/lib/hashed_password";
import { toast } from "sonner";

const RegisterFrom = () => {
  const t = useTranslations("Register");
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema(t)),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailOrPhone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: TRegisterSchema) => {
    setIsLoading(true);
    const hashedPassword = await hashPassword(values.password);
    const result = await registerUser({ ...values, password: hashedPassword });

    if (!result.success) {
      setIsLoading(false);
      toast.error(
        <div>
          <strong>{t("errorTitle")}</strong>
          <div>{t("errorMessage")}</div>
        </div>
      );
      return;
    }

    setIsLoading(false);

    toast.success(
      <div>
        <strong>{t("successTitle")}</strong>
        <div>{t("successMessage")}</div>
      </div>
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 !w-full">
            <CustomInput
              control={form.control}
              name="firstName"
              label="Register.firstName"
              placeholder="Register.firstName"
              className="w-full"
              schema={registerSchema(t)}
            />
            <CustomInput
              control={form.control}
              name="lastName"
              label="Register.lastName"
              placeholder="Register.lastName"
              className="w-full"
              schema={registerSchema(t)}
            />
          </div>
          <CustomInput
            control={form.control}
            name="emailOrPhone"
            label="Register.emailOrPhone"
            placeholder="Register.emailOrPhone"
            className="w-full"
            schema={registerSchema(t)}
          />
          <div className="flex flex-col md:flex-row gap-4">
            <CustomInput
              control={form.control}
              name="password"
              label="Register.password"
              placeholder="Register.password"
              className="w-full"
              schema={registerSchema(t)}
            />
            <CustomInput
              control={form.control}
              name="confirmPassword"
              label="Register.confirmPassword"
              placeholder="Register.confirmPassword"
              className="w-full"
              schema={registerSchema(t)}
            />
          </div>
        </div>
        <Button type="submit" className="w-fit" loading={isLoading}>
          {t("register")}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterFrom;
