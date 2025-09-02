import DefaultPage from "@/components/layouts/Admin/DefaultPage";
import { SettingsService } from "@/services/settings.service";
import React from "react";

const DeliveryPricingPage = async () => {
  const data = await SettingsService.getAllDeliveryPrices();

  console.log(data);

  return (
    <>
      <DefaultPage title="أسعار التوصيل" desc="للتحكم في أسعار التوصيل">
        <div className="flex flex-col gap-4"></div>
      </DefaultPage>
    </>
  );
};

export default DeliveryPricingPage;
