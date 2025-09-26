"use client";

import { OrderState } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { orderStateLabels } from "./order";
import { Pen } from "lucide-react";
import { CustomDialog } from "@/components/custom/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { CustomSelect } from "@/components/custom/select";
import { updateOrderAction } from "./order.action";

type Props = {
  id: string;
  state: OrderState;
};

const OrderStateDisplay = ({ id, state }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedState, setSelectedState] = useState<OrderState>(state);
  const [loading, setLoading] = useState(false);

  const filteredStates = Object.entries(orderStateLabels).filter(
    ([value]) => value !== "STEP1" && value !== "STEP2"
  );

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateOrderAction(id, { state: selectedState });
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
      <div className="flex items-center gap-2">
        <span>حالة الطلب :</span>
        <p className="font-medium">{orderStateLabels[state]}</p>
        <Button
          variant="outline"
          size="icon"
          className="ml-2"
          onClick={() => setOpen(true)}
        >
          <Pen className="w-4 h-4" />
        </Button>
      </div>

      <CustomDialog
        onOpenChange={setOpen}
        open={open}
        title={{ text: "تغيير حالة الطلب" }}
      >
        <div className="flex items-center gap-2">
          <CustomSelect
            options={filteredStates.map(([value, label]) => ({
              value,
              label,
            }))}
            placeholder="اختر حالة الطلب"
            onChange={(value) => setSelectedState(value as OrderState)}
            value={selectedState}
            className="flex-1"
          />
          <Button
            onClick={handleSave}
            className="w-fit"
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

export default OrderStateDisplay;
