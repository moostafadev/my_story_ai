"use client";

import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import React, { useState } from "react";
import { updateOrderAction } from "./order.action";
import { toast } from "sonner";
import { CustomDialog } from "@/components/custom/dialog";
import { CloudinaryInput } from "@/components/custom/cloudinary-input";

const HandlePdf = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [valueAr, setValueAr] = useState("");
  const [valueEn, setValueEn] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateOrderAction(id, {
        storyPdfArUrl: valueAr,
        storyPdfEnUrl: valueEn,
      });
      toast.success("تم تحديث حالة الطلب بنجاح");
    } catch {
      toast.error("فشل تحديث حالة الطلب");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        variant={"outlineSub"}
        size={"sm"}
        className="self-end"
        onClick={() => setOpen(true)}
      >
        <FileText />
      </Button>
      <CustomDialog
        onOpenChange={setOpen}
        open={open}
        title={{ text: "تغيير حالة الطلب" }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <span>رفع ملف PDF بالعربية</span>
            <CloudinaryInput
              setFilesURL={(urls) => setValueAr(urls[0])}
              maxFiles={1}
              maxFileSize={10}
              accept=".pdf"
              lang="ar"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span>رفع ملف PDF بالانجليزي</span>
            <CloudinaryInput
              setFilesURL={(urls) => setValueEn(urls[0])}
              maxFiles={1}
              maxFileSize={10}
              accept=".pdf"
              lang="ar"
            />
          </div>
          <Button
            onClick={handleSave}
            className="w-fit mr-auto"
            size="sm"
            loading={loading}
          >
            حفظ
          </Button>
        </div>
      </CustomDialog>
    </>
  );
};

export default HandlePdf;
