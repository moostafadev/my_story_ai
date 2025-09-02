import DefaultPage from "@/components/layouts/Admin/DefaultPage";
import React from "react";

const DeliveryPricingPage = () => {
  return (
    <>
      <DefaultPage title="أسعار التوصيل" desc="للتحكم في أسعار التوصيل">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2"></div>
        </div>
      </DefaultPage>
    </>
  );
};

export default DeliveryPricingPage;
