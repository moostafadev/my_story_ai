"use client";

import CustomTable from "@/components/custom/table";
import { Column, TableAction } from "@/components/custom/table/types";
import React from "react";
import { MessageCircle, Pen } from "lucide-react";
import { OrderWithRelations } from "@/services/types";
import { cn } from "@/lib/utils";

const OrdersData = ({ data }: { data: OrderWithRelations[] }) => {
  const tableData = Object.entries(data).map(([, value], idx) => ({
    idx: idx + 1,
    ...value,
  }));

  const orderStates: Record<string, { label: string; className: string }> = {
    PAID: {
      label: "مدفوع",
      className: "bg-blue-100 text-blue-800",
    },
    SHIPPED: {
      label: "تم الشحن",
      className: "bg-green-100 text-green-800",
    },
    COMPLETED: {
      label: "مكتمل",
      className: "bg-gray-100 text-gray-700",
    },
    CANCELLED: {
      label: "ملغي",
      className: "bg-red-100 text-red-700",
    },
  };

  const columns: Column<OrderWithRelations & { idx: number; id: string }>[] = [
    { key: "idx", label: "ID" },
    { key: "name", label: "اسم الطفل" },
    { key: "city", label: "المحافظة" },
    {
      key: "fPrice",
      label: "سعر الطلب",
      render: (item) => `${item.fPrice} ج.م`,
    },
    {
      key: "storyType",
      label: "نوع الطلب",
      render: (item) => (
        <span className="px-4 py-1 rounded bg-muted text-sm font-medium">
          {item.storyType}
        </span>
      ),
    },
    {
      key: "state",
      label: "الحالة",
      render: (item) => {
        const state = orderStates[item.state];
        return (
          <span
            className={cn(
              "px-5 font-medium rounded-full hover:opacity-80 duration-300",
              state?.className
            )}
          >
            {state?.label || item.state}
          </span>
        );
      },
    },
  ];

  const actions: TableAction<
    OrderWithRelations & { idx: number; id: string }
  >[] = [
    {
      label: "Chat",
      icon: <MessageCircle className="w-4 h-4" />,
      variant: "secondary",
      href: (item) =>
        `https://api.whatsapp.com/send?phone=2${item.user.phoneNumber}`,
      target: "_blank",
    },
    {
      label: "Edit",
      icon: <Pen className="w-4 h-4" />,
      variant: "outline",
      href: (item) => `/admin/orders/${item.id}`,
    },
  ];

  return (
    <>
      <CustomTable data={tableData} columns={columns} actions={actions} />
    </>
  );
};

export default OrdersData;
