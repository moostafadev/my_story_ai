"use server";

import { UserService } from "@/services/user.service";

export async function loginByUsername(formData: { username: string }) {
  try {
    const user = await UserService.getUserByUsername(formData.username);
    return { success: true, user };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Something went wrong" };
  }
}

export async function loginByEmailOrPhone(formData: { identifier: string }) {
  try {
    let user = null;

    if (formData.identifier.includes("@")) {
      user = await UserService.getUserByEmail(formData.identifier);
    } else {
      user = await UserService.getUserByPhoneNumber(formData.identifier);
    }

    if (!user) {
      return { success: false, message: "User not found" };
    }

    return { success: true, user };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Something went wrong" };
  }
}
