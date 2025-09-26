"use server";

import { SettingsService } from "@/services/settings.service";
import { ICity } from "./Select";

export const fetchCities = async (): Promise<ICity[]> => {
  try {
    const cities = await SettingsService.getAllDeliveryPrices();

    return Object.values(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw new Error("Failed to fetch cities");
  }
};
