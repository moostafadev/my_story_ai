"use client";

import { CloudinaryInput } from "@/components/custom/cloudinary-input";
import DefaultPage from "@/components/layouts/Admin/DefaultPage";
import React, { useState } from "react";

const StoryAddPage = () => {
  const [fileUrl, setFilesURL] = useState<string[]>([]);

  return (
    <DefaultPage title="اضافة قصة">
      <CloudinaryInput
        setFilesURL={setFilesURL}
        accept=".pdf"
        lang="ar"
        maxFiles={1}
      />
    </DefaultPage>
  );
};

export default StoryAddPage;
