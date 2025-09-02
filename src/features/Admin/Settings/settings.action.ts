"use server";

import { SettingsService } from "@/services/settings.service";

export async function updateSettingsAction(data: {
  storyCreationPrice?: number;
  storyCreationCurrency?: string;
  supportEmail?: string;
  supportPhone?: string;
}) {
  try {
    const updated = await SettingsService.updateSettings(data);
    return { success: true, data: updated };
  } catch (error) {
    console.error("Update Settings Error:", error);
    return { success: false, error: "حدث خطأ أثناء حفظ الاعدادات" };
  }
}

export async function upsertDeliveryPriceAction(
  city: string,
  price: number,
  currency = "USD"
) {
  try {
    const updated = await SettingsService.upsertDeliveryPrice(
      city,
      price,
      currency
    );
    return { success: true, data: updated };
  } catch (error) {
    console.error("Upsert Delivery Price Error:", error);
    return { success: false, error: "حدث خطأ أثناء تحديث سعر التوصيل" };
  }
}

export async function removeDeliveryPriceAction(city: string) {
  try {
    const updated = await SettingsService.removeDeliveryPrice(city);
    return { success: true, data: updated };
  } catch (error) {
    console.error("Remove Delivery Price Error:", error);
    return { success: false, error: "حدث خطأ أثناء حذف سعر التوصيل" };
  }
}
