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
import DeleteConfirmDialog from "../DeleteConfirmDialog";

const UsersData = ({ data }: { data: UserWithRelations[] }) => {
  const [id, setId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const tableData = Object.entries(data).map(([, value], idx) => ({
    idx: idx + 1,
    ...value,
  }));

  const handleDelete = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await removeUserAction(id);
      if (res.success) {
        toast.success("تم حذف المستخدم بنجاح ✅");
        setOpen(false);
        setId(null);
      } else {
        toast.error(res.error || "حدث خطأ أثناء الحذف ❌");
      }
    } catch {
      toast.error("حدث خطأ أثناء الحذف ❌");
    } finally {
      setLoading(false);
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
      target: "_blank",
    },
    {
      label: "Delete",
      icon: <Trash className="w-4 h-4" />,
      variant: "destructive",
      onClick: (item) => {
        setId(item.id);
        setOpen(true);
      },
    },
  ];

  const selectedUser = data.find((item) => item.id === id);

  return (
    <>
      <CustomTable data={tableData} columns={columns} actions={actions} />
      <DeleteConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="تأكيد الحذف"
        description={
          selectedUser
            ? `هل تريد حذف المستخدم ${selectedUser.fName} ${selectedUser.lName} ؟`
            : "هل تريد حذف هذا المستخدم ؟"
        }
        onConfirm={handleDelete}
        loading={loading}
        onCancel={() => setId(null)}
      />
    </>
  );
};

export default UsersData;
