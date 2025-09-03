"use server";

import { SettingsService } from "@/services/settings.service";
import { revalidatePath } from "next/cache";

export async function updateSettingsAction(data: {
  storyCreationPrice?: number;
  storyCreationCurrency?: string;
  supportEmail?: string;
  supportPhone?: string;
}) {
  try {
    const updated = await SettingsService.updateSettings(data);
    revalidatePath("/admin/settings/deliveryPricing");
    return { success: true, data: updated };
  } catch (error) {
    console.error("Update Settings Error:", error);
    return { success: false, error: "حدث خطأ أثناء حفظ الاعدادات" };
  }
}

export async function upsertDeliveryPriceAction(
  nameAr: string,
  nameEn: string,
  price: number,
  currency = "USD"
) {
  try {
    const updated = await SettingsService.upsertDeliveryPrice(
      nameAr,
      nameEn,
      price,
      currency
    );
    revalidatePath("/admin/settings/deliveryPricing");
    return { success: true, data: updated };
  } catch (error) {
    console.error("Upsert Delivery Price Error:", error);
    return { success: false, error: "حدث خطأ أثناء تحديث سعر التوصيل" };
  }
}

export async function removeDeliveryPriceAction(city: string) {
  try {
    const updated = await SettingsService.removeDeliveryPrice(city);
    revalidatePath("/admin/settings/deliveryPricing");
    return { success: true, data: updated };
  } catch (error) {
    console.error("Remove Delivery Price Error:", error);
    return { success: false, error: "حدث خطأ أثناء حذف سعر التوصيل" };
  }
}
