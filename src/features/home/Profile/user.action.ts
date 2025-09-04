"use server";

import { UserService } from "@/services/user.service";
import { revalidatePath } from "next/cache";

export const updatePhoneNumber = async (
  id: string,
  phoneNumber: string,
  locale: string
) => {
  await UserService.updateUser(id, {
    phoneNumber,
  });
  revalidatePath(`/${locale}/profile`);
};
