"use server";

import { UserService } from "@/services/user.service";
import { revalidatePath } from "next/cache";

export async function removeUserAction(id: string) {
  try {
    const updated = await UserService.deleteUser(id);
    revalidatePath("/admin/users");
    return { success: true, data: updated };
  } catch (error) {
    console.error("Remove User Error:", error);
    return { success: false, error: "حدث خطأ أثناء حذف المستخدم" };
  }
}
