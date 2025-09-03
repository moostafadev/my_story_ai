"use client";

import { Pen, Trash } from "lucide-react";
import React, { useState } from "react";
import PricingDeliveryForm from "./Form";
import { removeDeliveryPriceAction } from "../settings.action";
import { toast } from "sonner";
import { DeliveryPriceSchema } from "./schma";
import { CustomDialog } from "@/components/custom/dialog";
import { Column, TableAction } from "@/components/custom/table/types";
import CustomTable from "@/components/custom/table";

const PricingDelivery = ({
  data,
}: {
  data: Record<
    string,
    {
      nameAr: string;
      nameEn: string;
      price: number;
      currency: string;
    }
  >;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<DeliveryPriceSchema | null>(
    null
  );

  const tableData = Object.entries(data).map(([key, value], idx) => ({
    id: key,
    idx: idx + 1,
    ...value,
  }));

  const handleDelete = async (city: string) => {
    try {
      setIsLoading(true);
      const res = await removeDeliveryPriceAction(city);
      if (res.success) {
        toast.success("تم حذف سعر التوصيل بنجاح ✅");
      } else {
        toast.error(res.error || "حدث خطأ أثناء الحذف ❌");
      }
    } catch {
      toast.error("حدث خطأ أثناء الحذف ❌");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: DeliveryPriceSchema) => {
    setSelectedCity(item);
    setEditDialogOpen(true);
  };

  const columns: Column<DeliveryPriceSchema & { idx: number; id: string }>[] = [
    { key: "idx", label: "ID" },
    { key: "nameAr", label: "المدينة" },
    {
      key: "price",
      label: "المبلغ",
      render: (item) => `${item.price} ${item.currency}`,
    },
  ];

  const actions: TableAction<
    DeliveryPriceSchema & { idx: number; id: string }
  >[] = [
    {
      label: "Edit",
      icon: <Pen className="w-4 h-4" />,
      variant: "secondary",
      onClick: handleEdit,
    },
    {
      label: "Delete",
      icon: <Trash className="w-4 h-4" />,
      variant: "destructive",
      onClick: (item) => handleDelete(item.id),
      loading: isLoading,
    },
  ];

  return (
    <>
      <CustomTable data={tableData} columns={columns} actions={actions}>
        <div className="p-3 md:p-4 flex flex-col gap-4 text-background">
          <h4 className="text-lg sm:text-xl font-semibold">إضافة سعر</h4>
          <PricingDeliveryForm />
        </div>
      </CustomTable>

      <CustomDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        title={{ text: "تعديل سعر التوصيل" }}
      >
        {selectedCity && (
          <PricingDeliveryForm
            defaultValues={selectedCity}
            setEditDialogOpen={setEditDialogOpen}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default PricingDelivery;
