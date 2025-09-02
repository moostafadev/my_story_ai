import { prisma } from "@/lib/prisma";

export class SettingsService {
  static async getSettings() {
    return prisma.settings.findFirst();
  }

  static async updateSettings(
    data: Partial<{
      storyCreationPrice: number;
      storyCreationCurrency: string;
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
    city: string,
    price: number,
    currency = "USD"
  ) {
    const settings = await prisma.settings.findFirst();
    if (!settings) throw new Error("Settings record not found");

    const deliveryPrices =
      (settings.deliveryPrices as Record<
        string,
        { price: number; currency: string }
      >) || {};

    deliveryPrices[city.toLowerCase()] = { price, currency };

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
      { price: number; currency: string }
    >;
  }
}
