"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pen, Trash } from "lucide-react";
import React, { useState } from "react";
import PricingDeliveryForm from "./Form";
import Image from "next/image";
import { removeDeliveryPriceAction } from "../settings.action";
import { toast } from "sonner";
import { DeliveryPriceSchema } from "./schma";
import { CustomDialog } from "@/components/custom/dialog";

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

  const handleEdit = (
    cityKey: string,
    cityData: {
      nameAr: string;
      nameEn: string;
      price: number;
      currency: string;
    }
  ) => {
    setSelectedCity({ ...cityData });
    setEditDialogOpen(true);
  };

  const hasData = Object.entries(data).length > 0;

  return (
    <div className="flex flex-col bg-primary/80 shadow-sm hover:shadow-md rounded-md overflow-hidden duration-300">
      <div className="p-3 md:p-4 flex flex-col gap-4 text-background">
        <h4 className="text-lg sm:text-xl font-semibold">إضافة سعر</h4>
        <PricingDeliveryForm />
      </div>

      {hasData ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>المدينة</TableHead>
              <TableHead>المبلغ</TableHead>
              <TableHead className="text-end">التحكم</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(data).map(
              ([location, { nameAr, nameEn, price, currency }], idx) => (
                <TableRow key={location}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="font-medium">{nameAr}</TableCell>
                  <TableCell>
                    {price} {currency}
                  </TableCell>
                  <TableCell className="flex items-center gap-1 justify-end">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() =>
                        handleEdit(location, {
                          nameAr,
                          nameEn,
                          price,
                          currency,
                        })
                      }
                    >
                      <Pen className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      loading={isLoading}
                      onClick={() => handleDelete(location)}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 p-6 text-muted-foreground bg-background">
          <Image
            src="/no_data.svg"
            alt="لا توجد بيانات"
            width={120}
            height={120}
          />
          <p className="text-sm sm:text-base">لا توجد أسعار توصيل مضافة</p>
        </div>
      )}

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
    </div>
  );
};

export default PricingDelivery;
