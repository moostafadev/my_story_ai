"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomInput } from "@/components/custom/input";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { loginUsernameSchema, TLoginUsernameSchema } from "./schema";
import { compareHashPassword } from "@/lib/hashed_password";
import { loginByUsername } from "./login_user.action";
import { useRouter } from "@/i18n/navigation";
import FormEmailOrPhoneNumber from "./FormEmailOrPhoneNumber";

const LoginForm = () => {
  const t = useTranslations("Login");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showCredentialsError, setShowCredentialsError] = useState(false);

  const form = useForm<TLoginUsernameSchema>({
    resolver: zodResolver(loginUsernameSchema(t)),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSuccess = () => {
    setShowCredentialsError(false);
    toast.success(
      <div>
        <strong>{t("successTitle")}</strong>
        <div>{t("successMessage")}</div>
      </div>
    );
    router.replace("/");
  };

  const handleError = () => {
    toast.error(
      <div>
        <strong>{t("errorTitle")}</strong>
        <div>{t("errorMessage")}</div>
      </div>
    );
  };

  const onSubmit = async (values: TLoginUsernameSchema) => {
    try {
      setIsLoading(true);
      const data = await loginByUsername({ username: values.username });
      const isTruePassword = await compareHashPassword(
        values.password,
        data?.user?.password || ""
      );
      if (!data.success) {
        handleError();
        return;
      }
      if (!isTruePassword) {
        setShowCredentialsError(true);
        return;
      }
      handleSuccess();
    } catch {
      handleError();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col md:flex-row gap-4 !w-full">
            <CustomInput
              control={form.control}
              name="username"
              label="Login.username"
              placeholder="Login.username"
              className="w-full"
              schema={loginUsernameSchema(t)}
            />
            <CustomInput
              control={form.control}
              name="password"
              label="Login.password"
              placeholder="Login.password"
              className="w-full"
              schema={loginUsernameSchema(t)}
            />
          </div>
          {showCredentialsError && (
            <p className="text-sm text-red-600">
              {t("errors.wrongCredentials")}
            </p>
          )}
          <div className="flex flex-col gap-4">
            <Button type="submit" className="w-fit" loading={isLoading}>
              {t("signIn")}
            </Button>
            <Button
              variant={"link"}
              className="w-fit !p-0 h-fit"
              onClick={() => setIsDialogOpen(true)}
              type="button"
            >
              {t("forgotUsername")}
            </Button>
          </div>
        </form>
      </Form>
      <FormEmailOrPhoneNumber
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </>
  );
};

export default LoginForm;
