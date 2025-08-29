"use server";

import { UserService } from "@/services/user.service";

export async function verifyUserOTP(userId: string, code: string) {
  try {
    const user = await UserService.verifyUser(userId, code);
    return { success: true, user };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Something went wrong" };
  }
}
