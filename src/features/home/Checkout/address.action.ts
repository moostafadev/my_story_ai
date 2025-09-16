"use server";

import { OrderService } from "@/services/order.service";
import { UpdateOrderInput } from "@/services/types";

export async function updateOrderAddressAction(
  orderId: string,
  data: UpdateOrderInput
) {
  try {
    const order = await OrderService.updateOrder(orderId, data);
    return { success: true, order };
  } catch (error) {
    console.error("❌ Error updating order address:", error);
    return { success: false, message: "حدث خطأ أثناء تحديث العنوان" };
  }
}
