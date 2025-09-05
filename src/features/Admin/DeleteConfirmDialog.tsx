"use client";

import { Button } from "@/components/ui/button";
import { CustomDialog } from "@/components/custom/dialog";

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  onConfirm: () => void;
  loading?: boolean;
  onCancel?: () => void;
}

const DeleteConfirmDialog = ({
  open,
  onOpenChange,
  title = "تأكيد الحذف",
  description = "هل أنت متأكد أنك تريد الحذف؟",
  onConfirm,
  loading,
  onCancel,
}: DeleteConfirmDialogProps) => {
  return (
    <CustomDialog
      onOpenChange={onOpenChange}
      open={open}
      title={{
        text: title,
        className: "text-destructive font-2xl",
      }}
      description={{ text: description }}
    >
      <div className="flex items-center gap-2 justify-center">
        <Button
          variant={"destructive"}
          onClick={onConfirm}
          disabled={loading}
          className="flex-1"
        >
          تأكيد
        </Button>
        <Button
          variant={"outline"}
          onClick={() => {
            onOpenChange(false);
            onCancel?.();
          }}
          className="flex-1"
        >
          الغاء
        </Button>
      </div>
    </CustomDialog>
  );
};

export default DeleteConfirmDialog;
