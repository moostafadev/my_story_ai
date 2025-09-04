"use client";

import CustomTable from "@/components/custom/table";
import { Column, TableAction } from "@/components/custom/table/types";
import React, { useState } from "react";
import { removeUserAction } from "./users.action";
import { toast } from "sonner";
import { MessageCircle, Trash } from "lucide-react";
import { UserWithRelations } from "@/services/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const UsersData = ({ data }: { data: UserWithRelations[] }) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const tableData = Object.entries(data).map(([, value], idx) => ({
    idx: idx + 1,
    ...value,
  }));

  const handleDelete = async (id: string) => {
    try {
      setLoadingId(id);
      const res = await removeUserAction(id);
      if (res.success) {
        toast.success("تم حذف سعر التوصيل بنجاح ✅");
      } else {
        toast.error(res.error || "حدث خطأ أثناء الحذف ❌");
      }
    } catch {
      toast.error("حدث خطأ أثناء الحذف ❌");
    } finally {
      setLoadingId(null);
    }
  };

  const columns: Column<UserWithRelations & { idx: number; id: string }>[] = [
    { key: "idx", label: "ID" },
    { key: "fName", label: "الاسم الاول" },
    { key: "lName", label: "الاسم الثاني" },
    { key: "email", label: "الايميل" },
    { key: "phoneNumber", label: "رقم الهاتف" },
    {
      key: "orders",
      label: "الطلبات",
      render: (item) => (
        <Link href={`/admin/users/${item.username}`}>
          <Button size={"sm"}>{`${item.orders.length} طلب`}</Button>
        </Link>
      ),
    },
  ];

  const actions: TableAction<
    UserWithRelations & { idx: number; id: string }
  >[] = [
    {
      label: "Chat",
      icon: <MessageCircle className="w-4 h-4" />,
      variant: "outline",
      href: (item) =>
        `https://api.whatsapp.com/send?phone=2${item.phoneNumber}`,
    },
    {
      label: "Delete",
      icon: <Trash className="w-4 h-4" />,
      variant: "destructive",
      onClick: (item) => handleDelete(item.id),
      loading: (item) => loadingId === item.id,
    },
  ];
  return <CustomTable data={tableData} columns={columns} actions={actions} />;
};

export default UsersData;
