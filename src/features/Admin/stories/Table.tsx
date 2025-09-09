"use client";

import CustomTable from "@/components/custom/table";
import { Column, TableAction } from "@/components/custom/table/types";
import React, { useState } from "react";
import { toast } from "sonner";
import { Trash, Pen } from "lucide-react";
import { StoryWithRelations } from "@/services/types";
import DeleteConfirmDialog from "../DeleteConfirmDialog";
import { deleteStoryAction } from "./story.action";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StoriesData = ({ data }: { data: StoryWithRelations[] }) => {
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
      const res = await deleteStoryAction(id);
      if (res.success) {
        toast.success("تم حذف القصة بنجاح ✅");
      } else {
        toast.error(res.message || "حدث خطأ أثناء الحذف ❌");
      }
    } catch {
      toast.error("حدث خطأ أثناء الحذف ❌");
    } finally {
      setLoading(false);
      setOpen(false);
      setId(null);
    }
  };

  const storyStateLabels: Record<string, string> = {
    DRAFT: "مسودة",
    PUBLISHED: "منشورة",
    ARCHIVED: "مؤرشفة",
  };

  const storyStateColors: Record<string, string> = {
    DRAFT: "text-yellow-600",
    PUBLISHED: "text-green-600",
    ARCHIVED: "text-gray-500",
  };

  const columns: Column<StoryWithRelations & { idx: number; id: string }>[] = [
    { key: "idx", label: "ID" },
    { key: "titleAr", label: "العنوان (عربي)" },
    { key: "titleEn", label: "العنوان (انجليزي)" },
    {
      key: "state",
      label: "الحالة",
      render: (item) => (
        <span className={storyStateColors[item.state] || ""}>
          {storyStateLabels[item.state] || item.state}
        </span>
      ),
    },
  ];

  const actions: TableAction<
    StoryWithRelations & { idx: number; id: string }
  >[] = [
    {
      label: "Edit",
      icon: <Pen className="w-4 h-4" />,
      variant: "outline",
      href: (item) => `/admin/stories/${item.id}`,
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

  const selectedStory = data.find((item) => item.id === id);

  return (
    <>
      <CustomTable data={tableData} columns={columns} actions={actions}>
        <Button variant={"outlineSub"} size={"lg"} className="w-fit" asChild>
          <Link href={"/admin/stories/add"}>اضافة قصة جديدة</Link>
        </Button>
      </CustomTable>
      <DeleteConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="تأكيد الحذف"
        description={
          selectedStory
            ? `هل تريد حذف القصة "${selectedStory.titleAr}" ؟`
            : "هل تريد حذف هذه القصة ؟"
        }
        onConfirm={handleDelete}
        loading={loading}
        onCancel={() => setId(null)}
      />
    </>
  );
};

export default StoriesData;
