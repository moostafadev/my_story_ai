"use server";

import { OrderService } from "@/services/order.service";
import { CreateOrderInput } from "@/services/types";

export async function createOrderAction(data: CreateOrderInput) {
  try {
    const order = await OrderService.createOrder(data);
    return { success: true, order };
  } catch (error) {
    console.error("❌ Error creating order:", error);
    return { success: false, message: "حدث خطأ أثناء إنشاء الطلب" };
  }
}
