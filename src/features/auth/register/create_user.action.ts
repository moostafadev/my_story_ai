"use server";

import { UserService } from "@/services/user.service";

export async function registerUser(formData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}) {
  try {
    const user = await UserService.createUser({
      fName: formData.firstName,
      lName: formData.lastName,
      email: formData.email || undefined,
      phoneNumber: formData.phone || undefined,
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
  value: string,
  type: "email" | "phone"
): Promise<"email" | "phone" | null> {
  const exists = await UserService.checkUserExists(value, type);

  if (exists) {
    return type;
  }

  return null;
}
