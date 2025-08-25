import { prisma } from "@/lib/prisma";
import { CreateUserInput, UpdateUserInput } from "@/services/types";

export class UserService {
  private static async generateUniqueUsername(fName: string, lName: string) {
    const baseUsername =
      `${fName.toLowerCase()}.${lName.toLowerCase()}`.replace(/\s+/g, "");
    let username = baseUsername;
    let counter = 1;

    while (await prisma.user.findUnique({ where: { username } })) {
      username = `${baseUsername}${counter}`;
      counter++;
    }

    return username;
  }

  static async createUser(data: CreateUserInput) {
    if (data.email || data.phoneNumber) {
      const exists = await prisma.user.findFirst({
        where: {
          OR: [
            ...(data.email ? [{ email: data.email }] : []),
            ...(data.phoneNumber ? [{ phoneNumber: data.phoneNumber }] : []),
          ],
        },
      });

      if (exists) {
        throw new Error("Email or phone number already exists");
      }
    }
    const username = await this.generateUniqueUsername(data.fName, data.lName);

    return prisma.user.create({
      data: {
        ...data,
        username,
      },
    });
  }

  static async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: { stories: true, orders: true, addresses: true },
    });
  }

  static async getUserByEmail(email: string) {
    return prisma.user.findFirst({ where: { email } });
  }

  static async getUserByUsername(username: string) {
    return prisma.user.findUnique({ where: { username } });
  }

  static async getUserByPhoneNumber(phoneNumber: string) {
    return prisma.user.findFirst({ where: { phoneNumber } });
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
