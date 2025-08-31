"use server";

import { setUserCookies } from "@/lib/cookies";
import { UserService } from "@/services/user.service";

export async function loginByUsername(formData: { username: string }) {
  try {
    const user = await UserService.getUserByUsername(formData.username);

    if (!user) {
      return { success: false, message: "User not found" };
    }

    await setUserCookies({
      userId: user.id,
      firstName: user.fName,
      lastName: user.lName,
    });

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

    await setUserCookies({
      userId: user.id,
      firstName: user.fName,
      lastName: user.lName,
    });

    return { success: true, user };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Something went wrong" };
  }
}
