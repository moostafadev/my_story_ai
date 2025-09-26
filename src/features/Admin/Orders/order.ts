import { OrderState } from "@prisma/client";

export const orderStateLabels: Record<OrderState, string> = {
  STEP1: "في انتظار العنوان",
  STEP2: "في انتظار الدفع",
  PAID: "مدفوع",
  SHIPPED: "تم الشحن",
  COMPLETED: "مكتمل",
  CANCELLED: "ملغي",
};
