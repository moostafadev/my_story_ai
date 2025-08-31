"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, TRegisterSchema } from "./schema";
import { CustomInput } from "@/components/custom/input";
import { useTranslations } from "next-intl";
import { registerUser } from "./create_user.action";
import { hashPassword } from "@/lib/hashed_password";
import { toast } from "sonner";
import { CustomDialog } from "@/components/custom/dialog";
import { User } from "@prisma/client";
import { useRouter } from "@/i18n/navigation";
import { OTPInput } from "@/components/custom/CustomOTP";
import { useOTPManager } from "@/hooks/useOTPManager";
import { resendUserOTP, verifyUserOTP } from "./otp.action";
import { Label } from "@/components/ui/label";

const RegisterForm = () => {
  const t = useTranslations("Register");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const { value, setValue, length, reset } = useOTPManager(6, 10);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema(t)),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSuccess = (user: User | null) => {
    setUserData(user);
    toast.success(
      <div>
        <strong>{t("thanksForRegister")}</strong>
        <div>
          {t.rich("thanksForRegisterDescription", {
            firstName: user?.fName || "",
            lastName: user?.lName || "",
          })}
        </div>
        <div>
          {t.rich("thanksForRegisterUsername", {
            username: user?.username || "",
          })}
        </div>
      </div>
    );
    setIsDialogOpen(true);
  };

  const handleError = () => {
    toast.error(
      <div>
        <strong>{t("errorTitle")}</strong>
        <div>{t("errorMessage")}</div>
      </div>
    );
  };

  const onSubmit = async (values: TRegisterSchema) => {
    try {
      setIsLoading(true);
      const hashedPassword = await hashPassword(values.password);
      const result = await registerUser({
        ...values,
        password: hashedPassword,
      });

      if (!result.success) {
        handleError();
        return;
      }

      handleSuccess(result.user ?? null);
    } catch {
      handleError();
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!userData) return;

    try {
      setIsVerifying(true);
      const result = await verifyUserOTP(userData.id, value);

      if (result.success) {
        toast.success(
          <div>
            <strong>{t("successTitle")}</strong>
            <div>{t("successMessage")}</div>
          </div>
        );
        reset();
        setIsDialogOpen(false);
        router.push("/login");
      } else {
        setVerifyError(t("invalidCodeError"));
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      toast.error(t("invalidCodeError"));
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    if (!userData) return;
    try {
      setIsResending(true);
      const result = await resendUserOTP(userData.id);

      if (result.success) {
        toast.success(t("resendCode") + " ✅");
      } else {
        toast.error(result.success || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resend OTP Error:", error);
      toast.error("Failed to resend OTP");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
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

            <div className="flex flex-col md:flex-row gap-4 !w-full">
              <CustomInput
                control={form.control}
                name="email"
                label="Register.email"
                placeholder="Register.email"
                className="w-full"
                schema={registerSchema(t)}
              />
              <CustomInput
                control={form.control}
                name="phone"
                label="Register.phone"
                placeholder="Register.phone"
                className="w-full"
                schema={registerSchema(t)}
              />
            </div>
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

      <CustomDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (open) {
            setIsDialogOpen(false);
            reset();
          } else {
            setIsDialogOpen(true);
          }
        }}
        title={{
          text: t("verifyAccount"),
        }}
        description={{
          text: t.rich("verifyAccountDescription", {
            contact: userData?.email || "",
          }) as string,
        }}
      >
        <div className="flex flex-col gap-3 items-center">
          <div className="flex flex-col gap-2 items-center">
            <Label htmlFor="OTP">{t("enterOTP")}</Label>
            <OTPInput
              length={length}
              onChange={setValue}
              value={value}
              id="OTP"
            />
            {verifyError && (
              <span className="text-sm text-red-500">{verifyError}</span>
            )}
          </div>

          <Button onClick={handleVerifyOTP} loading={isVerifying}>
            {t("verifyNow")}
          </Button>
          <Button
            variant="outline"
            onClick={handleResendOTP}
            loading={isResending}
          >
            {t("resendCode")}
          </Button>
        </div>
      </CustomDialog>
    </>
  );
};

export default RegisterForm;
