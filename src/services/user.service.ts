// src/services/user.service.ts
import { prisma } from "@/lib/prisma";
import { CreateUserInput, UpdateUserInput } from "@/services/types";

export class UserService {
  static async createUser(data: CreateUserInput) {
    return prisma.user.create({ data });
  }

  static async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: { stories: true, orders: true, addresses: true },
    });
  }

  static async getUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  static async getAllUsers() {
    return prisma.user.findMany({
      include: { stories: true, orders: true, addresses: true },
    });
  }

  static async updateUser(id: string, data: UpdateUserInput) {
    return prisma.user.update({ where: { id }, data });
  }

  static async deleteUser(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}
