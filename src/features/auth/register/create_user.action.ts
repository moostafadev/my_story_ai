"use server";

import { prisma } from "@/lib/prisma";
import { UserService } from "@/services/user.service";

export async function registerUser(formData: {
  firstName: string;
  lastName: string;
  emailOrPhone: string;
  password: string;
}) {
  try {
    const user = await UserService.createUser({
      fName: formData.firstName,
      lName: formData.lastName,
      email: formData.emailOrPhone.includes("@")
        ? formData.emailOrPhone
        : undefined,
      phoneNumber: formData.emailOrPhone.includes("@")
        ? undefined
        : formData.emailOrPhone,
      password: formData.password,
    });

    return { success: true, user };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Something went wrong" };
  }
}

export async function checkUserExists(
  value: string
): Promise<"email" | "phone" | null> {
  const isEmail = value.includes("@");

  const exists = await prisma.user.findFirst({
    where: isEmail ? { email: value } : { phoneNumber: value },
    select: { id: true },
  });

  if (exists) {
    return isEmail ? "email" : "phone";
  }

  return null;
}
