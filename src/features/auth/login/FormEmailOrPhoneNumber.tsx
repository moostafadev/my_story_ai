import { CustomDialog } from "@/components/custom/dialog";
import { CustomInput } from "@/components/custom/input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import {
  loginEmailOrPhoneNumberSchema,
  TLoginEmailOrPhoneNumberSchema,
} from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginByEmailOrPhone } from "./login_user.action";
import { compareHashPassword } from "@/lib/hashed_password";
import { useRouter } from "@/i18n/navigation";

interface IProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

const FormEmailOrPhoneNumber = ({ isDialogOpen, setIsDialogOpen }: IProps) => {
  const router = useRouter();
  const t = useTranslations("RecoverUsername");
  const [isLoading, setIsLoading] = useState(false);
  const [showCredentialsError, setShowCredentialsError] = useState(false);

  const form = useForm<TLoginEmailOrPhoneNumberSchema>({
    resolver: zodResolver(loginEmailOrPhoneNumberSchema(t)),
    defaultValues: {
      emailOrPhone: "",
      password: "",
    },
  });

  const handleSuccess = () => {
    setShowCredentialsError(false);
    setIsDialogOpen(false);
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

  const onSubmit = async (values: TLoginEmailOrPhoneNumberSchema) => {
    try {
      setIsLoading(true);
      const data = await loginByEmailOrPhone({
        identifier: values.emailOrPhone,
      });
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
    <CustomDialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
      title={{
        text: t("title"),
      }}
      description={{
        text: t("description"),
      }}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-4 !w-full">
            <CustomInput
              control={form.control}
              name="emailOrPhone"
              label="RecoverUsername.emailOrPhone"
              placeholder="RecoverUsername.emailOrPhone"
              className="w-full"
              schema={loginEmailOrPhoneNumberSchema(t)}
            />
            <CustomInput
              control={form.control}
              name="password"
              label="RecoverUsername.password"
              placeholder="RecoverUsername.password"
              className="w-full"
              schema={loginEmailOrPhoneNumberSchema(t)}
            />
          </div>
          {showCredentialsError && (
            <p className="text-sm text-red-600">
              {t("errors.wrongCredentials")}
            </p>
          )}
          <Button type="submit" className="w-fit" loading={isLoading}>
            {t("submit")}
          </Button>
        </form>
      </Form>
    </CustomDialog>
  );
};

export default FormEmailOrPhoneNumber;
