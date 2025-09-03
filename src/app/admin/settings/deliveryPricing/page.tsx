import DefaultPage from "@/components/layouts/Admin/DefaultPage";
import PricingDelivery from "@/features/Admin/Settings/DeliveryPrice/Table";
import { SettingsService } from "@/services/settings.service";
import React from "react";

const DeliveryPricingPage = async () => {
  const data = await SettingsService.getAllDeliveryPrices();

  return (
    <>
      <DefaultPage title="أسعار التوصيل" desc="للتحكم في أسعار التوصيل">
        <PricingDelivery data={data} />
      </DefaultPage>
    </>
  );
};

export default DeliveryPricingPage;
