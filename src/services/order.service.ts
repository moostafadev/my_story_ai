import { prisma } from "@/lib/prisma";
import { CreateOrderInput, UpdateOrderInput } from "./types";

export class OrderService {
  static async createOrder(data: CreateOrderInput) {
    return prisma.order.create({ data });
  }

  static async getOrderById(id: string) {
    return prisma.order.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  static async getAllOrders() {
    return prisma.order.findMany({
      include: { user: true },
    });
  }

  static async updateOrder(id: string, data: UpdateOrderInput) {
    return prisma.order.update({ where: { id }, data });
  }

  static async deleteOrder(id: string) {
    return prisma.order.delete({ where: { id } });
  }
}
