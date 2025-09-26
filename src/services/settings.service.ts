import { prisma } from "@/lib/prisma";

export class SettingsService {
  static async getSettings() {
    return prisma.settings.findFirst();
  }

  static async updateSettings(
    data: Partial<{
      storyCreationPricePDF: number;
      storyCreationPriceSoft: number;
      storyCreationPriceHard: number;
      supportEmail: string;
      supportPhone: string;
    }>
  ) {
    const settings = await prisma.settings.findFirst();
    if (!settings) throw new Error("Settings record not found");

    return prisma.settings.update({
      where: { id: settings.id },
      data,
    });
  }

  static async upsertDeliveryPrice(
    nameAr: string,
    nameEn: string,
    price: number,
    currency = "USD"
  ) {
    const settings = await prisma.settings.findFirst();
    if (!settings) throw new Error("Settings record not found");

    const deliveryPrices =
      (settings.deliveryPrices as Record<
        string,
        { nameAr: string; nameEn: string; price: number; currency: string }
      >) || {};

    deliveryPrices[nameEn.toLowerCase()] = {
      nameAr,
      nameEn,
      price,
      currency,
    };

    return prisma.settings.update({
      where: { id: settings.id },
      data: { deliveryPrices },
    });
  }

  static async removeDeliveryPrice(city: string) {
    const settings = await prisma.settings.findFirst();
    if (!settings) throw new Error("Settings record not found");

    const deliveryPrices = {
      ...(settings.deliveryPrices as Record<
        string,
        { price: number; currency: string }
      >),
    };
    delete deliveryPrices[city.toLowerCase()];

    return prisma.settings.update({
      where: { id: settings.id },
      data: { deliveryPrices },
    });
  }

  static async getDeliveryPrice(city: string) {
    const settings = await prisma.settings.findFirst();
    if (!settings) throw new Error("Settings record not found");

    const deliveryPrices = settings.deliveryPrices as Record<
      string,
      { price: number; currency: string }
    >;
    return deliveryPrices?.[city.toLowerCase()] ?? null;
  }

  static async getAllDeliveryPrices() {
    const settings = await prisma.settings.findFirst();
    if (!settings) throw new Error("Settings record not found");

    return settings.deliveryPrices as Record<
      string,
      {
        nameAr: string;
        nameEn: string;
        price: number;
        currency: string;
      }
    >;
  }
}
