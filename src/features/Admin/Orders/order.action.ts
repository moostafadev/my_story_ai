"use server";

import { OrderService } from "@/services/order.service";
import { UpdateOrderInput } from "@/services/types";
import { revalidatePath } from "next/cache";

export async function updateOrderAction(id: string, data: UpdateOrderInput) {
  const order = await OrderService.updateOrder(id, data);
  revalidatePath(`/admin/orders/${id}`);
  return order;
}
