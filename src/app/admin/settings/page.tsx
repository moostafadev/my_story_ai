import DefaultPage from "@/components/layouts/Admin/DefaultPage";
import SettingsFeature from "@/features/Admin/Settings";
import { SettingsService } from "@/services/settings.service";
import React from "react";

const SettingsPage = async () => {
  const data = await SettingsService.getSettings();
  return (
    <>
      <DefaultPage title="الاعدادات" desc="للتحكم في اعدادات الموقع">
        <SettingsFeature data={data} />
      </DefaultPage>
    </>
  );
};

export default SettingsPage;
